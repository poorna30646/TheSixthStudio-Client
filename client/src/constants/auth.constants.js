/**
 * Shared authentication constants.
 * @module constants/authConstants
 */
export const AUTH_ROUTES = Object.freeze({
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
});

export const AUTH_STORAGE = Object.freeze({
  accessToken: 'the_sixth_studio_access_token',
});

export const AUTH_ERROR_MESSAGES = Object.freeze({
  default: 'We could not complete that request. Please try again.',
  network: 'You appear to be offline. Please check your connection and try again.',
  timeout: 'The request timed out. Please try again.',
  unauthorized: 'Your session has expired. Please sign in again.',
  forbidden: 'You do not have permission to access this resource.',
  notFound: 'The requested resource could not be found.',
  conflict: 'That email or username is already in use.',
  validation: 'Please correct the highlighted fields and try again.',
  server: 'We hit an unexpected issue. Please try again shortly.',
});
