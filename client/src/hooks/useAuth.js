/**
 * Authentication hook exposing the auth context contract.
 * @module hooks/useAuth
 */
import { useAuthContext } from '../context/AuthContext';

/**
 * Purpose: Expose the auth context to React components.
 * Parameters: None.
 * Returns: The shared authentication context value.
 * Side effects: None.
 *
 * @returns {object} The authentication context value.
 */
export function useAuth() {
  return useAuthContext();
}

export default useAuth;
