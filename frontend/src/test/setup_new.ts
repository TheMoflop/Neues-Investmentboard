import { vi, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ultra-aggressive MUI Icons mocking - complete bypass
vi.mock('@mui/icons-material', () => {
  const MockIcon = () => null;
  
  // Return a Proxy that intercepts ALL property access
  return new Proxy({}, {
    get: () => MockIcon,
    has: () => true,
    ownKeys: () => [],
    getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    set: () => true,
    deleteProperty: () => true,
    defineProperty: () => true
  });
});

// Explicitly mock each icon we need
vi.mock('@mui/icons-material/Visibility', () => ({ default: () => null }));
vi.mock('@mui/icons-material/VisibilityOff', () => ({ default: () => null }));
vi.mock('@mui/icons-material/TrendingUp', () => ({ default: () => null }));

// Mock React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  Navigate: ({ to }: { to: string }) => `Navigate to ${to}`,
}));

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    create: vi.fn(() => ({
      get: vi.fn(() => Promise.resolve({ data: {} })),
      post: vi.fn(() => Promise.resolve({ data: {} })),
      put: vi.fn(() => Promise.resolve({ data: {} })),
      delete: vi.fn(() => Promise.resolve({ data: {} })),
      patch: vi.fn(() => Promise.resolve({ data: {} })),
    })),
  },
}));

// Basic environment setup
beforeAll(() => {
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  }
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
