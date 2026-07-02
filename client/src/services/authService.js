import api, { normalizeApiError } from './api';

export const authService = {
  async login(credentials) {
    try {
      return await api.post('/auth/login', credentials);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async register(payload) {
    try {
      return await api.post('/auth/register', payload);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async logout() {
    try {
      return await api.post('/auth/logout');
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async refresh(payload) {
    try {
      return await api.post('/auth/refresh', payload);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async forgotPassword(payload) {
    try {
      return await api.post('/auth/forgot-password', payload);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async resetPassword(payload) {
    try {
      return await api.post('/auth/reset-password', payload);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
  async verifyEmail(token) {
    try {
      return await api.get(`/auth/verify-email/${token}`);
    } catch (error) {
      throw new Error(normalizeApiError(error));
    }
  },
};

export default authService;
