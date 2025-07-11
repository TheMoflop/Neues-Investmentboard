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
import { customRender } from './test-utils';
import Login from '../components/auth/Login';
import { fireEvent, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';
import { vi } from 'vitest';
// Hilfsfunktion für das Rendering

// Hilfsfunktion für das Rendering
function renderLogin(props = {}) {
  return customRender(
    <AuthProvider>
      <ToastProvider>
        <Login onSwitchToRegister={vi.fn()} {...props} />
      </ToastProvider>
    </AuthProvider>
  );
}

describe('Login', () => {
  it('keeps button disabled if email is empty', () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /Anmelden/i })).toBeDisabled();
  });

  it('keeps button disabled if password is empty', () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: 'test@example.com' } });
    expect(screen.getByRole('button', { name: /Anmelden/i })).toBeDisabled();
  });

  it('keeps button disabled if email is invalid', () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /Anmelden/i })).toBeDisabled();
  });

  it('does not call login API if fields are invalid', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login');
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Anmelden/i }));
    expect(loginMock).not.toHaveBeenCalled();
    loginMock.mockRestore();
  });

  it('shows error message on failed login', async () => {
    const { apiService } = await import('../services/apiService');
    const loginMock = vi.spyOn(apiService, 'login').mockRejectedValue(new Error('Login failed'));
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Anmelden/i }));
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
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Anmelden/i }));
    expect(await screen.findByRole('button', { name: /Wird angemeldet/i })).toBeDisabled();
    loginMock.mockRestore();
  });

  it('toggles password visibility', () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(/Passwort/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('calls onSwitchToRegister when register link is clicked', () => {
    const switchMock = vi.fn();
    renderLogin({ onSwitchToRegister: switchMock });
    fireEvent.click(screen.getByText(/Noch kein Konto\? Jetzt registrieren/i));
    expect(switchMock).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { container } = customRender(<Login onSwitchToRegister={vi.fn()} />);
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
    renderLogin();
    fireEvent.change(screen.getByLabelText(/E-Mail Adresse/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Anmelden/i }));
    expect(loginMock).toHaveBeenCalled();
    loginMock.mockRestore();
  });
});
