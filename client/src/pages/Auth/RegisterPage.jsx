import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import RegisterForm from '../../components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16">
      <AuthCard
        title="Create your account"
        subtitle="Start your creative workspace in minutes."
        footer={
          <p>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-amber-400 hover:text-amber-300">
              Sign in
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthCard>
    </div>
  );
}

export default RegisterPage;
