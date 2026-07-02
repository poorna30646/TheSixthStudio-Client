import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="border-b border-slate-800 pb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="mt-3 text-sm text-slate-400">Review account identity and workspace preferences.</p>
      </header>
      <section className="mt-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="text-lg font-semibold text-white">Profile</h2>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Name</dt>
            <dd className="mt-2 text-sm text-white">{user?.name || 'Not provided'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Email</dt>
            <dd className="mt-2 break-all text-sm text-white">{user?.email || 'Not provided'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Role</dt>
            <dd className="mt-2 text-sm capitalize text-white">{user?.role || 'Member'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Theme</dt>
            <dd className="mt-2 text-sm text-white">System default</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

export default SettingsPage;
