import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Clean Mock Test', () => {
  it('should render a simple component without MUI', () => {
    const SimpleComponent = () => <div>Hello Test World</div>;
    
    render(<SimpleComponent />);
    
    expect(screen.getByText('Hello Test World')).toBeInTheDocument();
  });

  it('should handle basic DOM operations', () => {
    document.body.innerHTML = '<div id="test">Testing</div>';
    
    const element = document.getElementById('test');
    expect(element).toBeInTheDocument();
    expect(element?.textContent).toBe('Testing');
  });

  it('should work with timeouts', async () => {
    let completed = false;
    
    setTimeout(() => {
      completed = true;
    }, 100);

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(completed).toBe(true);
  });
});
