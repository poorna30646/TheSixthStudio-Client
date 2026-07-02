import React from 'react';
import PropTypes from 'prop-types';

export function Switch({ checked, onChange, label, id, ...props }) {
  const inputId = id || props.name;

  return (
    <label htmlFor={inputId} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]">
      <span>{label}</span>
      <input id={inputId} type="checkbox" checked={checked} onChange={onChange} className="sr-only" {...props} />
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}>
        <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Switch;
