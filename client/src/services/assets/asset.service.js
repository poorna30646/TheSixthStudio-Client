/**
 * Assets service (Module 5 - Phase 5.2)
 * Uses the existing API layer and backend asset/storage contracts.
 */

import { endpoints } from '../../api';
import { get, post, patch, del, request } from '../../api/request';

function unwrap(res) {
  return res?.data?.data ?? res?.data ?? res;
}

function resolveUploadFolder(file, folder) {
  if (folder) return folder;

  const group = String(file?.type || '').split('/')[0];
  if (['image', 'video', 'audio'].includes(group)) {
    return 'temp';
  }

  return 'temp';
}

export async function listAssets(params = {}) {
  const res = await get(endpoints.assets.list, { params });
  return unwrap(res);
}

export async function getAsset(assetId) {
  const res = await get(endpoints.assets.detail(assetId));
  return unwrap(res);
}

export async function createAsset(payload) {
  const res = await post(endpoints.assets.create, payload);
  return unwrap(res);
}

export async function updateAsset(assetId, payload) {
  const res = await patch(endpoints.assets.update(assetId), payload);
  return unwrap(res);
}

export async function deleteAsset(assetId) {
  if (!assetId) {
    throw new Error('Asset id is required to delete an asset.');
  }

  const res = await del(endpoints.assets.delete(assetId), {
    data: undefined,
    transformRequest: [(data, headers) => {
      if (headers) {
        delete headers['Content-Type'];
        delete headers['content-type'];
      }
      return data;
    }],
  });
  return unwrap(res);
}

export async function getAssetDownloadUrl(asset, options = {}) {
  const key = typeof asset === 'string' ? asset : asset?.key;

  if (!key) {
    throw new Error('Asset key is required to create a download URL.');
  }

  const res = await post(endpoints.storage.downloadUrl, {
    key,
    expiresIn: options.expiresIn ?? 900,
  });
  return unwrap(res);
}

export async function createAssetUploadUrl(file, options = {}) {
  if (!file) {
    throw new Error('Choose a file before uploading.');
  }

  const payload = {
    fileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    folder: resolveUploadFolder(file, options.folder),
    expiresIn: options.expiresIn ?? 900,
  };

  if (options.projectId) {
    payload.projectId = options.projectId;
  }

  const res = await post(endpoints.storage.uploadUrl, payload);
  return unwrap(res);
}

export async function uploadAssetToStorage(uploadReservation, file, onProgress) {
  const headers = { ...(uploadReservation?.requiredHeaders || {}) };

  await request({
    url: uploadReservation.uploadUrl,
    method: uploadReservation.method || 'PUT',
    data: file,
    headers,
    skipAuth: true,
    timeout: 0,
    withCredentials: false,
    onUploadProgress: (event) => {
      if (!event.total || typeof onProgress !== 'function') return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    },
  });
}

export async function uploadAsset(file, options = {}) {
  const reservation = await createAssetUploadUrl(file, options);

  await uploadAssetToStorage(reservation, file, options.onProgress);

  const finalized = await createAsset({
    key: reservation.key,
    metadata: options.metadata || {},
    isPublic: options.isPublic ?? false,
  });

  return finalized?.asset ?? finalized;
}

const assetService = {
  listAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetDownloadUrl,
  createAssetUploadUrl,
  uploadAssetToStorage,
  uploadAsset,
};

export default assetService;
