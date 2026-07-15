import React from 'react';

/**
 * QuickActions
 * Provides action buttons that do nothing (presentation-only).
 */
export function QuickActions() {
  const actions = [
    { label: 'Create Project' },
    { label: 'Upload Asset' },
    { label: 'Generate Video' },
    { label: 'Browse Templates' },
  ];

  return (
    <section aria-label="Quick actions">
      <h3 className="text-base font-semibold text-white">Quick actions</h3>
      <div className="mt-3 grid grid-cols-1 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-slate-900/60"
            onClick={() => {}}
          >
            {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;

