import React from 'react';

/**
 * DashboardHeader
 * Displays the page title, current date, and a short greeting.
 *
 * @param {Object} props
 * @param {string} props.greeting - Short greeting text (e.g., "Good morning").
 * @param {string} props.dateText - Formatted current date.
 */
export function DashboardHeader({ greeting, dateText }) {
  return (
    <header>
      <p className="text-sm text-slate-500">Dashboard</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
        {greeting}
      </h1>
      <p className="mt-3 text-sm text-slate-400">{dateText}</p>
    </header>
  );
}

export default DashboardHeader;

