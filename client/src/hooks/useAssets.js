/**
 * useAssets (Module 5 - Phase 5.2)
 * Responsibilities: Load, Refresh, Delete, Upload, Loading state, Error state.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteAsset,
  getAssetDownloadUrl,
  listAssets,
  uploadAsset,
} from '../services/assets/asset.service';

function normalizeAssetError(error, fallbackMessage = 'Asset request failed.') {
  if (error instanceof Error) {
    return error;
  }

  const normalized = new Error(
    error?.response?.data?.message ||
      error?.raw?.response?.data?.message ||
      error?.message ||
      fallbackMessage
  );

  normalized.status = error?.status ?? error?.response?.status ?? error?.raw?.response?.status;
  normalized.errors = error?.errors ?? error?.response?.data?.errors ?? null;
  normalized.raw = error;

  return normalized;
}

function normalizeAssetList(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.assets)) return result.assets;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.assets)) return result.data.assets;
  return [];
}

function fileNameFromKey(key) {
  return String(key || '').split('/').filter(Boolean).pop() || 'Untitled asset';
}

function formatFileSize(bytes) {
  const value = Number(bytes);
  if (!Number.isFinite(value) || value <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size >= 10 || unitIndex === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[unitIndex]}`;
}

function thumbnailColorForType(type) {
  const colors = {
    image: 'bg-yellow-500',
    video: 'bg-amber-600',
    audio: 'bg-slate-700',
    document: 'bg-zinc-700',
    archive: 'bg-neutral-700',
    other: 'bg-slate-800',
  };

  return colors[type] || 'bg-slate-800';
}

function normalizeAsset(asset) {
  const sizeBytes = Number(asset?.size || 0);
  const type = asset?.type || 'other';

  return {
    ...asset,
    id: asset?.id ?? asset?._id ?? asset?.assetId ?? asset?.key,
    filename:
      asset?.filename ??
      asset?.name ??
      asset?.metadata?.originalName ??
      asset?.originalName ??
      fileNameFromKey(asset?.key),
    type,
    mimeType: asset?.mimeType || 'Unknown file',
    size: formatFileSize(sizeBytes),
    sizeBytes,
    sizeMb: sizeBytes / (1024 * 1024),
    uploadedAt: asset?.uploadedAt ?? asset?.createdAt ?? asset?.updatedAt ?? new Date().toISOString(),
    thumbnailColor: asset?.thumbnailColor ?? thumbnailColorForType(type),
  };
}

function mergeUploadedAsset(list, asset) {
  const normalized = normalizeAsset(asset);
  const id = normalized.id;

  if (!id) {
    return [normalized, ...list];
  }

  return [normalized, ...list.filter((item) => item.id !== id)];
}

const EMPTY_FILTERS = {};

export function useAssets(initialFilters = EMPTY_FILTERS) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const filters = useMemo(() => initialFilters || EMPTY_FILTERS, [initialFilters]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listAssets(filters);
      setAssets(normalizeAssetList(result).map(normalizeAsset));
    } catch (e) {
      setError(normalizeAssetError(e, 'Failed to load assets.'));
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  const remove = useCallback(
    async (assetId) => {
      setError(null);
      setLoading(true);
      try {
        await deleteAsset(assetId);
        await load();
      } catch (e) {
        const error = normalizeAssetError(e, 'Failed to delete asset.');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [load]
  );

  const upload = useCallback(
    async (file, options = {}) => {
      setError(null);
      setUploading(true);
      setUploadProgress(0);

      try {
        const uploaded = await uploadAsset(file, {
          ...options,
          onProgress: (progress) => {
            setUploadProgress(progress);
            if (typeof options.onProgress === 'function') {
              options.onProgress(progress);
            }
          },
        });
        setAssets((current) => mergeUploadedAsset(current, uploaded));
        setUploadProgress(100);
        await load();
        return uploaded;
      } catch (e) {
        const error = normalizeAssetError(e, 'Failed to upload asset.');
        setError(error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [load]
  );

  const uploadMany = useCallback(
    async (files, options = {}) => {
      const fileList = Array.from(files || []).filter(Boolean);

      if (!fileList.length) {
        throw new Error('Choose at least one file before uploading.');
      }

      setError(null);
      setUploading(true);
      setUploadProgress(0);

      const uploadedAssets = [];

      try {
        for (let index = 0; index < fileList.length; index += 1) {
          const file = fileList[index];
          const uploaded = await uploadAsset(file, {
            ...options,
            onProgress: (progress) => {
              const completed = index / fileList.length;
              const current = progress / 100 / fileList.length;
              const overallProgress = Math.round((completed + current) * 100);
              setUploadProgress(overallProgress);
              if (typeof options.onProgress === 'function') {
                options.onProgress(overallProgress, { file, index, total: fileList.length });
              }
            },
          });

          uploadedAssets.push(uploaded);
          setAssets((current) => mergeUploadedAsset(current, uploaded));
        }

        setUploadProgress(100);
        await load();
        return uploadedAssets;
      } catch (e) {
        const error = normalizeAssetError(e, 'Failed to upload assets.');
        setError(error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [load]
  );

  const replace = useCallback(
    async (assetId, file, options = {}) => {
      if (!assetId) {
        throw new Error('Asset id is required to replace an asset.');
      }

      setError(null);
      setUploading(true);
      setUploadProgress(0);

      try {
        const uploaded = await uploadAsset(file, {
          ...options,
          onProgress: (progress) => {
            setUploadProgress(progress);
            if (typeof options.onProgress === 'function') {
              options.onProgress(progress);
            }
          },
        });
        await deleteAsset(assetId);
        setAssets((current) => mergeUploadedAsset(current.filter((asset) => asset.id !== assetId), uploaded));
        setUploadProgress(100);
        await load();
        return uploaded;
      } catch (e) {
        const error = normalizeAssetError(e, 'Failed to replace asset.');
        setError(error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [load]
  );

  const getDownloadUrl = useCallback(async (asset, options = {}) => {
    const result = await getAssetDownloadUrl(asset, options);
    return result?.downloadUrl ?? result?.url ?? result?.signedUrl ?? result;
  }, []);

  const api = useMemo(
    () => ({
      assets,
      loading,
      uploading,
      uploadProgress,
      error,
      refresh,
      remove,
      upload,
      uploadMany,
      replace,
      getDownloadUrl,
    }),
    [assets, loading, uploading, uploadProgress, error, refresh, remove, upload, uploadMany, replace, getDownloadUrl]
  );

  return api;
}

export default useAssets;
