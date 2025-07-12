import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Import types for proper TypeScript support
import './vitest-setup.d.ts';

/**
 * Test setup configuration
 * Provides consistent test environment setup across all tests
 */

/**
 * Cleanup after each test to prevent state leaking between tests
 */
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  
  // Clear localStorage
  localStorage.clear();
  sessionStorage.clear();
});

/**
 * Setup before each test
 */
beforeEach(() => {
  // Reset DOM state
  document.body.innerHTML = '';
  
  // Mock console methods to reduce test noise
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

/**
 * Global browser API mocks
 */

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
  return setTimeout(cb, 0);
});

global.cancelAnimationFrame = vi.fn().mockImplementation((id) => {
  clearTimeout(id);
});

// Mock localStorage and sessionStorage
const createStorageMock = () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

Object.defineProperty(window, 'localStorage', {
  value: createStorageMock(),
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: createStorageMock(),
  writable: true,
});

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000/',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  writable: true,
});

// Mock window navigation
Object.defineProperty(window, 'navigation', {
  value: {
    navigate: vi.fn(),
  },
  writable: true,
});

/**
 * React Router DOM mocks
 */
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: '/login',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    }),
    useParams: () => ({}),
  };
});

/**
 * API Service mocks
 */
vi.mock('../services/apiService', () => ({
  apiService: {
    login: vi.fn(),
    register: vi.fn(),
    getBrokers: vi.fn(),
    getKontos: vi.fn(),
    getPositions: vi.fn(),
    // Add other API methods as needed
  },
}));

/**
 * Context mocks
 */
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
    hideToast: vi.fn(),
    toasts: [],
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
  CustomThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));
