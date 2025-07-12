import { vi } from 'vitest';
import type { User, AuthResponse, Broker, Konto } from '../types/api';

/**
 * Mock data for consistent testing
 */
export const mockData = {
  user: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  } as User,

  authResponse: {
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    token: 'mock-jwt-token-12345',
  } as AuthResponse,

  broker: {
    id: 1,
    name: 'Test Broker',
    apiUrl: 'https://api.testbroker.com',
    apiKey: 'test-api-key',
    userId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  } as Broker,

  konto: {
    id: 1,
    name: 'Test Depot',
    kontoTyp: 'DEPOT' as const,
    saldo: 10000,
    waehrung: 'EUR',
    brokerId: 1,
    userId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  } as Konto,

  errorResponse: {
    message: 'Test error message',
    status: 400,
  },
};

/**
 * API Service Mocks
 */
export const createMockApiService = () => ({
  login: vi.fn(),
  register: vi.fn(),
  getBrokers: vi.fn(),
  createBroker: vi.fn(),
  updateBroker: vi.fn(),
  deleteBroker: vi.fn(),
  getKontos: vi.fn(),
  createKonto: vi.fn(),
  updateKonto: vi.fn(),
  deleteKonto: vi.fn(),
  getPositions: vi.fn(),
  createPosition: vi.fn(),
  updatePosition: vi.fn(),
  deletePosition: vi.fn(),
});

/**
 * Context Mocks
 */
export const createMockAuthContext = (overrides = {}) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  ...overrides,
});

export const createMockToastContext = (overrides = {}) => ({
  showToast: vi.fn(),
  hideToast: vi.fn(),
  toasts: [],
  ...overrides,
});

export const createMockThemeContext = (overrides = {}) => ({
  theme: 'light',
  toggleTheme: vi.fn(),
  ...overrides,
});

/**
 * Router Mocks
 */
export const createMockNavigate = () => vi.fn();

export const createMockLocation = (overrides = {}) => ({
  pathname: '/login',
  search: '',
  hash: '',
  state: null,
  key: 'default',
  ...overrides,
});

export const createMockParams = (params = {}) => params;

/**
 * Helper functions for common test scenarios
 */
export const testHelpers = {
  /**
   * Create authenticated auth context
   */
  createAuthenticatedContext: (user = mockData.user, token = mockData.authResponse.token) =>
    createMockAuthContext({
      user,
      token,
      isAuthenticated: true,
    }),

  /**
   * Create loading auth context
   */
  createLoadingContext: () =>
    createMockAuthContext({
      isLoading: true,
    }),

  /**
   * Setup successful login mock
   */
  setupSuccessfulLogin: (apiService: ReturnType<typeof createMockApiService>) => {
    apiService.login.mockResolvedValue(mockData.authResponse);
  },

  /**
   * Setup failed login mock
   */
  setupFailedLogin: (apiService: ReturnType<typeof createMockApiService>, error = mockData.errorResponse) => {
    apiService.login.mockRejectedValue(new Error(error.message));
  },

  /**
   * Setup successful broker fetch
   */
  setupBrokerFetch: (apiService: ReturnType<typeof createMockApiService>, brokers = [mockData.broker]) => {
    apiService.getBrokers.mockResolvedValue(brokers);
  },

  /**
   * Setup successful konto fetch
   */
  setupKontoFetch: (apiService: ReturnType<typeof createMockApiService>, kontos = [mockData.konto]) => {
    apiService.getKontos.mockResolvedValue(kontos);
  },
};

/**
 * Test matchers for common assertions
 */
export const testMatchers = {
  /**
   * Check if login was called with correct credentials
   */
  expectLoginCalledWith: (mockLogin: ReturnType<typeof vi.fn>, email: string, password: string) => {
    expect(mockLogin).toHaveBeenCalledWith(email, password);
  },

  /**
   * Check if navigation occurred
   */
  expectNavigationTo: (mockNavigate: ReturnType<typeof vi.fn>, path: string) => {
    expect(mockNavigate).toHaveBeenCalledWith(path);
  },

  /**
   * Check if toast was shown
   */
  expectToastShown: (mockShowToast: ReturnType<typeof vi.fn>, message: string, type?: string) => {
    if (type) {
      expect(mockShowToast).toHaveBeenCalledWith(message, type);
    } else {
      expect(mockShowToast).toHaveBeenCalledWith(expect.stringContaining(message));
    }
  },
};
