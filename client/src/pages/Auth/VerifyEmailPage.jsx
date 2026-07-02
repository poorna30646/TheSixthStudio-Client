import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';

export function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16">
      <AuthCard title="Check your inbox" subtitle="We have queued your verification email." footer={<Link to="/login" className="text-amber-400 hover:text-amber-300">Back to sign in</Link>}>
        <p className="text-sm text-slate-400">Follow the link we sent to complete your verification.</p>
      </AuthCard>
    </div>
  );
}

export default VerifyEmailPage;
