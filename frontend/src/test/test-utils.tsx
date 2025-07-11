import React from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import { CustomThemeProvider } from '../contexts/ThemeContext'
import { ToastProvider } from '../contexts/ToastContext'
import type { ReactElement } from 'react'

/**
 * Custom render function that includes all providers
 * Useful for testing components that need context
 */
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CustomThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </CustomThemeProvider>
  )
}

/**
 * Custom render with all providers
 * @param ui - Component to render
 * @param options - Render options
 * @returns Render result with all providers
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

/**
 * Render component with Auth context only
 * @param ui - Component to render
 * @param options - Render options
 * @returns Render result with Auth context
 */
const renderWithAuth = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <CustomThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthProvider>
    </CustomThemeProvider>
  )
  return render(ui, { wrapper: AuthWrapper, ...options })
}

/**
 * Render component with Theme context only
 * @param ui - Component to render
 * @param options - Render options
 * @returns Render result with Theme context
 */
const renderWithTheme = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <CustomThemeProvider>
      {children}
    </CustomThemeProvider>
  )
  return render(ui, { wrapper: ThemeWrapper, ...options })
}

/**
 * Mock API responses for testing
 */
export const mockApiResponses = {
  // Mock successful login response
  loginSuccess: {
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    token: 'mock-jwt-token'
  },

  // Mock broker data
  brokers: [
    {
      id: 1,
      name: 'Test Broker',
      apiUrl: 'https://api.testbroker.com',
      apiKey: 'test-api-key',
      userId: 1,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    }
  ],

  // Mock portfolio data
  kontos: [
    {
      id: 1,
      name: 'Test Depot',
      kontoTyp: 'DEPOT' as const,
      saldo: 10000,
      waehrung: 'EUR',
      brokerId: 1,
      userId: 1,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    }
  ],

  // Mock error response
  error: {
    message: 'Test error message',
    status: 400
  }
}

/**
 * Mock localStorage for testing
 */
export const mockLocalStorage = {
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value)
  },
  getItem: (key: string) => {
    return window.localStorage.getItem(key)
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key)
  },
  clear: () => {
    window.localStorage.clear()
  }
}

/**
 * Wait for async operations to complete
 * Useful for testing async state updates
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

// Re-export everything
export * from '@testing-library/react'
export { customRender, customRender as render, renderWithAuth, renderWithTheme }
