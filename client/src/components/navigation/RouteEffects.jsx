import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routes/RouteConfig';

/**
 * Centralizes route-level browser effects and avoids duplicating them in pages.
 */
export function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${getRouteTitle(pathname)} | TheSixthStudio`;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default RouteEffects;
