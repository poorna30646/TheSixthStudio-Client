import React from 'react';
import PropTypes from 'prop-types';

export function Checkbox({ label, checked, onChange, id, ...props }) {
  const inputId = id || props.name;

  return (
    <label htmlFor={inputId} className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
      <input id={inputId} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-surface)]" {...props} />
      <span>{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Checkbox;
