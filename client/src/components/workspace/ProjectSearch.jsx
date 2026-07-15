import React from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from '../common/SearchInput';

/**
 * ProjectSearch
 * UI-only search input for filtering projects.
 */
export function ProjectSearch({ value, onChange, placeholder = 'Search projects…' }) {
  return <SearchInput value={value} onChange={onChange} placeholder={placeholder} aria-label="Project search" />;
}

ProjectSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default ProjectSearch;

