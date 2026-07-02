/**
 * Authentication service layer.
 * @module services/auth/authService
 */
import { get, normalizeApiError, post } from '../../api/request';
import endpoints from '../../api/endpoints';
import { clearAccessToken, getAccessToken, setAccessToken } from '../../api/tokenManager';

function readResponsePayload(response) {
  return response?.data ?? response ?? {};
}

function readEnvelopeData(payload) {
  return payload?.data ?? payload ?? {};
}

function readMessage(payload, fallbackMessage) {
  return payload?.message ?? payload?.data?.message ?? fallbackMessage;
}

function normalizeLoginResponse(response) {
  const payload = readResponsePayload(response);
  const data = readEnvelopeData(payload);

  return {
    user: data?.user ?? null,
    accessToken: data?.accessToken ?? null,
    message: readMessage(payload, 'Signed in successfully.'),
  };
}

function normalizeRegisterResponse(response) {
  const payload = readResponsePayload(response);
  const data = readEnvelopeData(payload);

  return {
    user: data?.user ?? null,
    message: readMessage(payload, 'Registered successfully.'),
  };
}

function normalizeSessionResponse(response) {
  const payload = readResponsePayload(response);
  const data = readEnvelopeData(payload);

  return {
    user: data?.user ?? null,
    accessToken: data?.accessToken ?? null,
  };
}

function normalizeLogoutResponse(response) {
  const payload = readResponsePayload(response);

  return {
    success: payload?.success ?? true,
    message: readMessage(payload, 'Signed out successfully.'),
  };
}

function persistAccessToken(accessToken, rememberMe = false) {
  if (!accessToken) {
    return;
  }

  setAccessToken(accessToken, rememberMe ? 'local' : 'session');
}

function persistRefreshedAccessToken(accessToken) {
  if (!accessToken) {
    return;
  }

  const storageType = getAccessToken('local') ? 'local' : 'session';
  setAccessToken(accessToken, storageType);
}

/**
 * Authenticate a user and persist the access token.
 *
 * @param {{ email: string, password: string }} credentials - Login credentials.
 * @param {boolean} [rememberMe=false] - Whether to remember the session locally.
 * @returns {Promise<{ user: object|null, accessToken: string|null, message: string }>} The normalized login payload.
 */
export async function login(credentials, rememberMe = false) {
  try {
    const response = await post(endpoints.auth.login, credentials, { skipAuth: true });
    const normalized = normalizeLoginResponse(response);
    persistAccessToken(normalized.accessToken, rememberMe);
    return normalized;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Register a new user account.
 *
 * @param {object} payload - Registration payload.
 * @returns {Promise<{ user: object|null, message: string }>} The normalized registration payload.
 */
export async function register(payload) {
  try {
    const response = await post(endpoints.auth.register, payload, { skipAuth: true });
    return normalizeRegisterResponse(response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Sign out the authenticated user and clear any stored access token.
 *
 * @returns {Promise<{ success: boolean, message: string }>} The normalized logout payload.
 */
export async function logout() {
  try {
    const response = await post(endpoints.auth.logout);
    return normalizeLogoutResponse(response);
  } catch (error) {
    throw normalizeApiError(error);
  } finally {
    clearAccessToken('session');
    clearAccessToken('local');
  }
}

/**
 * Refresh an existing session and persist the new access token.
 *
 * @returns {Promise<{ user: object|null, accessToken: string|null }>} The normalized refresh payload.
 */
export async function refresh() {
  try {
    const response = await post(endpoints.auth.refresh, null, { skipAuth: true });
    const normalized = normalizeSessionResponse(response);
    persistRefreshedAccessToken(normalized.accessToken);
    return normalized;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Retrieve the current authenticated user profile.
 *
 * @returns {Promise<{ user: object|null }>} The normalized current user payload.
 */
export async function getCurrentUser() {
  try {
    const response = await get(endpoints.auth.me);
    const { user } = normalizeSessionResponse(response);

    return { user };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Request a password reset email.
 *
 * @param {object} payload - Password recovery payload.
 * @returns {Promise<{ success: boolean, message: string }>} The normalized password reset request payload.
 */
export async function forgotPassword(payload) {
  try {
    const response = await post(endpoints.auth.forgotPassword, payload, { skipAuth: true });
    const normalizedPayload = readResponsePayload(response);

    return {
      success: normalizedPayload?.success ?? true,
      message: readMessage(normalizedPayload, 'Password reset email sent.'),
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Submit a new password for a reset token.
 *
 * @param {object} payload - Password reset payload.
 * @returns {Promise<{ success: boolean, message: string }>} The normalized password reset payload.
 */
export async function resetPassword(payload) {
  try {
    const response = await post(endpoints.auth.resetPassword, payload, { skipAuth: true });
    const normalizedPayload = readResponsePayload(response);

    return {
      success: normalizedPayload?.success ?? true,
      message: readMessage(normalizedPayload, 'Password reset successful.'),
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Verify a user email address using a verification token.
 *
 * @param {string} token - Verification token.
 * @returns {Promise<{ success: boolean, message: string }>} The normalized verification payload.
 */
export async function verifyEmail(token) {
  try {
    const response = await get(`${endpoints.auth.verifyEmail}/${token}`);
    const normalizedPayload = readResponsePayload(response);

    return {
      success: normalizedPayload?.success ?? true,
      message: readMessage(normalizedPayload, 'Email verified successfully.'),
    };
  } catch (error) {
    throw normalizeApiError(error);
  }
}

const authService = {
  login,
  register,
  logout,
  refresh,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

export default authService;
