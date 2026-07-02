import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Avatar({ name, src, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  if (src) {
    return <img src={src} alt={name || 'Avatar'} className={cn('rounded-full object-cover', sizeClasses[size], className)} />;
  }

  return (
    <div className={cn('flex items-center justify-center rounded-full bg-[var(--color-primary)]/20 font-semibold text-[var(--color-primary)]', sizeClasses[size], className)}>
      {name ? name[0].toUpperCase() : 'U'}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Avatar;
