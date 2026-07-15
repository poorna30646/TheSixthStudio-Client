import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';

/**
 * EditProjectModal
 * Matches CreateProjectModal visual structure for editing project details.
 */
export function EditProjectModal({ open, project, onClose, onUpdate, submitting }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [localError, setLocalError] = useState(null);

  const visibilityOptions = useMemo(
    () => [
      { value: 'private', label: 'Private' },
      { value: 'team', label: 'Team' },
      { value: 'public', label: 'Public' },
    ],
    []
  );

  useEffect(() => {
    if (!open || !project) return;

    setTitle(project.title ?? project.name ?? '');
    setDescription(project.description ?? '');
    setVisibility(project.visibility ?? 'private');
    setLocalError(null);
  }, [open, project]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setVisibility('private');
    setLocalError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setLocalError('Project name is required.');
      return;
    }

    setLocalError(null);

    try {
      await onUpdate({
        title: trimmedTitle,
        description: description || '',
        visibility,
      });
    } catch (error) {
      console.error(error);
      setLocalError(error?.message || 'Failed to update project.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Edit project" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--color-text-secondary)]" htmlFor="editProjectName">
            Project Name <span className="text-[var(--color-text-danger)]">*</span>
          </label>
          <Input
            id="editProjectName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--color-text-secondary)]" htmlFor="editProjectDescription">
            Description
          </label>
          <Textarea
            id="editProjectDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add an optional description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-[var(--color-text-secondary)]">Visibility</div>
          <div className="flex flex-col gap-2">
            {visibilityOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
                <input
                  type="radio"
                  name="editVisibility"
                  value={opt.value}
                  checked={visibility === opt.value}
                  onChange={() => setVisibility(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {localError ? (
          <div className="rounded-xl border border-rose-800 bg-rose-900/10 p-3 text-xs text-rose-200">{localError}</div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

EditProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    visibility: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

EditProjectModal.defaultProps = {
  project: null,
  submitting: false,
};

export default EditProjectModal;
