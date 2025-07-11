import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CustomThemeProvider, useTheme } from '../contexts/ThemeContext'
import type { ReactNode } from 'react'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <CustomThemeProvider>{children}</CustomThemeProvider>
  )

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      try {
        renderHook(() => useTheme())
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('useTheme must be used within a CustomThemeProvider')
      }
      consoleSpy.mockRestore()
    })

    it('should provide initial theme state (light mode)', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      expect(result.current.mode).toBe('light')
      expect(typeof result.current.toggleTheme).toBe('function')
      expect(typeof result.current.setTheme).toBe('function')
    })

    it('should restore dark mode from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark')

      const { result } = renderHook(() => useTheme(), { wrapper })

      expect(result.current.mode).toBe('dark')
    })

    it('should handle invalid localStorage value', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-value')

      const { result } = renderHook(() => useTheme(), { wrapper })

      expect(result.current.mode).toBe('light')
    })
  })

  describe('toggleTheme function', () => {
    it('should toggle from light to dark mode', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      // Initial state should be light
      expect(result.current.mode).toBe('light')

      // Toggle to dark
      act(() => {
        result.current.toggleTheme()
      })

      expect(result.current.mode).toBe('dark')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark')
    })

    it('should toggle from dark to light mode', () => {
      // Start with dark mode
      mockLocalStorage.getItem.mockReturnValue('dark')

      const { result } = renderHook(() => useTheme(), { wrapper })

      // Initial state should be dark
      expect(result.current.mode).toBe('dark')

      // Toggle to light
      act(() => {
        result.current.toggleTheme()
      })

      expect(result.current.mode).toBe('light')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light')
    })

    it('should persist theme preference in localStorage', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      // Toggle multiple times and verify localStorage calls
      act(() => {
        result.current.toggleTheme()
      })
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark')

      act(() => {
        result.current.toggleTheme()
      })
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light')

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2)
    })
  })

  describe('setTheme function', () => {
    it('should set specific theme mode', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => {
        result.current.setTheme('dark')
      })

      expect(result.current.mode).toBe('dark')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark')
    })

    it('should handle mode changes correctly', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      // Set to dark
      act(() => {
        result.current.setTheme('dark')
      })
      expect(result.current.mode).toBe('dark')

      // Set back to light
      act(() => {
        result.current.setTheme('light')
      })
      expect(result.current.mode).toBe('light')
    })
  })

  describe('localStorage key', () => {
    it('should use correct localStorage key for theme persistence', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      // Check initial localStorage call
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('themeMode')

      // Toggle and check setItem call
      act(() => {
        result.current.toggleTheme()
      })

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark')
    })
  })
})
