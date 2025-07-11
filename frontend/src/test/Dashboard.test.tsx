import { render } from '@testing-library/react';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
    expect(container).toBeTruthy();
  });
});
