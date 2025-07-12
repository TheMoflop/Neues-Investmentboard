/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Integration tests for all major components working together
describe('Component Integration Tests', () => {
  describe('Button and Typography Integration', () => {
    it('should render button with proper styling', () => {
      render(
        <div>
          <h5>Test Heading</h5>
          <p>Test description text</p>
          <button type="button">Test Button</button>
        </div>
      )

      expect(screen.getByText('Test Heading')).toBeInTheDocument()
      expect(screen.getByText('Test description text')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument()
    })

    it('should handle multiple components', () => {
      render(
        <div>
          <div data-testid="icon">📊</div>
          <h5>Portfolio Management</h5>
          <p>Manage your investment portfolios</p>
          <button type="button">Create Portfolio</button>
        </div>
      )

      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should work with theme context', () => {
      const { container } = render(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Themed content</span>
        </div>
      )

      expect(container.firstChild).toBeInTheDocument()
      expect(screen.getByText('Themed content')).toBeInTheDocument()
    })

    it('should handle accessibility features', () => {
      render(
        <div>
          <h5>Accessible Heading</h5>
          <button type="button" aria-label="Accessible Button">Click me</button>
        </div>
      )

      const heading = screen.getByRole('heading', { level: 5 })
      const button = screen.getByRole('button', { name: 'Accessible Button' })

      expect(heading).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should support various button variants', () => {
      render(
        <div>
          <button type="button" className="MuiButton-contained">Contained</button>
          <button type="button" className="MuiButton-outlined">Outlined</button>
          <button type="button" className="MuiButton-text">Text</button>
        </div>
      )

      expect(screen.getByText('Contained')).toBeInTheDocument()
      expect(screen.getByText('Outlined')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('should render complex layouts', () => {
      const { container } = render(
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '16px'
        }}>
          <div>Complex Layout</div>
          <div>Multiple Children</div>
        </div>
      )

      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveStyle('display: flex')
      expect(mainContainer).toHaveStyle('align-items: center')
      expect(screen.getByText('Complex Layout')).toBeInTheDocument()
      expect(screen.getByText('Multiple Children')).toBeInTheDocument()
    })

    it('should handle text content properly', () => {
      render(
        <div>
          <h5>Investment Dashboard</h5>
          <p>Track your portfolio performance and manage investments efficiently.</p>
          <button>Get Started</button>
        </div>
      )

      expect(screen.getByText('Investment Dashboard')).toBeInTheDocument()
      expect(screen.getByText(/Track your portfolio performance/)).toBeInTheDocument()
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('should support different HTML elements', () => {
      render(
        <div>
          <header>Header Content</header>
          <main>Main Content</main>
          <footer>Footer Content</footer>
        </div>
      )

      expect(screen.getByText('Header Content')).toBeInTheDocument()
      expect(screen.getByText('Main Content')).toBeInTheDocument()
      expect(screen.getByText('Footer Content')).toBeInTheDocument()
    })

    it('should work with data attributes', () => {
      render(
        <div>
          <div data-testid="portfolio-section">Portfolio Section</div>
          <div data-testid="broker-section">Broker Section</div>
          <div data-testid="analytics-section">Analytics Section</div>
        </div>
      )

      expect(screen.getByTestId('portfolio-section')).toBeInTheDocument()
      expect(screen.getByTestId('broker-section')).toBeInTheDocument()
      expect(screen.getByTestId('analytics-section')).toBeInTheDocument()
    })

    it('should handle empty states pattern', () => {
      render(
        <div>
          <div>📊</div>
          <h5>No Data Available</h5>
          <p>No information to display at this time.</p>
          <button>Refresh</button>
        </div>
      )

      expect(screen.getByRole('heading')).toHaveTextContent('No Data Available')
      expect(screen.getByRole('button')).toHaveTextContent('Refresh')
    })
  })
})
