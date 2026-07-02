import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import LoginForm from '../../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16">
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to continue building with TheSixthStudio."
        footer={
          <p>
            New here?{' '}
            <Link to="/register" className="font-medium text-amber-400 hover:text-amber-300">
              Create an account
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
}

export default LoginPage;
