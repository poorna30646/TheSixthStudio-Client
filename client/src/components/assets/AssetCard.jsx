import React from 'react';
import AssetPreview from './AssetPreview';

export function AssetCard({
  asset,
  onView,
  onDelete,
  onReplace,
  onDownload,
  onCopy,
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="relative">
        <button type="button" className="block w-full text-left" onClick={() => onView?.(asset)}>
          <AssetPreview asset={asset} type={asset.type} color={asset.thumbnailColor} />
        </button>
        <div className="absolute right-2 top-2 flex gap-1">
          <button
            type="button"
            className="h-8 rounded-lg border border-white/10 bg-slate-950/80 px-3 text-xs text-slate-200"
            onClick={() => onView?.(asset)}
          >
            View
          </button>
        </div>
      </div>

      <div className="mt-4 min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">{asset.filename}</h3>
        <p className="mt-1 text-xs text-slate-400">{asset.mimeType}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Size</p>
          <p className="mt-1 text-xs text-slate-300">{asset.size}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Uploaded</p>
          <p className="mt-1 text-xs text-slate-300">{new Date(asset.uploadedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white" onClick={() => onDownload?.(asset)}>
          Download
        </button>
        <button type="button" className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white" onClick={() => onCopy?.(asset)}>
          Copy URL
        </button>
        <button type="button" className="h-8 rounded-lg border border-slate-800 bg-slate-950 px-2 text-xs text-slate-300 hover:text-white" onClick={() => onReplace?.(asset)}>
          Replace
        </button>
        <button type="button" className="h-8 rounded-lg border border-rose-900 bg-rose-950/30 px-2 text-xs text-rose-200 hover:text-white" onClick={() => onDelete?.(asset)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default AssetCard;
