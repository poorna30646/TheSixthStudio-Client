/**
 * Token storage helpers for access tokens.
 * @module api/tokenManager
 */
const ACCESS_TOKEN_KEY = 'the_sixth_studio_access_token';

function getStorage(storageType = 'session') {
  if (typeof window === 'undefined') {
    return null;
  }

  if (storageType === 'local') {
    return window.localStorage;
  }

  return window.sessionStorage;
}

function normalizeToken(token) {
  if (typeof token !== 'string') {
    return null;
  }

  const trimmedToken = token.trim();

  if (!trimmedToken) {
    return null;
  }

  return trimmedToken;
}

/**
 * Purpose: Persist an access token in session storage.
 * Parameters: token - The access token value to store.
 * Returns: Nothing.
 * Side effects: Writes to browser session storage.
 *
 * @param {string | null} token - The access token value to store.
 * @returns {void}
 */
export function setAccessToken(token, storageType = 'session') {
  const storage = getStorage(storageType);
  const normalizedToken = normalizeToken(token);

  if (!storage) {
    return;
  }

  if (!normalizedToken) {
    storage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  storage.setItem(ACCESS_TOKEN_KEY, normalizedToken);
}

/**
 * Purpose: Read the stored access token.
 * Parameters: None.
 * Returns: The stored access token or null.
 * Side effects: None.
 *
 * @returns {string | null} The access token if present.
 */
export function getAccessToken(storageType = 'session') {
  const storages = [getStorage(storageType), getStorage(storageType === 'local' ? 'session' : 'local')].filter(Boolean);

  for (const storage of storages) {
    try {
      const token = normalizeToken(storage.getItem(ACCESS_TOKEN_KEY));

      if (token) {
        return token;
      }
    } catch (error) {
      // Ignore storage failures and continue.
    }
  }

  return null;
}

/**
 * Purpose: Remove the stored access token.
 * Parameters: None.
 * Returns: Nothing.
 * Side effects: Deletes the stored token.
 *
 * @returns {void}
 */
export function clearAccessToken(storageType = 'session') {
  const storage = getStorage(storageType);

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    // Ignore storage failures.
  }
}

/**
 * Purpose: Determine whether an access token is available.
 * Parameters: None.
 * Returns: True when a token exists.
 * Side effects: None.
 *
 * @returns {boolean} True when a token is available.
 */
export function hasAccessToken(storageType = 'session') {
  return Boolean(getAccessToken(storageType));
}

const tokenManager = {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  hasAccessToken,
};

export default tokenManager;
