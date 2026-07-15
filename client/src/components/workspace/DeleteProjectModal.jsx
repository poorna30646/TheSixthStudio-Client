import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../common/Button';

/**
 * DeleteProjectModal
 * UI-only confirmation modal.
 */
export function DeleteProjectModal({
  open,
  onClose,
  projectId,
  projectName,
  onConfirm = async () => {},
}) {
  return (
    <Modal open={open} onClose={onClose} title="Delete project" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Are you sure you want to delete this project?
        </p>

        <div className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-text-secondary)]">Project:</p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{projectName}</p>
        </div>

        <p className="text-sm text-[var(--color-text-danger)]">This action cannot be undone.</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              try {
                await onConfirm(projectId);
              } catch (error) {
                console.error(error);
              }
            }}
            disabled={!projectId}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}


DeleteProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  projectName: PropTypes.string,
  onConfirm: PropTypes.func,
};


export default DeleteProjectModal;
