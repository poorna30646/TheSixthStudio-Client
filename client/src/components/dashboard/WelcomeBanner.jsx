import React from 'react';

/**
 * WelcomeBanner
 * Welcome-back copy with a CTA button.
 */
export function WelcomeBanner() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <p className="text-sm text-slate-400">Welcome back</p>
      <h2 className="mt-1 text-lg font-semibold text-white">Your studio overview is ready</h2>
      <p className="mt-2 text-sm text-slate-400">
        Review recent activity, manage projects, and kick off the next production step.
      </p>

      <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
      >
        Continue
      </button>
    </section>
  );
}

export default WelcomeBanner;

