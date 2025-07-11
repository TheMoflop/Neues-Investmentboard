// Globaler Mock für Material-UI Icons
import { vi } from 'vitest';
vi.mock('@mui/icons-material', () => ({
  TrendingUp: () => null,
  Logout: () => null,
  Menu: () => null,
  SettingsInputComponentOutlined: () => null,
  Dashboard: () => null,
  DashboardIcon: () => null,
  AccountBalance: () => null,
  Assessment: () => null,
  Person: () => null,
  Settings: () => null,
  Visibility: () => null,
  VisibilityOff: () => null,
  // Weitere Icons nach Bedarf ergänzen
}));
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock fetch
global.fetch = vi.fn()

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.getItem.mockReturnValue(null)
})
