import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonLink } from '../common/Button';
import { PUBLIC_NAV_ITEMS } from '../../config/navigation';
import { cn } from '../../utils/cn';

export function MobileNavigation({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div id="mobile-navigation" className="border-t border-slate-800 bg-slate-950 px-4 py-5 lg:hidden">
      <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1">
        {PUBLIC_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-3 text-sm font-medium transition',
                isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <ButtonLink to="/login" variant="secondary" onClick={onClose}>
            Sign in
          </ButtonLink>
          <ButtonLink to="/register" onClick={onClose}>
            Start free
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}

MobileNavigation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileNavigation;
