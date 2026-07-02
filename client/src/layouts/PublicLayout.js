import React from 'react';
import PropTypes from 'prop-types';

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicLayout;
