import React from 'react';

const CATEGORY_LABELS = {
  image: 'Images',
  video: 'Videos',
  audio: 'Audio',
  document: 'Documents',
};

export function AssetStats({ assets, storage }) {
  const counts = assets.reduce(
    (acc, asset) => {
      const type = asset.type === 'archive' ? 'document' : asset.type;
      return {
        ...acc,
        [type]: (acc[type] || 0) + 1,
      };
    },
    {}
  );

  return (
    <section className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">Storage</p>
            <h2 className="mt-2 text-lg font-semibold text-white">Asset storage</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{storage.used}</p>
            <p className="text-xs text-slate-400">{storage.totalLabel || `of ${storage.total} used`}</p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${storage.usedPercent}%` }} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Used storage</p>
            <p className="mt-1 text-sm text-slate-200">{storage.used}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {storage.remainingLabel || 'Remaining'}
            </p>
            <p className="mt-1 text-sm text-slate-200">{storage.remaining}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(CATEGORY_LABELS).map(([type, label]) => (
          <div key={type} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{counts[type] || 0}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AssetStats;
