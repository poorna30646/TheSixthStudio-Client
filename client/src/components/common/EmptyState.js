import React from 'react';
import PropTypes from 'prop-types';
import { FaInbox } from 'react-icons/fa';
import Button from './Button';

export function EmptyState({ title, description, actionLabel, onAction, icon: Icon = FaInbox }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-[var(--color-hover)] p-4 text-[var(--color-primary)]">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-[var(--color-text-secondary)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  icon: PropTypes.elementType,
};

export default EmptyState;
