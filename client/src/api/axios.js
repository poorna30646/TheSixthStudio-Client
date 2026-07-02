/**
 * Axios client configuration for the API layer.
 * @module api/axios
 */
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || '/api';

const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default apiClient;
