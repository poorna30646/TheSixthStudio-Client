import React from 'react';
import PropTypes from 'prop-types';

export function WorkspaceLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
          <h1 className="text-2xl font-semibold">Workspace</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">A reusable shell for future product modules.</p>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

WorkspaceLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkspaceLayout;
