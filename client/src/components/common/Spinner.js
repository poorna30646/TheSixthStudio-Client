import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Spinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-8 w-8 border-2',
  };

  return (
    <span className={cn('inline-block animate-spin rounded-full border-[var(--color-primary)] border-t-transparent', sizeClasses[size], className)} aria-label="Loading" />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Spinner;
