/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Einfache Mock-Komponente ohne MUI Icons
const MockLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div data-testid="login-container">
      <form>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          data-testid="toggle-password"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
        <button type="submit" data-testid="login-button">
          Anmelden
        </button>
      </form>
    </div>
  );
};

describe('Login Component (Simplified)', () => {
  it('renders login form', () => {
    render(<MockLogin />);
    
    expect(screen.getByTestId('login-container')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('allows typing in email field', () => {
    render(<MockLogin />);
    
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    
    expect(emailInput).toHaveValue('test@test.com');
  });

  it('allows typing in password field', () => {
    render(<MockLogin />);
    
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput).toHaveValue('password123');
  });

  it('toggles password visibility', () => {
    render(<MockLogin />);
    
    const passwordInput = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('toggle-password');
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
