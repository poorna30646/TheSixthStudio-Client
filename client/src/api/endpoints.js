/**
 * Centralized API endpoint definitions.
 * @module api/endpoints
 */
const endpoints = Object.freeze({
  auth: Object.freeze({
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh-token',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  }),
  projects: Object.freeze({
    list: '/projects',
    create: '/projects',
    update: (projectId) => `/projects/${projectId}`,
    delete: (projectId) => `/projects/${projectId}`,
    detail: (projectId) => `/projects/${projectId}`,
  }),
  assets: Object.freeze({
    list: '/assets',
    create: '/assets',
    detail: (assetId) => `/assets/${assetId}`,
    update: (assetId) => `/assets/${assetId}`,
    delete: (assetId) => `/assets/${assetId}`,
  }),
  videos: Object.freeze({
    list: '/videos',
    create: '/videos',
    detail: (videoId) => `/videos/${videoId}`,
    update: (videoId) => `/videos/${videoId}`,
    delete: (videoId) => `/videos/${videoId}`,
  }),
  voices: Object.freeze({
    list: '/voices',
    create: '/voices',
    detail: (voiceId) => `/voices/${voiceId}`,
    update: (voiceId) => `/voices/${voiceId}`,
    delete: (voiceId) => `/voices/${voiceId}`,
  }),
  templates: Object.freeze({
    list: '/templates',
    create: '/templates',
    detail: (templateId) => `/templates/${templateId}`,
    update: (templateId) => `/templates/${templateId}`,
    delete: (templateId) => `/templates/${templateId}`,
  }),
  storage: Object.freeze({
    uploadUrl: '/storage/upload-url',
    downloadUrl: '/storage/download-url',
    deleteObject: '/storage/object',
  }),
  settings: Object.freeze({
    get: '/settings',
    update: '/settings',
  }),
});

export default endpoints;
