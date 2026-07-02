import React from 'react';
import PropTypes from 'prop-types';

export function ProgressBar({ value = 0, label }) {
  return (
    <div className="w-full">
      {label ? <p className="mb-2 text-sm text-[var(--color-text-secondary)]">{label}</p> : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <div className="h-full rounded-full bg-[var(--color-primary)] transition-all" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
};

export default ProgressBar;
