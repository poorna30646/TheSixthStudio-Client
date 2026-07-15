import React from 'react';

/**
 * StatCard
 * Reusable stat presentation card.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} [props.description]
 */
export function StatCard({ title, value, description }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      {description ? <p className="mt-2 text-xs text-slate-400">{description}</p> : null}
    </article>
  );
}

export default StatCard;

