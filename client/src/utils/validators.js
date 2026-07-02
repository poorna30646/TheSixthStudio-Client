export const validators = {
  required: (value) => (value ? undefined : 'This field is required.'),
  email: (value) => /.+@.+\..+/.test(value) ? undefined : 'Enter a valid email address.',
  minLength: (length) => (value) => value && value.length >= length ? undefined : `Must be at least ${length} characters.`,
};

export function validatePasswordStrength(password) {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password should include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password should include a number.';
  return undefined;
}
