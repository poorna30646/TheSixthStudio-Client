import React from 'react';
import PropTypes from 'prop-types';
import Select from '../common/Select';

/**
 * ProjectSort
 * UI-only sort dropdown. Options are passed from parent.
 */
export function ProjectSort({ label = 'Sort', value, onChange, options }) {
  const safeOptions = options || [];

  return (
    <div className="min-w-[180px]">
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={safeOptions}
      />
    </div>
  );
}

ProjectSort.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default ProjectSort;

