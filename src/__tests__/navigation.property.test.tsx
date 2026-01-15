/**
 * Feature: marketing-landing-page
 * Property 9: Navigation Active State
 * 
 * For any page in the marketing site, the navigation menu item corresponding 
 * to the current route SHALL have the active/highlighted state.
 * 
 * Validates: Requirements 7.4
 */

import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'

// Mock next/navigation
const mockPathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

// Import after mocking
import { Header } from '@/components/layout/Header'

describe('Property 9: Navigation Active State', () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/features', name: 'Features' },
    { path: '/contact', name: 'Contact' },
  ]

  beforeEach(() => {
    mockPathname.mockReset()
  })

  test('should highlight the correct navigation item for each route', () => {
    routes.forEach(({ path, name }) => {
      mockPathname.mockReturnValue(path)
      
      const { unmount } = render(<Header />)
      
      // Find all navigation links (desktop)
      const navLinks = screen.getAllByRole('link', { name })
      
      // At least one link should exist for this route
      expect(navLinks.length).toBeGreaterThan(0)
      
      // Check that the active link has the correct styling
      const activeLink = navLinks.find(link => 
        link.getAttribute('aria-current') === 'page' ||
        link.classList.contains('text-primary-600')
      )
      
      expect(activeLink).toBeTruthy()
      
      unmount()
    })
  })

  test('should not highlight non-active navigation items', () => {
    routes.forEach(({ path: currentPath, name: currentName }) => {
      mockPathname.mockReturnValue(currentPath)
      
      const { unmount } = render(<Header />)
      
      // Check other routes are not highlighted
      routes
        .filter(r => r.path !== currentPath)
        .forEach(({ name: otherName }) => {
          const otherLinks = screen.getAllByRole('link', { name: otherName })
          
          otherLinks.forEach(link => {
            // Should not have aria-current="page"
            expect(link.getAttribute('aria-current')).not.toBe('page')
          })
        })
      
      unmount()
    })
  })

  test('should handle nested routes correctly (property-based)', () => {
    // Generate random sub-paths for /features
    fc.assert(
      fc.property(
        fc.stringOf(fc.constantFrom('a', 'b', 'c', '1', '2', '3', '-', '_'), { minLength: 1, maxLength: 10 }),
        (subPath) => {
          const nestedPath = `/features/${subPath}`
          mockPathname.mockReturnValue(nestedPath)
          
          const { unmount } = render(<Header />)
          
          // Features link should be active for any /features/* path
          const featuresLinks = screen.getAllByRole('link', { name: 'Features' })
          const hasActiveFeatures = featuresLinks.some(link => 
            link.getAttribute('aria-current') === 'page' ||
            link.classList.contains('text-primary-600')
          )
          
          unmount()
          
          return hasActiveFeatures
        }
      ),
      { numRuns: 50 }
    )
  })

  test('should only have one active navigation item at a time', () => {
    routes.forEach(({ path }) => {
      mockPathname.mockReturnValue(path)
      
      const { unmount } = render(<Header />)
      
      // Count links with aria-current="page" in desktop nav
      const allLinks = screen.getAllByRole('link')
      const activeLinks = allLinks.filter(link => 
        link.getAttribute('aria-current') === 'page'
      )
      
      // Should have exactly 2 active links (desktop + mobile for same route)
      // or 1 if mobile menu is closed
      expect(activeLinks.length).toBeLessThanOrEqual(2)
      expect(activeLinks.length).toBeGreaterThanOrEqual(1)
      
      // All active links should be for the same route
      const uniqueHrefs = new Set(activeLinks.map(link => link.getAttribute('href')))
      expect(uniqueHrefs.size).toBe(1)
      
      unmount()
    })
  })

  test('should maintain active state consistency across random route sequences (property-based)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...routes.map(r => r.path)), { minLength: 5, maxLength: 20 }),
        (pathSequence) => {
          let allPassed = true
          
          pathSequence.forEach(path => {
            mockPathname.mockReturnValue(path)
            
            const { unmount } = render(<Header />)
            
            const expectedRoute = routes.find(r => r.path === path)
            if (expectedRoute) {
              const links = screen.getAllByRole('link', { name: expectedRoute.name })
              const hasActive = links.some(link => 
                link.getAttribute('aria-current') === 'page' ||
                link.classList.contains('text-primary-600')
              )
              
              if (!hasActive) {
                allPassed = false
              }
            }
            
            unmount()
          })
          
          return allPassed
        }
      ),
      { numRuns: 30 }
    )
  })
})
