import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Skeleton({ className = '', rounded = 'md' }) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-[var(--radius-md)]',
    lg: 'rounded-[var(--radius-lg)]',
    full: 'rounded-full',
  };

  return <div className={cn('animate-pulse bg-[var(--color-hover)]', roundedClasses[rounded], className)} />;
}

Skeleton.propTypes = {
  className: PropTypes.string,
  rounded: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
};

export default Skeleton;
