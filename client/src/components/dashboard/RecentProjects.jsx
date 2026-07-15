import React from 'react';

/**
 * RecentProjects
 * Simple list presentation of recent projects.
 *
 * @param {Object} props
 * @param {Array<{id: string|number, name: string, updated: string}>} props.projects
 */
export function RecentProjects({ projects }) {
  return (
    <section aria-label="Recent projects">
      <h3 className="text-base font-semibold text-white">Recent projects</h3>
      <div className="mt-3 space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-sm font-semibold text-white">{p.name}</p>
            <p className="mt-1 text-xs text-slate-400">Updated {p.updated}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;

