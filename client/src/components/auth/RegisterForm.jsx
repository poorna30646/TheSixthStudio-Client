import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPasswordStrength, getAuthErrorMessage, validateConfirmPassword, validateEmail, validatePassword } from '../../utils/auth';

const initialState = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { register, loading, error } = useAuth();

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      fullName: form.fullName.trim() ? '' : 'Full name is required.',
      username: form.username.trim() ? '' : 'Username is required.',
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };

    setErrors(nextErrors);

    if (nextErrors.fullName || nextErrors.username || nextErrors.email || nextErrors.password || nextErrors.confirmPassword) {
      return;
    }

    try {
      await register({
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        passwordConfirm: form.confirmPassword,
      });
    } catch (submitError) {
      setErrors((current) => ({ ...current, server: getAuthErrorMessage(submitError) }));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-200">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition ${errors.fullName ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'}`}
          placeholder="Alex Morgan"
        />
        {errors.fullName ? <p className="mt-2 text-sm text-rose-400">{errors.fullName}</p> : null}
      </div>

      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition ${errors.username ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'}`}
          placeholder="gani"
          autoComplete="username"
        />
        {errors.username ? <p className="mt-2 text-sm text-rose-400">{errors.username}</p> : null}
      </div>


      <div>
        <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition ${errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'}`}
          placeholder="you@company.com"
        />
        {errors.email ? <p className="mt-2 text-sm text-rose-400">{errors.email}</p> : null}
      </div>


      <div>
        <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-slate-200">
          Password
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition ${errors.password ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'}`}
          placeholder="Create a password"
        />
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(passwordStrength.score / 5) * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-400">Strength: {passwordStrength.label}</p>
        {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password}</p> : null}
      </div>


      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-200">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'}`}
          placeholder="Confirm password"
        />
        {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-400">{errors.confirmPassword}</p> : null}
      </div>


      {error ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}
      {errors.server ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{errors.server}</p> : null}

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  );
}

export default RegisterForm;
