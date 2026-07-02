import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export function Loader({ fullScreen = false, label = 'Loading…' }) {
  const wrapper = fullScreen
    ? 'fixed inset-0 z-40 flex min-h-screen items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm'
    : 'flex items-center justify-center py-6';

  return (
    <div className={wrapper} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      </div>
    </div>
  );
}

Loader.propTypes = {
  fullScreen: PropTypes.bool,
  label: PropTypes.string,
};

export default Loader;
