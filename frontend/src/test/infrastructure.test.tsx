import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';

// Simple test component
const TestComponent = () => (
  <div data-testid="test-component">Test Infrastructure</div>
);

describe('Test Infrastructure', () => {
  it('should render components correctly', () => {
    renderWithProviders(<TestComponent />);
    
    const component = screen.getByTestId('test-component');
    const text = screen.getByText('Test Infrastructure');
    
    expect(component).toBeDefined();
    expect(text).toBeDefined();
  });

  it('should provide mock auth context', () => {
    renderWithProviders(<TestComponent />, {
      authContext: { user: null, isAuthenticated: false }
    });
    
    const authContext = screen.getByTestId('mock-auth-context');
    expect(authContext).toBeDefined();
  });

  it('should provide mock toast context', () => {
    renderWithProviders(<TestComponent />, {
      toastContext: { toasts: [] }
    });
    
    const toastContext = screen.getByTestId('mock-toast-context');
    expect(toastContext).toBeDefined();
  });

  it('should work with router', () => {
    renderWithProviders(<TestComponent />, {
      routerProps: { initialEntries: ['/test'] }
    });
    
    const component = screen.getByTestId('test-component');
    expect(component).toBeDefined();
  });
});
