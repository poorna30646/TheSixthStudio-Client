import React from 'react';

export function EmptyAssets() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-center">
      <p className="text-sm font-semibold text-white">No assets found</p>
      <p className="mt-2 text-sm text-slate-400">Uploaded files will appear here.</p>
    </div>
  );
}

export default EmptyAssets;
