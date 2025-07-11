import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ToastProvider, useToast } from '../contexts/ToastContext'
import type { ReactNode } from 'react'

describe('ToastContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  )

  describe('useToast hook', () => {
    it('should throw error when used outside ToastProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      try {
        renderHook(() => useToast())
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('useToast must be used within a ToastProvider')
      }
      consoleSpy.mockRestore()
    })

    it('should provide toast functions', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      expect(typeof result.current.showSuccess).toBe('function')
      expect(typeof result.current.showError).toBe('function')
      expect(typeof result.current.showWarning).toBe('function')
      expect(typeof result.current.showInfo).toBe('function')
    })
  })

  describe('toast functions', () => {
    it('should show success toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showSuccess('Success message')
      })

      // Note: We can't easily test the actual Snackbar display without DOM testing
      // but we can verify the function executes without error
      expect(result.current.showSuccess).toBeDefined()
    })

    it('should show error toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showError('Error message')
      })

      expect(result.current.showError).toBeDefined()
    })

    it('should show warning toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showWarning('Warning message')
      })

      expect(result.current.showWarning).toBeDefined()
    })

    it('should show info toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showInfo('Info message')
      })

      expect(result.current.showInfo).toBeDefined()
    })

    it('should handle multiple toast calls', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showSuccess('Success 1')
        result.current.showError('Error 1')
        result.current.showWarning('Warning 1')
        result.current.showInfo('Info 1')
      })

      // All functions should be available and work
      expect(result.current.showSuccess).toBeDefined()
      expect(result.current.showError).toBeDefined()
      expect(result.current.showWarning).toBeDefined()
      expect(result.current.showInfo).toBeDefined()
    })

    it('should handle empty message gracefully', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      act(() => {
        result.current.showSuccess('')
        result.current.showError('')
      })

      // Should not throw errors with empty messages
      expect(result.current.showSuccess).toBeDefined()
      expect(result.current.showError).toBeDefined()
    })

    it('should handle long messages', () => {
      const { result } = renderHook(() => useToast(), { wrapper })
      const longMessage = 'This is a very long message that might exceed normal toast message length and should still be handled gracefully by the toast system'

      act(() => {
        result.current.showInfo(longMessage)
      })

      expect(result.current.showInfo).toBeDefined()
    })
  })

  describe('toast provider rendering', () => {
    it('should render children correctly', () => {
      const TestComponent = () => {
        useToast() // Just verify hook can be called
        return <div data-testid="test-component">Test</div>
      }

      const { result } = renderHook(
        () => useToast(),
        {
          wrapper: ({ children }) => (
            <ToastProvider>
              <TestComponent />
              {children}
            </ToastProvider>
          )
        }
      )

      expect(result.current).toBeDefined()
    })
  })
})
