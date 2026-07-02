/**
 * Authentication helpers and validators.
 * @module utils/auth
 */
import { AUTH_ERROR_MESSAGES } from '../constants/auth.constants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Purpose: Validate an email address.
 * Parameters: value - User input.
 * Returns: Empty string when valid, otherwise an error message.
 * Side effects: None.
 *
 * @param {string} value - The email address to validate.
 * @returns {string} The validation message.
 */
export function validateEmail(value) {
  if (!value || !value.trim()) {
    return 'Email is required.';
  }

  if (!EMAIL_PATTERN.test(value.trim())) {
    return 'Please enter a valid email address.';
  }

  return '';
}

/**
 * Purpose: Validate a password for minimum strength requirements.
 * Parameters: value - User input.
 * Returns: Empty string when valid, otherwise an error message.
 * Side effects: None.
 *
 * @param {string} value - The password to validate.
 * @returns {string} The validation message.
 */
export function validatePassword(value) {
  if (!value) {
    return 'Password is required.';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    return 'Password must include upper, lower, and numeric characters.';
  }

  return '';
}

/**
 * Purpose: Validate a confirmation password.
 * Parameters: password - Original password, confirmPassword - Confirmation input.
 * Returns: Empty string when valid, otherwise an error message.
 * Side effects: None.
 *
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The confirmation password.
 * @returns {string} The validation message.
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  return '';
}

/**
 * Purpose: Determine password strength for UI feedback.
 * Parameters: value - Password input.
 * Returns: Score and label.
 * Side effects: None.
 *
 * @param {string} value - The password to assess.
 * @returns {{score: number, label: string}} Password strength metadata.
 */
export function getPasswordStrength(value) {
  if (!value) {
    return { score: 0, label: 'Enter a password' };
  }

  let score = 0;

  if (value.length >= 8) {
    score += 1;
  }

  if (/[A-Z]/.test(value)) {
    score += 1;
  }

  if (/[a-z]/.test(value)) {
    score += 1;
  }

  if (/\d/.test(value)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(value)) {
    score += 1;
  }

  if (score <= 2) {
    return { score, label: 'Weak' };
  }

  if (score <= 4) {
    return { score, label: 'Good' };
  }

  return { score, label: 'Strong' };
}

/**
 * Purpose: Map API errors to user-friendly messages.
 * Parameters: error - The normalized error object or string.
 * Returns: Friendly UI text.
 * Side effects: None.
 *
 * @param {Error | object | string | null} error - The error to interpret.
 * @returns {string} The friendly error message.
 */
export function getAuthErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  const status = error?.status ?? error?.response?.status;

  switch (status) {
    case 400:
      return AUTH_ERROR_MESSAGES.validation;
    case 401:
      return AUTH_ERROR_MESSAGES.unauthorized;
    case 403:
      return AUTH_ERROR_MESSAGES.forbidden;
    case 404:
      return AUTH_ERROR_MESSAGES.notFound;
    case 409:
      return AUTH_ERROR_MESSAGES.conflict;
    case 422:
      return AUTH_ERROR_MESSAGES.validation;
    case 429:
      return 'Too many attempts. Please wait a moment and try again.';
    case 500:
      return AUTH_ERROR_MESSAGES.server;
    default:
      return error?.code === 'ERR_NETWORK' || error?.message === 'Network Error'
        ? AUTH_ERROR_MESSAGES.network
        : AUTH_ERROR_MESSAGES.default;
  }
}
