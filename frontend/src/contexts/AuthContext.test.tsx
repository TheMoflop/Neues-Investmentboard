import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { apiService } from '../services/apiService'
import type { ReactNode } from 'react'

// Mock apiService
vi.mock('../services/apiService', () => ({
  apiService: {
    login: vi.fn(),
    register: vi.fn(),
    setAuthToken: vi.fn(),
    clearAuthToken: vi.fn(),
  }
}))

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      try {
        renderHook(() => useAuth())
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('useAuth must be used within an AuthProvider')
      }
      consoleSpy.mockRestore()
    })

    it('should provide initial state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.user).toBeNull()
      expect(result.current.token).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })

    it('should restore authentication state from localStorage', () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      }
      const mockToken = 'mock-token'

      mockLocalStorage.getItem.mockImplementation((key: string) => {
        if (key === 'token') return mockToken
        if (key === 'user') return JSON.stringify(mockUser)
        return null
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.token).toBe(mockToken)
      expect(result.current.isAuthenticated).toBe(true)
      expect(apiService.setAuthToken).toHaveBeenCalledWith(mockToken)
    })
  })

  describe('login function', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
        token: 'mock-token'
      }

      vi.mocked(apiService.login).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.login('test@example.com', 'password')
      })

      expect(result.current.user).toEqual(mockResponse.user)
      expect(result.current.token).toBe(mockResponse.token)
      expect(result.current.isAuthenticated).toBe(true)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockResponse.token)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.user))
      expect(apiService.setAuthToken).toHaveBeenCalledWith(mockResponse.token)
    })

    it('should handle login error', async () => {
      const mockError = new Error('Login failed')
      vi.mocked(apiService.login).mockRejectedValue(mockError)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await expect(act(async () => {
        await result.current.login('test@example.com', 'wrong-password')
      })).rejects.toThrow('Login failed')

      expect(result.current.user).toBeNull()
      expect(result.current.token).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('register function', () => {
    it('should register successfully', async () => {
      const mockResponse = {
        user: {
          id: 1,
          name: 'New User',
          email: 'new@example.com',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
        token: 'new-token'
      }

      vi.mocked(apiService.register).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.register('New User', 'new@example.com', 'password')
      })

      expect(result.current.user).toEqual(mockResponse.user)
      expect(result.current.token).toBe(mockResponse.token)
      expect(result.current.isAuthenticated).toBe(true)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockResponse.token)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.user))
      expect(apiService.setAuthToken).toHaveBeenCalledWith(mockResponse.token)
    })

    it('should handle register error', async () => {
      const mockError = new Error('Registration failed')
      vi.mocked(apiService.register).mockRejectedValue(mockError)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await expect(act(async () => {
        await result.current.register('New User', 'new@example.com', 'password')
      })).rejects.toThrow('Registration failed')

      expect(result.current.user).toBeNull()
      expect(result.current.token).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('logout function', () => {
    it('should logout successfully', async () => {
      // First, set up authenticated state
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      }
      const mockToken = 'mock-token'

      mockLocalStorage.getItem.mockImplementation((key: string) => {
        if (key === 'token') return mockToken
        if (key === 'user') return JSON.stringify(mockUser)
        return null
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      // Verify initial authenticated state
      expect(result.current.isAuthenticated).toBe(true)

      // Logout
      act(() => {
        result.current.logout()
      })

      expect(result.current.user).toBeNull()
      expect(result.current.token).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user')
      expect(apiService.clearAuthToken).toHaveBeenCalled()
    })
  })
})
