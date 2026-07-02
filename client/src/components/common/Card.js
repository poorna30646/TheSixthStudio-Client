import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Card({ children, className = '', padding = 'md' }) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return <div className={cn('rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]', paddingClasses[padding], className)}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Card;
