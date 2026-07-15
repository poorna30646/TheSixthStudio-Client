import React from 'react';

const TYPE_LABELS = {
  image: 'IMG',
  video: 'VID',
  audio: 'AUD',
  document: 'DOC',
};

export function AssetPreview({ type, color }) {
  return (
    <div className={`flex aspect-video items-center justify-center rounded-xl ${color || 'bg-slate-800'}`}>
      <div className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
        {TYPE_LABELS[type] || 'FILE'}
      </div>
    </div>
  );
}

export default AssetPreview;
