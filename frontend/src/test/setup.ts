import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

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
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
});

/**
 * Setup before each test
 */
beforeEach(() => {
  // Reset DOM state
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
  }
  
  // Mock console methods to reduce test noise (but allow them through if needed)
  const originalWarn = console.warn;
  const originalError = console.error;
  
  vi.spyOn(console, 'warn').mockImplementation((...args) => {
    // Allow through certain warnings but suppress others
    const message = args.join(' ');
    if (!message.includes('React Router') && !message.includes('act(')) {
      originalWarn(...args);
    }
  });
  
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    // Allow through actual errors but suppress test framework noise
    const message = args.join(' ');
    if (!message.includes('Warning:') && !message.includes('act(')) {
      originalError(...args);
    }
  });
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


// Stateful localStorage/sessionStorage mocks
function createStatefulStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    },
  };
}

Object.defineProperty(window, 'localStorage', {
  value: createStatefulStorageMock(),
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: createStatefulStorageMock(),
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
  };
});

