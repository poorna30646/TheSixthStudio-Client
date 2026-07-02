import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLoader from '../components/feedback/PageLoader';
import RouteEffects from '../components/navigation/RouteEffects';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import PublicLayout from '../layouts/PublicLayout';
import WorkspaceLayout from '../layouts/WorkspaceLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleRoute from './RoleRoute';

const LandingPage = lazy(() => import('../pages/Public/LandingPage'));
const FeaturesPage = lazy(() => import('../pages/Public/FeaturesPage'));
const TemplatesPage = lazy(() => import('../pages/Public/TemplatesPage'));
const PricingPage = lazy(() => import('../pages/Public/PricingPage'));
const AboutPage = lazy(() => import('../pages/Public/AboutPage'));
const ContactPage = lazy(() => import('../pages/Public/ContactPage'));

const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('../pages/Auth/VerifyEmailPage'));

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ProjectsPage = lazy(() => import('../pages/Workspace/ProjectsPage'));
const AssetsPage = lazy(() => import('../pages/Workspace/AssetsPage'));
const VideosPage = lazy(() => import('../pages/Workspace/VideosPage'));
const ManageTemplatesPage = lazy(() => import('../pages/Workspace/ManageTemplatesPage'));
const VoicesPage = lazy(() => import('../pages/Workspace/VoicesPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const WorkspacePage = lazy(() => import('../pages/Workspace/WorkspacePage'));

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ServerErrorPage = lazy(() => import('../pages/ServerErrorPage'));

/**
 * Route groups mirror access and layout boundaries. All pages are lazy-loaded
 * so marketing, authentication, and product bundles remain independent.
 */
export function AppRoutes() {
  return (
    <>
      <RouteEffects />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="verify-email" element={<VerifyEmailPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="assets" element={<AssetsPage />} />
              <Route path="videos" element={<VideosPage />} />
              <Route element={<RoleRoute />}>
                <Route path="templates/manage" element={<ManageTemplatesPage />} />
              </Route>
              <Route path="voices" element={<VoicesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="workspace" element={<WorkspaceLayout />}>
              <Route index element={<WorkspacePage />} />
              <Route path=":projectId" element={<WorkspacePage />} />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="500" element={<ServerErrorPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
