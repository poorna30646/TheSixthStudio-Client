import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Button from '../common/Button';

/**
 * CreateProjectButton
 * UI-only action button. The click handler is passed from parent.
 */
export function CreateProjectButton({ onClick, label = 'Create project' }) {
  return (
    <Button onClick={onClick} className="shrink-0" aria-label={label}>
      <FaPlus className="text-xs" aria-hidden="true" /> {label}
    </Button>
  );
}

CreateProjectButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default CreateProjectButton;

