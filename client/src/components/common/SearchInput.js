import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export function SearchInput({ value, onChange, placeholder = 'Search…', ...props }) {
  return (
    <label className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-secondary)]">
      <FaSearch />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
        {...props}
      />
    </label>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
