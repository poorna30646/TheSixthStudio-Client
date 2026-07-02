import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ButtonLink } from '../common/Button';
import Container from '../layout/Container';
import { PUBLIC_NAV_ITEMS } from '../../config/navigation';
import { cn } from '../../utils/cn';
import Brand from './Brand';
import MobileNavigation from './MobileNavigation';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Brand />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink to="/login" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink to="/register" size="sm">
            Start free
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 hover:bg-slate-900 lg:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </Container>
      <MobileNavigation open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}

export default Navbar;
