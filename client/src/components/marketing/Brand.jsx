import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Brand({ compact = false, className = '' }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-3 font-semibold text-white', className)}
      aria-label="TheSixthStudio home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-sm font-bold text-slate-950">
        VI
      </span>
      {!compact ? <span className="tracking-tight">TheSixthStudio</span> : null}
    </Link>
  );
}

Brand.propTypes = {
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default Brand;
