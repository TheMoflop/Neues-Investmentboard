import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from './test-utils';
import { mockData, createMockApiService, createMockAuthContext } from './mocks';
import Login from '../components/auth/Login';

// Mock the API service
const mockApiService = createMockApiService();
vi.mock('../services/apiService', () => ({
  apiService: mockApiService,
}));

// Mock react-router-dom navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component - New Infrastructure', () => {
  const user = userEvent.setup();
  const mockOnSwitchToRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockOnSwitchToRegister.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render login form elements', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.getByLabelText(/email/i)).toBeDefined();
      expect(screen.getByLabelText(/password/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /login|anmelden/i })).toBeDefined();
    });

    it('should render registration link', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.getByText(/registrieren|register/i)).toBeDefined();
    });
  });

  describe('Form Interactions', () => {
    it('should handle email input', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
    });

    it('should handle password input', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');

      expect((passwordInput as HTMLInputElement).value).toBe('password123');
    });

    it('should call onSwitchToRegister when register link is clicked', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const registerLink = screen.getByText(/registrieren|register/i);
      await user.click(registerLink);

      expect(mockOnSwitchToRegister).toHaveBeenCalled();
    });
  });

  describe('Authentication Flow', () => {
    it('should call auth context login on form submission', async () => {
      const mockAuthContext = createMockAuthContext();
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />, {
        authContext: mockAuthContext,
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockAuthContext.login).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });

  describe('Context Integration', () => {
    it('should work with authenticated context', () => {
      const authenticatedContext = createMockAuthContext({
        user: mockData.user,
        isAuthenticated: true,
        token: mockData.authResponse.token,
      });

      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />, {
        authContext: authenticatedContext,
      });

      // Component should still render even when authenticated
      expect(screen.getByLabelText(/email/i)).toBeDefined();
    });

    it('should work with loading context', () => {
      const loadingContext = createMockAuthContext({
        isLoading: true,
      });

      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />, {
        authContext: loadingContext,
      });

      expect(screen.getByLabelText(/email/i)).toBeDefined();
    });
  });

  describe('Router Integration', () => {
    it('should work with different router states', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />, {
        routerProps: { initialEntries: ['/login'] }
      });

      expect(screen.getByLabelText(/email/i)).toBeDefined();
    });
  });
});
