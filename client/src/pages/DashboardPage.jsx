import React from 'react';
import { FaArrowRight, FaFilm, FaFolderOpen, FaImages } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const quickActions = [
  { label: 'Open projects', description: 'View and organize active productions.', to: '/projects', icon: FaFolderOpen },
  { label: 'Browse assets', description: 'Find uploaded and generated media.', to: '/assets', icon: FaImages },
  { label: 'Review videos', description: 'Track drafts, renders, and exports.', to: '/videos', icon: FaFilm },
];

export function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <header>
        <p className="text-sm text-slate-500">Dashboard</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
          {firstName ? `Welcome back, ${firstName}` : 'Welcome to your studio'}
        </h1>
        <p className="mt-3 text-sm text-slate-400">Your production workspace is ready for the next module.</p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Workspace summary">
        {[
          ['Active projects', '0'],
          ['Media assets', '0'],
          ['Rendered videos', '0'],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8" aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="text-lg font-semibold text-white">Continue building</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {quickActions.map(({ label, description, to, icon: Icon }) => (
            <Link key={to} to={to} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900">
              <Icon className="text-amber-400" aria-hidden="true" />
              <h3 className="mt-5 font-semibold text-white">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              <FaArrowRight className="mt-5 text-xs text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-400" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
