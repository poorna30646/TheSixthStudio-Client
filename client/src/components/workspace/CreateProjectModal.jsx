import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';

/**
 * CreateProjectModal
 * Production SaaS workflow: calls real create() only when user presses Create.
 */
export function CreateProjectModal({ open, onClose, onCreate, submitting }) {
  const [name, setName] = useState('');
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

  const reset = () => {
    setName('');
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

    const trimmedName = name.trim();
    if (!trimmedName) {
      setLocalError('Project name is required.');
      return;
    }

    setLocalError(null);

    try {
      const payload = {
        // Backend contract: { title, description, visibility, settings }
        title: trimmedName,
        description: description || '',
        visibility,
        settings: {},
      };

      const created = await onCreate(payload);
      // Parent decides what to do with created result.
      return created;
    } catch (err) {
      setLocalError(err?.message || 'Failed to create project.');
      return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create project" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--color-text-secondary)]" htmlFor="projectName">
            Project Name <span className="text-[var(--color-text-danger)]">*</span>
          </label>
          <Input
            id="projectName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--color-text-secondary)]" htmlFor="projectDescription">
            Description
          </label>
          <Textarea
            id="projectDescription"
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
                  name="visibility"
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
            {submitting ? 'Creating…' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

CreateProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

CreateProjectModal.defaultProps = {
  submitting: false,
};

export default CreateProjectModal;

