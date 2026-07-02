import axios from 'axios';
import { storage } from '../utils/storage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = storage.get('auth:accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = storage.get('auth:refreshToken');
        if (!refreshToken) {
          throw new Error('Missing refresh token');
        }

        const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/refresh`, {
          refreshToken,
        });

        const nextAccessToken = refreshResponse?.data?.accessToken;
        if (nextAccessToken) {
          storage.set('auth:accessToken', nextAccessToken);
          originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
          return api(originalRequest);
        }

        throw new Error('Refresh token did not return an access token');
      } catch (refreshError) {
        storage.remove('auth:user');
        storage.remove('auth:accessToken');
        storage.remove('auth:refreshToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const normalizeApiError = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred.';
};

export default api;
