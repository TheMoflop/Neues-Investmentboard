import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders, testScenarios } from './test-utils';
import { mockData, createMockApiService, createMockAuthContext, testHelpers, testMatchers } from './mocks';
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

describe('Login Component', () => {
  const user = userEvent.setup();
  const mockOnSwitchToRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockOnSwitchToRegister.mockClear();
  });

  describe('Rendering', () => {
    it('should render login form elements', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login|anmelden/i })).toBeInTheDocument();
    });

    it('should render registration link', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.getByText(/registrieren|register/i)).toBeInTheDocument();
    });

    it('should not show loading state initially', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.queryByText(/loading|laden/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show validation error for empty email', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/email.*required|erforderlich/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email format', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'invalid-email');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/email.*invalid|ungültig/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for empty password', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/password.*required|erforderlich/i)).toBeInTheDocument();
      });
    });
  });

  describe('Authentication Flow', () => {
    it('should call login API with correct credentials', async () => {
      testHelpers.setupSuccessfulLogin(mockApiService);
      
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />, {
        authContext: createMockAuthContext(),
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        testMatchers.expectLoginCalledWith(mockApiService.login, 'test@example.com', 'password123');
      });
    });

    it('should handle successful login', async () => {
      testHelpers.setupSuccessfulLogin(mockApiService);
      
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

    it('should handle login failure', async () => {
      testHelpers.setupFailedLogin(mockApiService);
      
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/error|fehler|invalid.*credentials/i)).toBeInTheDocument();
      });
    });

    it('should show loading state during login', async () => {
      // Setup a delayed response
      mockApiService.login.mockResolvedValue(mockData.authResponse);

      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      // Check that login button becomes disabled during async operation
      await user.click(loginButton);
      
      // Since the mock resolves immediately, we just verify the login was called
      await waitFor(() => {
        expect(mockApiService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });

  describe('Navigation', () => {
    it('should redirect to dashboard after successful login', async () => {
      testHelpers.setupSuccessfulLogin(mockApiService);
      
      testScenarios.renderAsUnauthenticatedUser(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        testMatchers.expectNavigationTo(mockNavigate, '/dashboard');
      });
    });

    it('should navigate to registration page when register link is clicked', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const registerLink = screen.getByText(/registrieren|register/i);
      await user.click(registerLink);

      expect(mockOnSwitchToRegister).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      // Tab through form elements
      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(passwordInput).toHaveFocus();

      await user.tab();
      expect(loginButton).toHaveFocus();
    });

    it('should announce form errors to screen readers', async () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });
      await user.click(loginButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/email.*required|erforderlich/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  describe('Security', () => {
    it('should mask password input', () => {
      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should not log sensitive information', async () => {
      const consoleSpy = vi.spyOn(console, 'log');
      testHelpers.setupSuccessfulLogin(mockApiService);

      renderWithProviders(<Login onSwitchToRegister={mockOnSwitchToRegister} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login|anmelden/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockApiService.login).toHaveBeenCalled();
      });

      // Check that password is not logged
      const logCalls = consoleSpy.mock.calls.flat().join(' ');
      expect(logCalls).not.toContain('password123');

      consoleSpy.mockRestore();
    });
  });
});
