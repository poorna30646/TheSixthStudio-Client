import React from 'react';
import { FaPlay } from 'react-icons/fa';

export function WorkspacePage() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr_240px]">
      <aside className="hidden border-r border-slate-800 bg-slate-950 p-4 md:block" aria-label="Scene list">
        <h1 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scenes</h1>
        {[1, 2, 3].map((scene) => (
          <button key={scene} type="button" className="mt-3 flex h-20 w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2 text-left">
            <span className="text-xs text-slate-500">{scene}</span>
            <span className="h-full flex-1 rounded-lg bg-slate-800" />
          </button>
        ))}
      </aside>
      <section className="flex min-w-0 flex-col bg-slate-900/30 p-3 sm:p-5" aria-label="Video canvas">
        <div className="grid min-h-[360px] flex-1 place-items-center rounded-xl border border-slate-800 bg-black/30">
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10">
              <FaPlay aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-medium">Video canvas</p>
            <p className="mt-1 text-xs text-slate-500">Ready for the Module 4 editor engine</p>
          </div>
        </div>
        <div className="mt-3 h-28 rounded-xl border border-slate-800 bg-slate-950 p-3" aria-label="Timeline">
          <div className="h-3 rounded-full bg-slate-800" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((clip) => <span key={clip} className="h-12 rounded-lg bg-slate-800" />)}
          </div>
        </div>
      </section>
      <aside className="hidden border-l border-slate-800 bg-slate-950 p-4 lg:block" aria-label="Scene properties">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Properties</p>
        {['Scene layout', 'Voice', 'Duration', 'Transition'].map((property) => (
          <div key={property} className="mt-5">
            <p className="mb-2 text-xs text-slate-500">{property}</p>
            <div className="h-10 rounded-lg border border-slate-800 bg-slate-900" />
          </div>
        ))}
      </aside>
    </div>
  );
}

export default WorkspacePage;
