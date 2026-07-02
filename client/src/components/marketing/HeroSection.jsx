import React from 'react';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { ButtonLink } from '../common/Button';
import Container from '../layout/Container';

export function HeroSection() {
  return (
    <section className="overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            The AI video workspace for modern creative teams
          </p>
          <h1 className="mt-7 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            From first idea to final frame, in one studio.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            Plan, generate, narrate, edit, and render videos with a workflow built for speed and repeatability.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/register" size="lg">
              Start creating <FaArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/features" size="lg" variant="secondary">
              <FaPlay className="text-xs" aria-hidden="true" /> Explore the workflow
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/40 sm:p-4">
          <div className="flex items-center gap-2 border-b border-slate-800 px-2 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs text-slate-500">Project / Product launch</span>
          </div>
          <div className="grid min-h-[280px] gap-3 pt-3 sm:grid-cols-[180px_1fr] sm:min-h-[420px]">
            <div className="hidden rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Scenes</p>
              {[1, 2, 3, 4].map((scene) => (
                <div key={scene} className="mt-3 h-16 rounded-lg border border-slate-800 bg-slate-900 p-2">
                  <span className="text-xs text-slate-500">{String(scene).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
            <div className="grid place-items-center rounded-xl border border-slate-800 bg-[radial-gradient(circle_at_center,_rgba(245,185,66,0.13),_transparent_55%)] p-8 text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300">
                  <FaPlay aria-hidden="true" />
                </span>
                <p className="mt-5 text-lg font-medium text-white">Interactive editor preview</p>
                <p className="mt-2 text-sm text-slate-500">Visual placeholder for the Module 4 workspace</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
