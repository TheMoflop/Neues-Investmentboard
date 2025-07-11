import { render } from '@testing-library/react';
import BrokerPage from '../components/broker/BrokerPage';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';

describe('BrokerPage', () => {
  it('renders without crashing (API gemockt)', () => {
    const { container } = render(
      <AuthProvider>
        <ToastProvider>
          <BrokerPage />
        </ToastProvider>
      </AuthProvider>
    );
    expect(container).toBeTruthy();
  });
});
