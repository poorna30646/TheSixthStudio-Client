import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './Input';

export function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <button
        type="button"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-[2.7rem] text-[var(--color-text-secondary)]"
        onClick={() => setShowPassword((value) => !value)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default PasswordInput;
