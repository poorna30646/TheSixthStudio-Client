/**
 * Generic API request helpers with normalized payloads.
 * @module api/request
 */
import axios from 'axios';
import apiClient from './axios';
import { initializeInterceptors } from './interceptors';

initializeInterceptors();

function normalizeErrorPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.errors)) {
      return payload.errors;
    }

    if (typeof payload.message === 'string') {
      return payload.message;
    }
  }

  return null;
}

function extractMessage(error) {
  const payload = error?.response?.data ?? error?.data ?? null;

  if (payload && typeof payload === 'object') {
    if (typeof payload.message === 'string') {
      return payload.message;
    }

    if (typeof payload.error === 'string') {
      return payload.error;
    }
  }

  if (typeof error?.message === 'string') {
    return error.message;
  }

  return 'Request failed.';
}

function buildNormalizedResponse(axiosResponse) {
  if (
    axiosResponse &&
    typeof axiosResponse === 'object' &&
    Object.prototype.hasOwnProperty.call(axiosResponse, 'success') &&
    Object.prototype.hasOwnProperty.call(axiosResponse, 'statusCode') &&
    Object.prototype.hasOwnProperty.call(axiosResponse, 'data')
  ) {
    return axiosResponse;
  }

  const payload = axiosResponse?.data ?? {};

  if (payload && typeof payload === 'object' && 'success' in payload) {
    return {
      success: payload.success ?? true,
      statusCode: payload.statusCode ?? axiosResponse?.status ?? 200,
      message: payload.message ?? '',
      data: payload.data ?? {},
      timestamp: payload.timestamp ?? null,
    };
  }

  return {
    success: true,
    statusCode: axiosResponse?.status ?? 200,
    message: '',
    data: payload,
    timestamp: null,
  };
}

function buildRequestConfig(config = {}) {
  const requestConfig = { ...config };

  if (requestConfig.abortController) {
    requestConfig.signal = requestConfig.abortController.signal;
  }

  if (requestConfig.isMultipart) {
    requestConfig.headers = {
      ...(requestConfig.headers || {}),
      'Content-Type': 'multipart/form-data',
    };
  }

  return requestConfig;
}

/**
 * Execute a generic HTTP request and return the normalized backend payload.
 *
 * @param {object} [config={}] - Axios-compatible request configuration.
 * @returns {Promise<{ success: boolean, statusCode: number, message: string, data: unknown, timestamp: string | null }>} The normalized response payload.
 */
export async function request(config = {}) {
  const requestConfig = buildRequestConfig(config);

  try {
    const response = await apiClient.request(requestConfig);
    return buildNormalizedResponse(response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Execute a GET request.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function get(url, config = {}) {
  return request({ ...config, url, method: 'GET' });
}

/**
 * Execute a POST request.
 *
 * @param {string} url - The endpoint URL.
 * @param {unknown} [data=null] - The payload to send.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function post(url, data = null, config = {}) {
  return request({ ...config, url, method: 'POST', data });
}

/**
 * Execute a PUT request.
 *
 * @param {string} url - The endpoint URL.
 * @param {unknown} [data=null] - The payload to send.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function put(url, data = null, config = {}) {
  return request({ ...config, url, method: 'PUT', data });
}

/**
 * Execute a PATCH request.
 *
 * @param {string} url - The endpoint URL.
 * @param {unknown} [data=null] - The payload to send.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function patch(url, data = null, config = {}) {
  return request({ ...config, url, method: 'PATCH', data });
}

/**
 * Execute a DELETE request.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function remove(url, config = {}) {
  return request({ ...config, url, method: 'DELETE' });
}

/**
 * Execute a DELETE request using the normalized request layer.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function del(url, config = {}) {
  return request({ ...config, url, method: 'DELETE' });
}

/**
 * Upload multipart form data.
 *
 * @param {string} url - The endpoint URL.
 * @param {FormData} formData - The upload payload.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function upload(url, formData, config = {}) {
  return request({ ...config, url, method: 'POST', data: formData, isMultipart: true });
}

/**
 * Download a remote resource as a blob.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} [config={}] - Request configuration.
 * @returns {Promise<object>} The normalized backend payload.
 */
export function download(url, config = {}) {
  return request({ ...config, url, method: 'GET', responseType: 'blob' });
}

/**
 * Create an AbortController for request cancellation.
 *
 * @returns {AbortController} The created controller.
 */
export function createAbortController() {
  return new AbortController();
}

/**
 * Detect whether an error was caused by request cancellation.
 *
 * @param {Error} error - The error object.
 * @returns {boolean} True when the request was canceled.
 */
export function isRequestCancelled(error) {
  return axios.isCancel(error) || error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError';
}

/**
 * Detect whether the server rejected the request as unauthorized.
 *
 * @param {Error | object} error - The error object.
 * @returns {boolean} True when the response status is 401.
 */
export function isUnauthorized(error) {
  return error?.status === 401 || error?.response?.status === 401;
}

/**
 * Detect whether the server returned a server error.
 *
 * @param {Error | object} error - The error object.
 * @returns {boolean} True when the response status is 500 or above.
 */
export function isServerError(error) {
  const status = error?.status ?? error?.response?.status ?? 0;
  return status >= 500;
}

/**
 * Detect whether the server returned a validation error.
 *
 * @param {Error | object} error - The error object.
 * @returns {boolean} True when the response status is 422.
 */
export function isValidationError(error) {
  return error?.status === 422 || error?.response?.status === 422;
}

/**
 * Normalize an API error into the application-level error contract.
 *
 * @param {Error | object} error - The original error object.
 * @returns {{ success: boolean, status: number, message: string, errors: unknown, timestamp: string, raw: unknown }} The normalized error payload.
 */
export function normalizeApiError(error) {
  if (error && typeof error === 'object' && error.success === false && Object.prototype.hasOwnProperty.call(error, 'status')) {
    return error;
  }

  const status = error?.response?.status ?? error?.status ?? 0;
  const payload = error?.response?.data ?? error?.data ?? null;

  return {
    success: false,
    status,
    message: extractMessage(error),
    errors: normalizeErrorPayload(payload),
    timestamp: error?.timestamp ?? new Date().toISOString(),
    raw: error ?? null,
  };
}

export default request;
