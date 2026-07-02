/**
 * Axios request and response interceptors.
 * @module api/interceptors
 */
import apiClient from './axios';
import endpoints from './endpoints';
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenManager';

let isRefreshing = false;
let refreshQueue = [];
let hasInitializedInterceptors = false;

function isRefreshRequest(config) {
  return Boolean(config?.url && config.url.includes(endpoints.auth.refresh));
}

function shouldSkipAuth(config) {
  return Boolean(config?.skipAuth);
}

function attachHeaders(config) {
  const headers = { ...(config.headers || {}) };

  if (!shouldSkipAuth(config)) {
    const token = getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  if (!headers.Accept) {
    headers.Accept = 'application/json';
  }

  if (config?.isMultipart) {
    delete headers['Content-Type'];
  } else if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = 'application/json';
  }

  config.headers = headers;

  return config;
}

function normalizeAxiosResponse(axiosResponse) {
  const payload = axiosResponse?.data ?? {};

  return {
    success: payload.success ?? true,
    statusCode: payload.statusCode ?? axiosResponse?.status ?? 200,
    message: payload.message ?? '',
    data: payload.data ?? {},
    timestamp: payload.timestamp ?? null,
  };
}

function normalizeAxiosError(error) {
  const payload = error?.response?.data ?? error?.data ?? null;

  return {
    success: false,
    status: error?.response?.status ?? error?.status ?? 0,
    message: payload?.message ?? error?.message ?? 'Request failed.',
    errors: Array.isArray(payload?.errors) ? payload.errors : payload?.errors ?? null,
    timestamp: payload?.timestamp ?? new Date().toISOString(),
    raw: error ?? null,
  };
}

function flushRefreshQueue(token) {
  const queuedRequests = refreshQueue;
  refreshQueue = [];

  queuedRequests.forEach(({ config, resolve }) => {
    const retryConfig = {
      ...config,
      __isRetry: true,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    };

    resolve(retryConfig);
  });
}

function rejectRefreshQueue(error) {
  const queuedRequests = refreshQueue;
  refreshQueue = [];

  queuedRequests.forEach(({ reject }) => reject(error));
}

/**
 * Refresh the access token using the backend refresh endpoint.
 *
 * @returns {Promise<string>} The refreshed access token.
 */
async function refreshAccessToken() {
  if (isRefreshing) {
    return null;
  }

  isRefreshing = true;

  try {
    const response = await apiClient.post(endpoints.auth.refresh, null, {
      skipAuth: true,
      headers: { Accept: 'application/json' },
    });

    const nextToken = response?.data?.accessToken;

    if (typeof nextToken !== 'string' || !nextToken.trim()) {
      throw new Error('Refresh token response did not include an access token.');
    }

    const storageType = getAccessToken('local') ? 'local' : 'session';
    setAccessToken(nextToken, storageType);
    return nextToken;
  } catch (error) {
    clearAccessToken('session');
    clearAccessToken('local');
    throw error;
  } finally {
    isRefreshing = false;
  }
}

function shouldRetryWithRefresh(error) {
  const status = error?.response?.status ?? error?.status ?? 0;
  const config = error?.config;

  if (!config || config.__isRetry || isRefreshRequest(config)) {
    return false;
  }

  return status === 401;
}

/**
 * Register request and response interceptors for auth header injection and refresh retries.
 *
 * @param {{ onRefreshFailure?: (error: Error) => void }} [callbacks={}] - Optional callbacks for refresh failures.
 * @returns {void}
 */
export function initializeInterceptors(callbacks = {}) {
  if (hasInitializedInterceptors) {
    return;
  }

  apiClient.interceptors.request.use((config) => attachHeaders(config));

  apiClient.interceptors.response.use(
    (response) => normalizeAxiosResponse(response),
    async (error) => {
      const config = error?.config;

      if (!config) {
        return Promise.reject(normalizeAxiosError(error));
      }

      if (!shouldRetryWithRefresh(error)) {
        return Promise.reject(normalizeAxiosError(error));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ config, resolve, reject });
        })
          .then((retryConfig) => apiClient.request({ ...retryConfig, __isRetry: true }))
          .catch((refreshError) => Promise.reject(normalizeAxiosError(refreshError)));
      }

      try {
        const newToken = await refreshAccessToken();
        flushRefreshQueue(newToken);

        const retryConfig = {
          ...config,
          __isRetry: true,
          headers: {
            ...(config.headers || {}),
            Authorization: `Bearer ${newToken}`,
          },
        };

        return apiClient.request(retryConfig);
      } catch (refreshError) {
        rejectRefreshQueue(refreshError);
        clearAccessToken('session');
        clearAccessToken('local');

        if (typeof callbacks.onRefreshFailure === 'function') {
          callbacks.onRefreshFailure(refreshError);
        }

        return Promise.reject(normalizeAxiosError(refreshError));
      }
    },
  );

  hasInitializedInterceptors = true;
}

export default initializeInterceptors;
