import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, getAuthErrorMessage } from '../../utils/auth';
import PasswordInput from './PasswordInput';

const initialState = { email: '', password: '', rememberMe: false };

export function LoginForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useAuth();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    try {
      await login({ email: form.email.trim(), password: form.password }, form.rememberMe);
    } catch (submitError) {
      setErrors((current) => ({ ...current, server: getAuthErrorMessage(submitError) }));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
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

      <PasswordInput
        id="password"
        label="Password"
        value={form.password}
        onChange={(value) => setForm((current) => ({ ...current, password: value }))}
        error={errors.password}
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" name="rememberMe" checked={form.rememberMe} onChange={handleChange} className="rounded border-slate-700 bg-slate-900" />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300">
          Forgot password?
        </Link>
      </div>

      {error ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}
      {errors.server ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{errors.server}</p> : null}

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
