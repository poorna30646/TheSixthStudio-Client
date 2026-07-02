import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import { forgotPassword } from '../../services/auth/auth.service';
import { validateEmail } from '../../utils/auth';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await forgotPassword(email.trim());
      setMessage('If an account exists for that address, we have sent a recovery link.');
    } catch (submitError) {
      setError(submitError?.message || 'We could not send the password reset message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16">
      <AuthCard title="Recover access" subtitle="Enter your email to receive a password reset link." footer={<Link to="/login" className="text-amber-400 hover:text-amber-300">Back to sign in</Link>}>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input id="recovery-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-400" placeholder="you@company.com" />
          </div>
          {error ? <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{message}</p> : null}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}

export default ForgotPassword;
