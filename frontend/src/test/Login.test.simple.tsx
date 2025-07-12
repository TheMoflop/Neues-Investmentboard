/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../components/auth/Login';

// Einfacher Test ohne komplexe Providers
describe('Login - Simple Tests', () => {
  const SimpleWrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

  it('should render login form', () => {
    const mockSwitchToRegister = vi.fn();
    
    render(
      <SimpleWrapper>
        <Login onSwitchToRegister={mockSwitchToRegister} />
      </SimpleWrapper>
    );

    // Prüft grundlegende Elemente
    expect(screen.getByText(/Anmelden/i)).toBeInTheDocument();
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
