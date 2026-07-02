import React from 'react';
import { Link, Outlet } from 'react-router-dom';

/**
 * Authentication shell: provides a route-level escape back to the public site.
 * Auth forms retain ownership of their own form layout and behavior.
 */
export function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <Link
        to="/"
        className="absolute left-4 top-4 z-10 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white sm:left-6 sm:top-6"
      >
        ← Back to home
      </Link>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
