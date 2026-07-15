import React from 'react';
import AssetPreview from './AssetPreview';

function AssetListActions() {
  return (
    <div className="relative">
      <button
        type="button"
        className="h-9 rounded-lg border border-slate-800 bg-slate-900/30 px-3 text-xs text-slate-300"
        aria-label="Asset actions"
        aria-haspopup="menu"
        aria-expanded={false}
      >
        More
      </button>
    </div>
  );
}

export function AssetList({ assets }) {
  return (
    <div className="space-y-3" aria-label="Assets list">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:grid-cols-[1.4fr_0.7fr_0.6fr_0.8fr_0.4fr] sm:items-center"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-24 shrink-0">
              <AssetPreview type={asset.type} color={asset.thumbnailColor} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">{asset.filename}</div>
              <div className="mt-1 text-xs text-slate-400">{asset.mimeType}</div>
            </div>
          </div>
          <div className="text-sm capitalize text-slate-300">{asset.type}</div>
          <div className="text-sm text-slate-300">{asset.size}</div>
          <div className="text-sm text-slate-300">{new Date(asset.uploadedAt).toLocaleDateString()}</div>
          <div className="justify-self-start sm:justify-self-end">
            <AssetListActions />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssetList;
