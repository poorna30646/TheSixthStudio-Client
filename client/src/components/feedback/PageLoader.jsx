import React from 'react';
import Spinner from '../common/Spinner';

/**
 * Route-level loading state used by lazy pages and authentication restoration.
 */
export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center bg-[var(--color-background)]"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <Spinner size="lg" />
    </div>
  );
}

export default PageLoader;
