import React from 'react';

/**
 * RecentVideos
 * Simple list presentation of recent videos.
 *
 * @param {Object} props
 * @param {Array<{id: string|number, name: string, updated: string}>} props.videos
 */
export function RecentVideos({ videos }) {
  return (
    <section aria-label="Recent videos">
      <h3 className="text-base font-semibold text-white">Recent videos</h3>
      <div className="mt-3 space-y-3">
        {videos.map((v) => (
          <div key={v.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-sm font-semibold text-white">{v.name}</p>
            <p className="mt-1 text-xs text-slate-400">Updated {v.updated}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentVideos;

