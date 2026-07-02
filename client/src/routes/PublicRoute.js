import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoader from '../components/feedback/PageLoader';
import { useAuth } from '../hooks/useAuth';

/**
 * Guest-only branch for auth screens. Marketing routes intentionally do not
 * use this guard and remain available to signed-in users.
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children || <Outlet />;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};

export default PublicRoute;
