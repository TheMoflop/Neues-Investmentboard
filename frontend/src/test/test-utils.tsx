import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { vi } from 'vitest';

// Import types
import type { User, AuthResponse } from '../types/api';

/**
 * Test theme for consistent styling in tests
 */
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

/**
 * Mock implementations for all contexts
 */
export const mockAuthContext = {
  user: null as User | null,
  token: null as string | null,
  isLoading: false,
  isAuthenticated: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
};

export const mockToastContext = {
  showToast: vi.fn(),
  hideToast: vi.fn(),
  toasts: [],
};

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
  } as AuthResponse,

  // Mock user data
  user: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  } as User,

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
};

/**
 * Provider configuration for testing
 */
interface TestProvidersProps {
  children: React.ReactNode;
  routerProps?: Partial<MemoryRouterProps>;
  authContext?: Partial<typeof mockAuthContext>;
  toastContext?: Partial<typeof mockToastContext>;
}

/**
 * Test Providers Component
 * Provides all necessary context providers for testing
 */
export const TestProviders: React.FC<TestProvidersProps> = ({
  children,
  routerProps = {},
  authContext = {},
  toastContext = {},
}) => {
  // Merge provided context values with defaults
  const authValue = { ...mockAuthContext, ...authContext };
  const toastValue = { ...mockToastContext, ...toastContext };

  return (
    <MemoryRouter initialEntries={['/login']} {...routerProps}>
      <ThemeProvider theme={testTheme}>
        {/* Mock AuthContext */}
        <div data-testid="mock-auth-context" data-auth={JSON.stringify(authValue)}>
          {/* Mock ToastContext */}
          <div data-testid="mock-toast-context" data-toast={JSON.stringify(toastValue)}>
            {children}
          </div>
        </div>
      </ThemeProvider>
    </MemoryRouter>
  );
};

/**
 * Custom render options
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  routerProps?: Partial<MemoryRouterProps>;
  authContext?: Partial<typeof mockAuthContext>;
  toastContext?: Partial<typeof mockToastContext>;
}

/**
 * Custom render function with all providers
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    routerProps,
    authContext,
    toastContext,
    ...renderOptions
  } = options;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TestProviders
      routerProps={routerProps}
      authContext={authContext}
      toastContext={toastContext}
    >
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Utility functions for testing
 */
export const testUtils = {
  /**
   * Wait for async operations to complete
   */
  waitForAsync: () => new Promise(resolve => setTimeout(resolve, 0)),

  /**
   * Mock localStorage for testing
   */
  mockLocalStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },

  /**
   * Reset all mocks to initial state
   */
  resetMocks: () => {
    vi.clearAllMocks();
    mockAuthContext.user = null;
    mockAuthContext.token = null;
    mockAuthContext.isLoading = false;
    mockAuthContext.isAuthenticated = false;
  },

  /**
   * Set authenticated user for testing
   */
  setAuthenticatedUser: (user: User, token: string = 'mock-token') => {
    mockAuthContext.user = user;
    mockAuthContext.token = token;
    mockAuthContext.isAuthenticated = true;
  },

  /**
   * Set loading state for auth
   */
  setAuthLoading: (loading: boolean) => {
    mockAuthContext.isLoading = loading;
  },
};

/**
 * Common test scenarios
 */
export const testScenarios = {
  /**
   * Render component as authenticated user
   */
  renderAsAuthenticatedUser: (ui: React.ReactElement, options: CustomRenderOptions = {}) => {
    const authContext = {
      ...mockAuthContext,
      user: mockApiResponses.user,
      token: mockApiResponses.loginSuccess.token,
      isAuthenticated: true,
      ...options.authContext,
    };

    return renderWithProviders(ui, {
      ...options,
      authContext,
    });
  },

  /**
   * Render component as unauthenticated user
   */
  renderAsUnauthenticatedUser: (ui: React.ReactElement, options: CustomRenderOptions = {}) => {
    const authContext = {
      ...mockAuthContext,
      user: null,
      token: null,
      isAuthenticated: false,
      ...options.authContext,
    };

    return renderWithProviders(ui, {
      ...options,
      authContext,
    });
  },

  /**
   * Render component with loading state
   */
  renderWithLoadingState: (ui: React.ReactElement, options: CustomRenderOptions = {}) => {
    const authContext = {
      ...mockAuthContext,
      isLoading: true,
      ...options.authContext,
    };

    return renderWithProviders(ui, {
      ...options,
      authContext,
    });
  },
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { renderWithProviders as render };

// Export common testing utilities
export { vi } from 'vitest';
export { waitFor, fireEvent, screen } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
