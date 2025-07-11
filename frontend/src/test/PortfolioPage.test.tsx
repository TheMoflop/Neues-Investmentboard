import { render } from '@testing-library/react';
import PortfolioPage from '../components/portfolio/PortfolioPage';
import { AuthProvider } from '../contexts/AuthContext';

describe('PortfolioPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AuthProvider>
        <PortfolioPage />
      </AuthProvider>
    );
    expect(container).toBeTruthy();
  });
});
