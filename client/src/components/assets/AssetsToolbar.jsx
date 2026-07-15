import React from 'react';

export function AssetsToolbar({
  searchValue = '',
  filterValue = 'all',
  filterOptions,
  sortValue,
  sortOptions,
  viewMode = 'grid',
}) {
  return (
    <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(160px,0.6fr)_minmax(180px,0.7fr)]">
        <input
          defaultValue={searchValue}
          placeholder="Search assets"
          className="h-10 rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-500"
        />

        <select
          defaultValue={filterValue}
          className="h-10 rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-slate-200 outline-none focus:border-yellow-500"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          defaultValue={sortValue}
          className="h-10 rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-slate-200 outline-none focus:border-yellow-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-1">
          <button
            type="button"
            className={`h-8 rounded-lg px-3 text-xs font-semibold ${
              viewMode === 'grid' ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            className={`h-8 rounded-lg px-3 text-xs font-semibold ${
              viewMode === 'list' ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            List
          </button>
        </div>

        <button
          type="button"
          className="h-10 rounded-xl bg-yellow-500 px-4 text-sm font-semibold text-slate-950 hover:bg-yellow-400"
        >
          Upload Asset
        </button>
      </div>
    </div>
  );
}

export default AssetsToolbar;
