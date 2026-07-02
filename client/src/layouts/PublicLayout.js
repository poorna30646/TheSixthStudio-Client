import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/marketing/Footer';
import Navbar from '../components/marketing/Navbar';

/**
 * Marketing shell: global public navigation, content outlet, and footer.
 */
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <a
        href="#main-content"
        className="fixed left-4 top-2 z-50 -translate-y-20 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
