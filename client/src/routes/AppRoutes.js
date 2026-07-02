import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import AppLayout from '../layouts/AppLayout';
import WorkspaceLayout from '../layouts/WorkspaceLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Loader from '../components/common/Loader';

const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('../pages/Auth/VerifyEmailPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ServerErrorPage = lazy(() => import('../pages/ServerErrorPage'));

function renderWithLayout(Layout, content) {
  return <Layout>{content}</Layout>;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullScreen label="Loading TheSixthStudio" />}>
      <Routes>
        <Route
          path="/login"
          element={renderWithLayout(PublicLayout, <PublicRoute><AuthLayout><LoginPage /></AuthLayout></PublicRoute>)}
        />
        <Route
          path="/register"
          element={renderWithLayout(PublicLayout, <PublicRoute><AuthLayout><RegisterPage /></AuthLayout></PublicRoute>)}
        />
        <Route
          path="/forgot-password"
          element={renderWithLayout(PublicLayout, <PublicRoute><AuthLayout><ForgotPasswordPage /></AuthLayout></PublicRoute>)}
        />
        <Route
          path="/reset-password"
          element={renderWithLayout(PublicLayout, <PublicRoute><AuthLayout><ResetPasswordPage /></AuthLayout></PublicRoute>)}
        />
        <Route
          path="/verify-email"
          element={renderWithLayout(PublicLayout, <PublicRoute><AuthLayout><VerifyEmailPage /></AuthLayout></PublicRoute>)}
        />
        <Route
          path="/dashboard"
          element={renderWithLayout(AppLayout, <ProtectedRoute><DashboardPage /></ProtectedRoute>)}
        />
        <Route
          path="/settings"
          element={renderWithLayout(AppLayout, <ProtectedRoute><SettingsPage /></ProtectedRoute>)}
        />
        <Route path="/workspace" element={renderWithLayout(WorkspaceLayout, <ProtectedRoute><DashboardPage /></ProtectedRoute>)} />
        <Route path="/500" element={renderWithLayout(PublicLayout, <ServerErrorPage />)} />
        <Route path="/404" element={renderWithLayout(PublicLayout, <NotFoundPage />)} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={renderWithLayout(PublicLayout, <NotFoundPage />)} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
