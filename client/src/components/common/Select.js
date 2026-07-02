import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Select = React.forwardRef(function Select({ label, error, helperText, options = [], className = '', id, ...props }, ref) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      ) : null}
      <select
        id={inputId}
        ref={ref}
        className={cn(
          'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[var(--color-focus)]',
          error ? 'border-[var(--color-danger)]' : '',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{helperText}</p> : null}
      {error ? <p className="mt-1 text-sm text-[var(--color-danger)]">{error}</p> : null}
    </div>
  );
});

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, label: PropTypes.string.isRequired })),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Select;
