import React from 'react';
import AssetPreview from './AssetPreview';

function AssetListActions({ asset, onView, onDelete, onReplace, onDownload, onCopy }) {
  return (
    <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
      <button
        type="button"
        className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white"
        onClick={() => onView?.(asset)}
      >
        View
      </button>
      <button
        type="button"
        className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white"
        onClick={() => onDownload?.(asset)}
      >
        Download
      </button>
      <button
        type="button"
        className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white"
        onClick={() => onCopy?.(asset)}
      >
        Copy
      </button>
      <button
        type="button"
        className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white"
        onClick={() => onReplace?.(asset)}
      >
        Replace
      </button>
      <button
        type="button"
        className="h-8 rounded-lg border border-rose-900 bg-rose-950/30 px-2 text-xs text-rose-200 hover:text-white"
        onClick={() => onDelete?.(asset)}
      >
        Delete
      </button>
    </div>
  );
}

export function AssetList({ assets, onView, onDelete, onReplace, onDownload, onCopy }) {
  return (
    <div className="space-y-3" aria-label="Assets list">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 lg:grid-cols-[1.4fr_0.5fr_0.5fr_0.6fr_1fr] lg:items-center"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-24 shrink-0">
              <button type="button" className="block w-full text-left" onClick={() => onView?.(asset)}>
                <AssetPreview asset={asset} type={asset.type} color={asset.thumbnailColor} />
              </button>
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">{asset.filename}</div>
              <div className="mt-1 text-xs text-slate-400">{asset.mimeType}</div>
            </div>
          </div>
          <div className="text-sm capitalize text-slate-300">{asset.type}</div>
          <div className="text-sm text-slate-300">{asset.size}</div>
          <div className="text-sm text-slate-300">{new Date(asset.uploadedAt).toLocaleDateString()}</div>
          <div className="justify-self-start lg:justify-self-end">
            <AssetListActions
              asset={asset}
              onView={onView}
              onDelete={onDelete}
              onReplace={onReplace}
              onDownload={onDownload}
              onCopy={onCopy}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssetList;
