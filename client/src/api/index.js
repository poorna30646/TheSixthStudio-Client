/**
 * Public API entry point for the API layer.
 * @module api/index
 */
export { default as apiClient } from './axios';
export { default as endpoints } from './endpoints';
export { initializeInterceptors } from './interceptors';
export {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  hasAccessToken,
} from './tokenManager';
export {
  request,
  get,
  post,
  put,
  patch,
  remove,
  upload,
  download,
  createAbortController,
  isRequestCancelled,
  isUnauthorized,
  isServerError,
  isValidationError,
  normalizeApiError,
} from './request';
