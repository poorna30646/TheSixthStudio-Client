import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { clearAccessToken, getAccessToken } from '../api/tokenManager';
import * as authService from '../services/auth/auth.service';

const AuthContext = createContext(null);
const INITIAL_LOADING_STATE = Object.freeze({
  login: false,
  register: false,
  logout: false,
  restore: false,
  refresh: false,
});

function normalizeErrorState(error) {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return {
      status: 0,
      message: error,
      errors: null,
      timestamp: new Date().toISOString(),
      raw: error,
    };
  }

  if (typeof error === 'object' && 'message' in error) {
    return {
      status: error?.status ?? 0,
      message: error.message,
      errors: error?.errors ?? null,
      timestamp: error?.timestamp ?? new Date().toISOString(),
      raw: error?.raw ?? error,
    };
  }

  return {
    status: 0,
    message: 'Unable to complete the request.',
    errors: null,
    timestamp: new Date().toISOString(),
    raw: error,
  };
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingState, setLoadingState] = useState(INITIAL_LOADING_STATE);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const setAuthError = useCallback((nextError) => {
    const normalizedError = normalizeErrorState(nextError);
    setErrorState(normalizedError);
    setError(normalizedError?.message ?? null);
  }, []);

  const setOperationLoading = useCallback((key, value) => {
    setLoadingState((current) => ({ ...current, [key]: value }));
  }, []);

  const clearSession = useCallback(() => {
    clearAccessToken('session');
    clearAccessToken('local');
    setUserState(null);
    setAuthenticated(false);
    setRole(null);
    setAuthError(null);
    setLoadingState(INITIAL_LOADING_STATE);
  }, [setAuthError]);

  const setUser = useCallback((nextUser) => {
    const normalizedUser = nextUser ?? null;
    setUserState(normalizedUser);
    setAuthenticated(Boolean(normalizedUser));
    setRole(normalizedUser?.role ?? null);
  }, []);

  const redirect = useCallback((path) => {
    navigate(path, { replace: true });
  }, [navigate]);

  const restoreSession = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      clearSession();
      setInitializing(false);
      return;
    }

    setOperationLoading('restore', true);
    setInitializing(true);
    setAuthError(null);

    try {
      const session = await authService.getCurrentUser();
      setUser(session.user);
      return session;
    } catch (restoreError) {
      clearSession();
      setAuthError(restoreError);
      return null;
    } finally {
      setOperationLoading('restore', false);
      setInitializing(false);
    }
  }, [clearSession, setAuthError, setOperationLoading, setUser]);

  const login = useCallback(async (credentials, rememberMe = false) => {
    setOperationLoading('login', true);
    setAuthError(null);

    try {
      const session = await authService.login(credentials, rememberMe);
      setUser(session.user);
      redirect('/dashboard');
      return session;
    } catch (loginError) {
      setAuthError(loginError);
      throw loginError;
    } finally {
      setOperationLoading('login', false);
    }
  }, [redirect, setAuthError, setOperationLoading, setUser]);

  const register = useCallback(async (payload) => {
    setOperationLoading('register', true);
    setAuthError(null);

    try {
      const session = await authService.register(payload);
      redirect('/login');
      return session;
    } catch (registerError) {
      setAuthError(registerError);
      throw registerError;
    } finally {
      setOperationLoading('register', false);
    }
  }, [redirect, setAuthError, setOperationLoading]);

  const refreshSession = useCallback(async () => {
    setOperationLoading('refresh', true);
    setAuthError(null);

    try {
      const session = await authService.refresh();
      setUser(session.user);
      return session;
    } catch (refreshError) {
      clearSession();
      setAuthError(refreshError);
      redirect('/login');
      throw refreshError;
    } finally {
      setOperationLoading('refresh', false);
    }
  }, [clearSession, redirect, setAuthError, setOperationLoading, setUser]);

  const logout = useCallback(async () => {
    setOperationLoading('logout', true);
    setAuthError(null);

    try {
      await authService.logout();
    } catch (logoutError) {
      setAuthError(logoutError);
    } finally {
      clearSession();
      setOperationLoading('logout', false);
      redirect('/login');
    }
  }, [clearSession, redirect, setAuthError, setOperationLoading]);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const loading = useMemo(() => Object.values(loadingState).some(Boolean), [loadingState]);

  const value = useMemo(() => ({
    user,
    authenticated,
    loading,
    loadingState,
    initializing,
    error,
    errorState,
    errorMessage: error,
    role,
    isAuthenticated: authenticated,
    isLoading: loading || initializing,
    login,
    logout,
    register,
    refreshSession,
    restoreSession,
    clearSession,
    setUser,
  }), [authenticated, clearSession, error, errorState, initializing, loading, loadingState, login, logout, register, refreshSession, restoreSession, role, setUser, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
