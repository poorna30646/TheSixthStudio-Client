import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((value) => !value), []);
  const setSidebarVisibility = useCallback((value) => setSidebarOpen(Boolean(value)), []);
  const toggleMobileNav = useCallback(() => setMobileNavOpen((value) => !value), []);
  const setMobileNavVisibility = useCallback((value) => setMobileNavOpen(Boolean(value)), []);
  const openModal = useCallback((modal) => setActiveModal(modal), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const openDrawer = useCallback((drawer) => setActiveDrawer(drawer), []);
  const closeDrawer = useCallback(() => setActiveDrawer(null), []);
  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const setLoadingOverlay = useCallback((value) => setLoadingOverlayVisible(value), []);

  const value = useMemo(() => ({
    sidebarOpen,
    mobileNavOpen,
    loadingOverlayVisible,
    activeModal,
    activeDrawer,
    commandPaletteOpen,
    toggleSidebar,
    setSidebarVisibility,
    toggleMobileNav,
    setMobileNavVisibility,
    openModal,
    closeModal,
    openDrawer,
    closeDrawer,
    openCommandPalette,
    closeCommandPalette,
    setLoadingOverlay,
  }), [sidebarOpen, mobileNavOpen, loadingOverlayVisible, activeModal, activeDrawer, commandPaletteOpen, toggleSidebar, setSidebarVisibility, toggleMobileNav, setMobileNavVisibility, openModal, closeModal, openDrawer, closeDrawer, openCommandPalette, closeCommandPalette, setLoadingOverlay]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUIContext() {
  const context = React.useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
}

export default UIContext;
