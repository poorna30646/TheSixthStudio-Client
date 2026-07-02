import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
  secondary: 'border border-slate-700 bg-slate-900 text-white hover:border-slate-600 hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
};

const sizes = {
  sm: 'min-h-9 px-3 py-2 text-sm',
  md: 'min-h-10 px-4 py-2.5 text-sm',
  lg: 'min-h-12 px-5 py-3 text-base',
};

/**
 * Returns the canonical button class list for buttons and button-like links.
 *
 * @param {object} options Visual configuration.
 * @returns {string} Composed utility classes.
 */
export function getButtonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
} = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth && 'w-full',
    className
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={getButtonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

/**
 * Router-aware companion for navigation actions with button styling.
 */
export function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <Link
      to={to}
      className={getButtonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
