import React from 'react';
import { FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import Brand from '../components/marketing/Brand';
import { APP_NAV_ITEMS } from '../config/navigation';
import { useUIContext } from '../context/UIContext';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

/**
 * Authenticated product shell with persistent desktop and drawer mobile navigation.
 */
export function AppLayout() {
  const { logout, user, loadingState } = useAuth();
  const {
    sidebarOpen,
    mobileNavOpen,
    toggleSidebar,
    toggleMobileNav,
    setMobileNavVisibility,
  } = useUIContext();

  const userLabel = user?.name || user?.email || 'Studio member';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close workspace navigation"
          onClick={() => setMobileNavVisibility(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 p-4 transition-transform md:translate-x-0',
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarOpen ? 'md:w-64' : 'md:w-20'
        )}
      >
        <div className="flex h-11 items-center justify-between">
          <Brand className="md:hidden" />
          {sidebarOpen ? (
            <Brand className="hidden md:inline-flex" />
          ) : (
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white md:grid"
              aria-label="Expand sidebar"
            >
              <FaBars aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              'hidden h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white md:grid',
              !sidebarOpen && 'md:hidden'
            )}
            aria-label="Collapse sidebar"
          >
            <FaBars aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMobileNavVisibility(false)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-900 md:hidden"
            aria-label="Close navigation"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1" aria-label="Workspace navigation">
          {APP_NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileNavVisibility(false)}
              title={!sidebarOpen ? label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-amber-400/10 text-amber-300'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                )
              }
            >
              <Icon className="shrink-0" aria-hidden="true" />
              <span className={cn(!sidebarOpen && 'md:hidden')}>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 pt-4">
          <div className={cn('mb-3 min-w-0 px-3', !sidebarOpen && 'md:hidden')}>
            <p className="truncate text-sm font-medium text-white">{userLabel}</p>
            <p className="truncate text-xs text-slate-500">{user?.role || 'Member'}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            disabled={loadingState?.logout}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white disabled:opacity-50"
            title={!sidebarOpen ? 'Sign out' : undefined}
          >
            <FaSignOutAlt className="shrink-0" aria-hidden="true" />
            <span className={cn(!sidebarOpen && 'md:hidden')}>
              {loadingState?.logout ? 'Signing out…' : 'Sign out'}
            </span>
          </button>
        </div>
      </aside>

      <div className={cn('min-h-screen transition-[padding] md:pl-20', sidebarOpen && 'md:pl-64')}>
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 hover:bg-slate-900 md:hidden"
            onClick={toggleMobileNav}
            aria-label="Open workspace navigation"
          >
            <FaBars aria-hidden="true" />
          </button>
          <div className="ml-3 md:ml-0">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Workspace</p>
            <p className="text-sm font-medium text-white">TheSixthStudio</p>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
