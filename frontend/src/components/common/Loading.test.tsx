import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Loading, CardSkeleton, ListSkeleton } from './Loading'
import { customRender } from '../../test/test-utils'

describe('Loading Components', () => {
  describe('CardSkeleton', () => {
    it('should render card skeleton correctly', () => {
      const { container } = customRender(<CardSkeleton />)
      
      // Should contain skeleton elements
      const skeletons = container.querySelectorAll('.MuiSkeleton-root')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should have proper card structure', () => {
      const { container } = customRender(<CardSkeleton />)
      
      const card = container.querySelector('.MuiCard-root')
      expect(card).toBeInTheDocument()
    })

    it('should render custom number of lines', () => {
      const { container } = customRender(<CardSkeleton lines={5} />)
      
      // Should have 1 title + 5 lines
      const textSkeletons = container.querySelectorAll('.MuiSkeleton-text')
      expect(textSkeletons.length).toBeGreaterThanOrEqual(5)
    })
  })

  describe('ListSkeleton', () => {
    it('should render list skeleton with default items', () => {
      const { container } = customRender(<ListSkeleton />)
      
      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards.length).toBe(5) // Default items
    })

    it('should render list skeleton with custom items', () => {
      const { container } = customRender(<ListSkeleton items={3} />)
      
      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards.length).toBe(3)
    })

    it('should contain avatars and text in each item', () => {
      const { container } = customRender(<ListSkeleton items={2} />)
      
      const circularSkeletons = container.querySelectorAll('.MuiSkeleton-circular')
      const textSkeletons = container.querySelectorAll('.MuiSkeleton-text')
      
      expect(circularSkeletons.length).toBe(2) // One avatar per item
      expect(textSkeletons.length).toBeGreaterThanOrEqual(4) // Multiple text elements per item
    })

    it('should handle zero items gracefully', () => {
      const { container } = customRender(<ListSkeleton items={0} />)
      
      const cards = container.querySelectorAll('.MuiCard-root')
      expect(cards.length).toBe(0)
    })
  })

  describe('Main Loading Component', () => {
    it('should render loading spinner with default message', () => {
      customRender(<Loading />)
      
      expect(screen.getByText('Wird geladen...')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render custom message', () => {
      customRender(<Loading message="Custom loading message" />)
      
      expect(screen.getByText('Custom loading message')).toBeInTheDocument()
    })

    it('should render with custom size', () => {
      const { container } = customRender(<Loading size={60} />)
      
      const progressbar = container.querySelector('.MuiCircularProgress-root')
      expect(progressbar).toBeInTheDocument()
    })

    it('should apply custom styling', () => {
      const customSx = { backgroundColor: 'red' }
      const { container } = customRender(<Loading sx={customSx} />)
      
      const loadingContainer = container.firstChild as HTMLElement
      expect(loadingContainer).toHaveStyle('background-color: rgb(255, 0, 0)')
    })
  })

  describe('Animation and Accessibility', () => {
    it('should have skeleton animation', () => {
      const { container } = customRender(<CardSkeleton />)
      
      const skeleton = container.querySelector('.MuiSkeleton-root')
      expect(skeleton).toHaveClass('MuiSkeleton-pulse')
    })

    it('should be accessible for screen readers', () => {
      customRender(<Loading />)
      
      // Loading component should have progressbar role
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })
  })

  describe('Theme Integration', () => {
    it('should work with theme context', () => {
      const { container } = customRender(<Loading />)
      
      const skeleton = container.querySelector('.MuiCircularProgress-root')
      expect(skeleton).toBeInTheDocument()
    })

    it('should render skeleton components with theme', () => {
      const { container } = customRender(<CardSkeleton />)
      
      const skeleton = container.querySelector('.MuiSkeleton-root')
      expect(skeleton).toBeInTheDocument()
    })
  })

  describe('Component Props', () => {
    it('should handle edge case item values for ListSkeleton', () => {
      // Very large count
      const { container: largeContainer } = customRender(<ListSkeleton items={10} />)
      const largeListItems = largeContainer.querySelectorAll('.MuiCard-root')
      expect(largeListItems.length).toBe(10)

      // Zero count
      const { container: zeroContainer } = customRender(<ListSkeleton items={0} />)
      const zeroListItems = zeroContainer.querySelectorAll('.MuiCard-root')
      expect(zeroListItems.length).toBe(0)
    })

    it('should handle edge case line values for CardSkeleton', () => {
      // Many lines
      const { container: manyLinesContainer } = customRender(<CardSkeleton lines={10} />)
      const textSkeletons = manyLinesContainer.querySelectorAll('.MuiSkeleton-text')
      expect(textSkeletons.length).toBeGreaterThanOrEqual(10)

      // Zero lines (should still have title)
      const { container: zeroLinesContainer } = customRender(<CardSkeleton lines={0} />)
      const titleSkeleton = zeroLinesContainer.querySelector('.MuiSkeleton-text')
      expect(titleSkeleton).toBeInTheDocument()
    })
  })
})
