import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
  primary: 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  danger: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
};

export function Badge({ children, variant = 'default', className = '' }) {
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', variants[variant], className)}>{children}</span>;
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning']),
  className: PropTypes.string,
};

export default Badge;
