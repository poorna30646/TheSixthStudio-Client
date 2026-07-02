import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUIContext } from '../context/UIContext';
import { FaBars, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', icon: FaHome, to: '/dashboard' },
  { label: 'Settings', icon: FaCog, to: '/settings' },
];

export function AppLayout({ children }) {
  const { logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUIContext();

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="flex min-h-screen">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:flex md:flex-col`}>
          <div className="mb-6 flex items-center justify-between">
            <Link to="/dashboard" className="text-lg font-semibold">TheSixthStudio</Link>
            <button type="button" onClick={toggleSidebar} className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]">
              <FaBars />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] transition hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
              >
                <Icon />
                {sidebarOpen ? <span>{label}</span> : null}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] transition hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]">
              <FaSignOutAlt />
              {sidebarOpen ? <span>Logout</span> : null}
            </button>
          </div>
        </aside>
        <div className="flex-1">
          <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Workspace</p>
                <h1 className="text-xl font-semibold">TheSixthStudio</h1>
              </div>
              <button type="button" onClick={toggleSidebar} className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] md:hidden">
                <FaBars />
              </button>
            </div>
          </header>
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
