import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme/theme';

type ThemeMode = 'light' | 'dark';

/**
 * Theme context interface providing theme mode management
 */
interface ThemeContextType {
  /** Current theme mode */
  mode: ThemeMode;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set specific theme mode */
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context
 * @throws {Error} If used outside of CustomThemeProvider
 * @returns {ThemeContextType} Theme context with mode and toggle methods
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Custom Theme Provider Component
 * Manages theme mode state and provides theme switching functionality
 * Persists theme preference in localStorage
 */
export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  /**
   * Effect to restore theme preference on app initialization
   * Checks localStorage for saved theme mode or uses system preference
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setMode(savedTheme);
    } else {
      // Use system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = (): void => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  /**
   * Set specific theme mode
   * @param newMode - Theme mode to set
   */
  const setTheme = (newMode: ThemeMode): void => {
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Create theme based on current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    mode,
    toggleTheme,
    setTheme,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
