import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUIContext } from '../context/UIContext';

/**
 * Narrows global UI state to the behavior needed by workspace navigation.
 */
export function useSidebar() {
  const location = useLocation();
  const {
    sidebarOpen,
    mobileNavOpen,
    toggleSidebar,
    toggleMobileNav,
    setMobileNavVisibility,
  } = useUIContext();

  useEffect(() => {
    setMobileNavVisibility(false);
  }, [location.pathname, setMobileNavVisibility]);

  return {
    collapsed: !sidebarOpen,
    drawerOpen: mobileNavOpen,
    toggleCollapsed: toggleSidebar,
    toggleDrawer: toggleMobileNav,
    closeDrawer: () => setMobileNavVisibility(false),
  };
}

export default useSidebar;
