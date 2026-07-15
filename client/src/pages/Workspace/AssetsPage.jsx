import React, { useEffect, useMemo, useState } from 'react';
import {
  AssetDetailsModal,
  AssetGrid,
  AssetList,
  AssetStats,
  AssetsHeader,
  AssetsToolbar,
  EmptyAssets,
  UploadAssetModal,
} from '../../components/assets';
import Skeleton from '../../components/common/Skeleton';
import { useAssets } from '../../hooks/useAssets';
import { useToast } from '../../hooks/useToast';

const ASSET_CATEGORIES = [
  { value: 'all', label: 'All assets' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'audio', label: 'Audio' },
  { value: 'document', label: 'Documents' },
];

const ASSET_SORT_OPTIONS = [
  { value: 'uploaded_desc', label: 'Recently uploaded' },
  { value: 'uploaded_asc', label: 'Oldest uploaded' },
  { value: 'name_asc', label: 'Filename (A-Z)' },
  { value: 'size_desc', label: 'Largest files' },
];

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

function getSortParams(sortValue) {
  if (sortValue === 'uploaded_asc') return { sortBy: 'createdAt', sortOrder: 'asc' };
  if (sortValue === 'size_desc') return { sortBy: 'size', sortOrder: 'desc' };
  return { sortBy: 'createdAt', sortOrder: 'desc' };
}

