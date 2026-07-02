import React from 'react';
import PropTypes from 'prop-types';

export function Tooltip({ children, content }) {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-md bg-[var(--color-surface-elevated)] px-2 py-1 text-xs text-[var(--color-text-primary)] shadow-[var(--shadow-md)] group-hover:block">
        {content}
      </span>
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
};

export default Tooltip;
