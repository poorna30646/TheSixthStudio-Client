import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import PasswordInput from '../../components/auth/PasswordInput';
import { resetPassword } from '../../services/auth/auth.service';
import { validateConfirmPassword, validatePassword } from '../../utils/auth';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextError = validatePassword(password) || validateConfirmPassword(password, confirmPassword);

    if (nextError) {
      setError(nextError);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await resetPassword({ token, password });
      setMessage('Your password has been updated. You can sign in again.');
    } catch (submitError) {
      setError(submitError?.message || 'We could not update your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16">
      <AuthCard title="Set a new password" subtitle="Choose a strong password for your account." footer={<Link to="/login" className="text-amber-400 hover:text-amber-300">Back to sign in</Link>}>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <PasswordInput id="new-password" label="New password" value={password} onChange={setPassword} placeholder="Create a new password" autoComplete="new-password" />
          <PasswordInput id="confirm-new-password" label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter your password" autoComplete="new-password" />
          {error ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{message}</p> : null}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Updating…' : 'Reset password'}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}

export default ResetPassword;
