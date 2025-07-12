
// Mocks must be set before any imports!
let store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (...args: any[]) => store[args[0]] ?? null,
  setItem: (...args: any[]) => { store[args[0]] = args[1]; },
  removeItem: (...args: any[]) => { delete store[args[0]]; },
  clear: () => { store = {}; },
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })
});

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CustomThemeProvider, useTheme } from '../contexts/ThemeContext'

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store = {};
  });

  function TestComponent() {
    let mode, toggleTheme, setTheme;
    try {
      ({ mode, toggleTheme, setTheme } = useTheme());
    } catch (e) {
      // If context is not available, show error
      return <span data-testid="theme-mode">ERROR: {String(e)}</span>;
    }
    // Debug output
    // eslint-disable-next-line no-console
    console.log('ThemeContext values:', { mode, toggleTheme, setTheme });
    return (
      <>
        <span data-testid="theme-mode">{mode ?? 'undefined'}</span>
        <button onClick={toggleTheme}>Toggle</button>
        <button onClick={() => setTheme('dark')}>SetDark</button>
        <button onClick={() => setTheme('light')}>SetLight</button>
      </>
    );
  }

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(() => render(<TestComponent />)).toThrowError()
      consoleSpy.mockRestore()
    })

    it('should provide initial theme state (light mode)', async () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      expect(typeof useTheme().toggleTheme).toBe('function');
      expect(typeof useTheme().setTheme).toBe('function');
    });

    it('should restore dark mode from localStorage', async () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
    });

    it('should handle invalid localStorage value', async () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-value');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
    });
  })

  describe('toggleTheme function', () => {
    it('should toggle from light to dark mode', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });

    it('should toggle from dark to light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light');
    });

    it('should persist theme preference in localStorage', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      fireEvent.click(screen.getByText('Toggle'));
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
      fireEvent.click(screen.getByText('Toggle'));
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light');
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });
  })

  describe('setTheme function', () => {
    it('should set specific theme mode', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      fireEvent.click(screen.getByText('SetDark'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });

    it('should handle mode changes correctly', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      fireEvent.click(screen.getByText('SetDark'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      fireEvent.click(screen.getByText('SetLight'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
    });
  })

  describe('localStorage key', () => {
    it('should use correct localStorage key for theme persistence', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('themeMode');
      fireEvent.click(screen.getByText('Toggle'));
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });
  })
})