function AssetsLoadingSkeleton() {
  return (
    <div className="space-y-7">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="h-40 border border-slate-800 bg-slate-900/40" rounded="lg" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 border border-slate-800 bg-slate-900/40" rounded="lg" />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-64 border border-slate-800 bg-slate-900/40" rounded="lg" />
        ))}
      </section>
    </div>
  );
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export function AssetsPage() {
  const toast = useToast();
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [sortValue, setSortValue] = useState('uploaded_desc');
  const [viewMode, setViewMode] = useState('grid');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [replacingAsset, setReplacingAsset] = useState(null);
  const [previewUrlMap, setPreviewUrlMap] = useState({});

  const queryParams = useMemo(() => {
    const params = {
      limit: 100,
      ...getSortParams(sortValue),
    };

    const search = searchValue.trim();
    if (search) params.search = search;
    if (filterValue !== 'all' && filterValue !== 'document') params.type = filterValue;

    return params;
  }, [filterValue, searchValue, sortValue]);

  const {
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
  } = useAssets(queryParams);

  const visibleAssets = useMemo(() => {
    const sorted = [...assets];

    const filtered =
      filterValue === 'document'
        ? sorted.filter((asset) => ['document', 'archive'].includes(asset.type))
        : sorted;

    if (sortValue === 'name_asc') {
      filtered.sort((a, b) => (a.filename || '').localeCompare(b.filename || ''));
    }

    return filtered;
  }, [assets, filterValue, sortValue]);

  useEffect(() => {
    let active = true;
    const previewableAssets = visibleAssets.filter((asset) => {
      if (!['image', 'video'].includes(asset.type)) return false;
      if (!asset.key) return false;
      if (asset.url && String(asset.url).startsWith('http')) return false;
      return !previewUrlMap[asset.id];
    });

    if (!previewableAssets.length) return undefined;

    previewableAssets.forEach(async (asset) => {
      try {
        const previewUrl = await getDownloadUrl(asset, { expiresIn: 900 });
        if (!active || !previewUrl) return;
        setPreviewUrlMap((current) => ({
          ...current,
          [asset.id]: previewUrl,
        }));
      } catch {
        // Preview falls back to the file icon tile when a signed preview URL is unavailable.
      }
    });

    return () => {
      active = false;
    };
  }, [getDownloadUrl, previewUrlMap, visibleAssets]);

  const assetsWithPreviews = useMemo(
    () =>
      visibleAssets.map((asset) => ({
        ...asset,
        previewUrl: asset.url && String(asset.url).startsWith('http') ? asset.url : previewUrlMap[asset.id],
      })),
    [previewUrlMap, visibleAssets]
  );

  const storageSummary = useMemo(() => {
    const usedBytes = assetsWithPreviews.reduce((total, asset) => total + Number(asset.sizeBytes || 0), 0);

    return {
      used: formatFileSize(usedBytes),
      totalLabel: 'total uploaded',
      remaining: `${assetsWithPreviews.length}`,
      remainingLabel: 'Files',
      usedPercent: assetsWithPreviews.length > 0 ? 100 : 0,
    };
  }, [assetsWithPreviews]);

  const selectedAssetWithPreview = useMemo(() => {
    if (!selectedAsset) return null;
    return {
      ...selectedAsset,
      previewUrl:
        selectedAsset.previewUrl ||
        (selectedAsset.url && String(selectedAsset.url).startsWith('http') ? selectedAsset.url : previewUrlMap[selectedAsset.id]),
    };
  }, [previewUrlMap, selectedAsset]);

  const handleUpload = async (filesOrFile) => {
    try {
      if (Array.isArray(filesOrFile)) {
        const uploaded = await uploadMany(filesOrFile);
        toast.success(`${uploaded.length} asset${uploaded.length === 1 ? '' : 's'} uploaded.`);
      } else {
        await upload(filesOrFile);
        toast.success('Asset uploaded.');
      }
    } catch (uploadError) {
      toast.error(uploadError?.message || 'Failed to upload asset.');
      throw uploadError;
    }
  };

  const handleReplace = async (file) => {
    if (!replacingAsset) return;

    try {
      await replace(replacingAsset.id, file);
      toast.success('Asset replaced.');
      setReplacingAsset(null);
    } catch (replaceError) {
      toast.error(replaceError?.message || 'Failed to replace asset.');
      throw replaceError;
    }
  };

  const handleDelete = async (asset) => {
    if (!asset?.id) return;
    const confirmed = window.confirm(`Delete "${asset.filename}"?`);
    if (!confirmed) return;

    try {
      await remove(asset.id);
      await refresh();
      setSelectedAsset((current) => (current?.id === asset.id ? null : current));
      toast.success('Asset deleted.');
    } catch (deleteError) {
      toast.error(deleteError?.message || 'Failed to delete asset.');
    }
  };

  const handleCopy = async (asset) => {
    try {
      const url = await getDownloadUrl(asset);
      await copyText(url);
      toast.success('Asset URL copied.');
    } catch (copyError) {
      toast.error(copyError?.message || 'Failed to copy asset URL.');
    }
  };

  const handleDownload = async (asset) => {
    try {
      const url = await getDownloadUrl(asset);
      const link = document.createElement('a');
      link.href = url;
      link.download = asset.filename || 'asset';
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Download started.');
    } catch (downloadError) {
      toast.error(downloadError?.message || 'Failed to download asset.');
    }
  };

  const handleOpenUpload = () => {
    setReplacingAsset(null);
    setUploadOpen(true);
  };

  const handleOpenReplace = (asset) => {
    setReplacingAsset(asset);
    setUploadOpen(true);
  };

  const handleCloseUpload = () => {
    setUploadOpen(false);
    setReplacingAsset(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <AssetsHeader
        eyebrow="Library"
        title="Assets"
        description="Manage images, videos, audio, and documents used across production workflows."
      />

      {loading ? (
        <div className="mt-7">
          <AssetsLoadingSkeleton />
        </div>
      ) : (
        <AssetStats assets={assetsWithPreviews} storage={storageSummary} />
      )}

      <AssetsToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={ASSET_CATEGORIES}
        sortValue={sortValue}
        onSortChange={setSortValue}
        sortOptions={ASSET_SORT_OPTIONS}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onUpload={handleOpenUpload}
      />

      <section className="mt-7">
        {loading ? null : error ? (
          <div className="rounded-2xl border border-rose-800 bg-rose-900/10 p-6 text-sm text-rose-200">
            {error?.message || 'Failed to load assets.'}
          </div>
        ) : assetsWithPreviews.length === 0 ? (
          <EmptyAssets />
        ) : viewMode === 'grid' ? (
          <AssetGrid
            assets={assetsWithPreviews}
            onView={setSelectedAsset}
            onDelete={handleDelete}
            onReplace={handleOpenReplace}
            onDownload={handleDownload}
            onCopy={handleCopy}
          />
        ) : (
          <AssetList
            assets={assetsWithPreviews}
            onView={setSelectedAsset}
            onDelete={handleDelete}
            onReplace={handleOpenReplace}
            onDownload={handleDownload}
            onCopy={handleCopy}
          />
        )}
      </section>

      <UploadAssetModal
        open={uploadOpen}
        onClose={handleCloseUpload}
        onUpload={replacingAsset ? handleReplace : handleUpload}
        submitting={uploading}
        progress={uploadProgress}
        multiple={!replacingAsset}
        title={replacingAsset ? 'Replace asset' : 'Upload assets'}
      />

      <AssetDetailsModal
        open={Boolean(selectedAsset)}
        asset={selectedAssetWithPreview}
        onClose={() => setSelectedAsset(null)}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default AssetsPage;
