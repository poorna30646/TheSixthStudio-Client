import React from 'react';
import PropTypes from 'prop-types';
import Select from '../common/Select';

/**
 * ProjectFilter
 * UI-only filter dropdown. Options are passed from parent.
 */
export function ProjectFilter({ label = 'Filter', value, onChange, options }) {
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

ProjectFilter.propTypes = {
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

export default ProjectFilter;

