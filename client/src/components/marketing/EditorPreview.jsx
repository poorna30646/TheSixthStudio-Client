import React from 'react';
import { FaPlay } from 'react-icons/fa';
import Section from '../layout/Section';

export function EditorPreview() {
  return (
    <Section
      id="editor"
      eyebrow="Editor"
      title="Keep the whole production in view"
      description="A focused workspace connects scenes, assets, narration, preview, and render controls."
    >
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/30">
        <div className="flex h-12 items-center justify-between border-b border-slate-800 px-4">
          <span className="text-sm font-medium text-white">Campaign draft</span>
          <span className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950">Render</span>
        </div>
        <div className="grid min-h-[420px] lg:grid-cols-[210px_1fr_220px]">
          <aside className="hidden border-r border-slate-800 p-4 lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scenes</p>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="mt-3 flex h-16 items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-2">
                <span className="text-xs text-slate-500">{item}</span>
                <span className="h-full flex-1 rounded bg-slate-800" />
              </div>
            ))}
          </aside>
          <div className="flex flex-col p-4">
            <div className="grid flex-1 place-items-center rounded-xl border border-slate-800 bg-slate-950">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white">
                <FaPlay aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 h-20 rounded-xl border border-slate-800 bg-slate-950 p-3">
              <div className="h-3 w-full rounded-full bg-slate-800">
                <div className="h-3 w-2/5 rounded-full bg-amber-400/60" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((item) => <span key={item} className="h-7 rounded bg-slate-800" />)}
              </div>
            </div>
          </div>
          <aside className="hidden border-l border-slate-800 p-4 lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Properties</p>
            {['Layout', 'Narration', 'Transition', 'Duration'].map((property) => (
              <div key={property} className="mt-4">
                <p className="mb-2 text-xs text-slate-500">{property}</p>
                <div className="h-9 rounded-lg border border-slate-800 bg-slate-950" />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </Section>
  );
}

export default EditorPreview;
