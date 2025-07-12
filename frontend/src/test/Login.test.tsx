/// <reference types="@testing-library/jest-dom/vitest" />
import { renderWithProviders, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../components/auth/Login';
import { vi } from 'vitest';

function fakeLoginResponse() {
  return {
    token: 'fake-token',
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '',
      updatedAt: ''
    }
  };
}

// Hilfsfunktion für das Rendering
function renderLogin(props = {}) {
  const user = userEvent.setup();
  const defaultProps = { onSwitchToRegister: vi.fn() };
  const component = renderWithProviders(<Login {...defaultProps} {...props} />);
  return { user, ...component };
}

describe('Login', () => {
  it('keeps button disabled if email is empty', async () => {
    const { user } = renderLogin();
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(passwordInput, 'password123');
    expect(submitButton).toBeDisabled();
  });

  it('keeps button disabled if password is empty', async () => {
    const { user } = renderLogin();
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(emailInput, 'test@example.com');
    expect(submitButton).toBeDisabled();
  });

  it('keeps button disabled if email is invalid', async () => {
    const { user } = renderLogin();
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');
    expect(submitButton).toBeDisabled();
  });

  it('does not call login API if fields are invalid', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login');
    const { user } = renderLogin();
    
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.click(submitButton);
    
    expect(loginMock).not.toHaveBeenCalled();
    loginMock.mockRestore();
  });

  it('shows error message on failed login', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login').mockRejectedValue(new Error('Login failed'));
    const { user } = renderLogin();
    
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);
    
    await screen.findByText(/Anmeldung fehlgeschlagen/i);
    expect(screen.getByText(/Anmeldung fehlgeschlagen/i)).toBeInTheDocument();
    loginMock.mockRestore();
  });

  it('disables button while loading', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login').mockImplementation((): Promise<{ token: string; user: any }> => {
      return new Promise<{ token: string; user: any }>(resolve => {
        setTimeout(resolve, 500, fakeLoginResponse());
      });
    });
    const { user } = renderLogin();
    
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(await screen.findByRole('button', { name: /Wird angemeldet/i })).toBeDisabled();
    loginMock.mockRestore();
  });

  it('toggles password visibility', async () => {
    const { user } = renderLogin();
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('calls onSwitchToRegister when register link is clicked', async () => {
    const switchMock = vi.fn();
    const { user } = renderLogin({ onSwitchToRegister: switchMock });
    
    const registerLink = screen.getByText(/Noch kein Konto\? Jetzt registrieren/i);
    await user.click(registerLink);
    
    expect(switchMock).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Login onSwitchToRegister={vi.fn()} />);
    expect(container).toBeTruthy();
  });

  it('calls login API on button click', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login').mockResolvedValue({
      token: 'fake-token',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      }
    });
    const { user } = renderLogin();
    
    const emailInput = screen.getByLabelText(/E-Mail Adresse/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(loginMock).toHaveBeenCalled();
    loginMock.mockRestore();
  });
});

// === VEREINFACHTE TESTS OHNE PROVIDER (zur Fehlervermeidung) ===
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock AuthContext für vereinfachte Tests
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    loading: false,
    isAuthenticated: false
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children
}));

// Einfacher Wrapper mit minimalen Providern
const SimpleWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme();
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('Login - Simplified Tests', () => {
  it('should render login form', () => {
    const mockSwitchToRegister = vi.fn();
    
    render(
      <SimpleWrapper>
        <Login onSwitchToRegister={mockSwitchToRegister} />
      </SimpleWrapper>
    );

    // Grundlegende Elemente prüfen (spezifischere Suche)
    expect(screen.getByRole('heading', { name: /Anmelden/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/i)).toBeInTheDocument();
  });

  it('should have disabled submit button initially', () => {
    const mockSwitchToRegister = vi.fn();
    
    render(
      <SimpleWrapper>
        <Login onSwitchToRegister={mockSwitchToRegister} />
      </SimpleWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    expect(submitButton).toBeDisabled();
  });
});
