import React from 'react';

/**
 * ActivityTimeline
 * Simple vertical activity list.
 *
 * @param {Object} props
 * @param {Array<{id: string|number, title: string, time: string}>} props.items
 */
export function ActivityTimeline({ items }) {
  return (
    <section aria-label="Activity timeline">
      <h3 className="text-base font-semibold text-white">Activity</h3>
      <div className="mt-3 space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-white">{it.title}</p>
              <p className="mt-1 text-xs text-slate-400">{it.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;

