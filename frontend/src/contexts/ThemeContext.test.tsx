// @vitest-environment jsdom



let store: Record<string, string> = {};
let mockLocalStorage: any;

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CustomThemeProvider, useTheme } from '../contexts/ThemeContext'

describe('ThemeContext', () => {


  // Set up mocks as plain code so window is defined
  store = {};
  mockLocalStorage = {
    getItem: (...args: any[]) => store[args[0]] ?? null,
    setItem: (...args: any[]) => { store[args[0]] = args[1]; },
    removeItem: (...args: any[]) => { delete store[args[0]]; },
    clear: () => { store = {}; },
  };
    // Removed direct window assignments; using vi.stubGlobal only

  beforeEach(() => {
    vi.clearAllMocks();
    store = {};
    mockLocalStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: vi.fn((key: string) => { delete store[key]; }),
      clear: vi.fn(() => { store = {}; }),
    };
    vi.stubGlobal('localStorage', mockLocalStorage);
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }));
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
    it('should show error message when used outside ThemeProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      render(<TestComponent />)
      expect(screen.getByTestId('theme-mode').textContent).toContain('useTheme must be used within a CustomThemeProvider')
      consoleSpy.mockRestore()
    })

    it('should provide initial theme state (light mode)', async () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'light')).toBe(true);
      // Only test via rendered component, not direct hook call
    });

    it('should restore dark mode from localStorage', async () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'dark')).toBe(true);
    });

    it('should handle invalid localStorage value', async () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-value');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'light')).toBe(true);
    });
  })

  describe('toggleTheme function', () => {
    it('should toggle from light to dark mode', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'light')).toBe(true);
      const toggleButtons = screen.getAllByText('Toggle');
      fireEvent.click(toggleButtons[0]);
      const modeSpansAfter = screen.getAllByTestId('theme-mode');
      expect(modeSpansAfter.some(span => span.textContent === 'dark')).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });

    it('should toggle from dark to light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'dark')).toBe(true);
      const toggleButtons = screen.getAllByText('Toggle');
      fireEvent.click(toggleButtons[0]);
      const modeSpansAfter = screen.getAllByTestId('theme-mode');
      expect(modeSpansAfter.some(span => span.textContent === 'light')).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light');
    });

    it('should persist theme preference in localStorage', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const toggleButtons = screen.getAllByText('Toggle');
      fireEvent.click(toggleButtons[0]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
      fireEvent.click(toggleButtons[0]);
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
      const setDarkButtons = screen.getAllByText('SetDark');
      fireEvent.click(setDarkButtons[0]);
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'dark')).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });

    it('should handle mode changes correctly', () => {
      render(
        <CustomThemeProvider>
          <TestComponent />
        </CustomThemeProvider>
      );
      const setDarkButtons = screen.getAllByText('SetDark');
      fireEvent.click(setDarkButtons[0]);
      const modeSpans = screen.getAllByTestId('theme-mode');
      expect(modeSpans.some(span => span.textContent === 'dark')).toBe(true);
      const setLightButtons = screen.getAllByText('SetLight');
      fireEvent.click(setLightButtons[0]);
      const modeSpansAfter = screen.getAllByTestId('theme-mode');
      expect(modeSpansAfter.some(span => span.textContent === 'light')).toBe(true);
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
      const toggleButtons = screen.getAllByText('Toggle');
      fireEvent.click(toggleButtons[0]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    });
  })
})
