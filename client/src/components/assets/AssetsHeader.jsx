import React from 'react';

export function AssetsHeader({ eyebrow, title, description }) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">{eyebrow}</p>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
    </header>
  );
}

export default AssetsHeader;
