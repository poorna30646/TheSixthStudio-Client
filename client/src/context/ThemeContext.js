import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'system');
  const [theme, setThemeState] = useState(storedTheme);
  const [resolvedTheme, setResolvedTheme] = useState(getSystemTheme());

  useEffect(() => {
    const nextTheme = storedTheme === 'system' ? getSystemTheme() : storedTheme;
    setThemeState(storedTheme);
    setResolvedTheme(nextTheme);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, [storedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (storedTheme === 'system') {
        const systemTheme = getSystemTheme();
        setResolvedTheme(systemTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
      }
    };

    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, [storedTheme]);

  const setTheme = useCallback((nextTheme) => {
    if (['light', 'dark', 'system'].includes(nextTheme)) {
      setStoredTheme(nextTheme);
    }
  }, [setStoredTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
  }), [theme, resolvedTheme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
