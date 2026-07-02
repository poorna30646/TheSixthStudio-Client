import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { buildBreadcrumbs } from '../utils/workspace';

/**
 * Supplies stable workspace identity and route context to shell components.
 */
export function useWorkspace() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return useMemo(
    () => ({
      user,
      workspace: {
        name: 'TheSixthStudio',
        plan: 'Creator',
      },
      breadcrumbs: buildBreadcrumbs(pathname),
    }),
    [pathname, user]
  );
}

export default useWorkspace;
