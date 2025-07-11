import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthResponse } from '../types/api';
import { apiService } from '../services/apiService';

/**
 * Type definition for the authentication context
 * Provides user state and authentication methods to the entire app
 */
interface AuthContextType {
  /** Current authenticated user or null if not logged in */
  user: User | null;
  /** JWT token for API authentication */
  token: string | null;
  /** Login function that accepts email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Registration function for new users */
  register: (name: string, email: string, password: string) => Promise<void>;
  /** Logout function that clears user state and token */
  logout: () => void;
  /** Loading state indicator for async auth operations */
  isLoading: boolean;
  /** Computed boolean indicating if user is authenticated */
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} Authentication context with user state and methods
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods to child components
 * Handles token persistence, automatic login restoration, and API token management
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect to restore authentication state on app initialization
   * Checks localStorage for saved token and user data
   * Automatically logs user back in if valid credentials are found
   */
  useEffect(() => {
    // Prüfe beim App-Start, ob bereits ein Token vorhanden ist
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        apiService.setAuthToken(savedToken);
      } catch (error) {
        console.error('Fehler beim Laden der gespeicherten Auth-Daten:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function
   * Authenticates user with email and password, updates state and localStorage on success
   * @param email - User's email address
   * @param password - User's password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await apiService.login({ email, password });
      
      setUser(response.user);
      setToken(response.token);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      apiService.setAuthToken(response.token);
    } catch (error) {
      console.error('Login fehlergeschlagen:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registration function
   * Registers a new user and logs them in automatically on success
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password
   */
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      // Register user and automatically log them in
      const response: AuthResponse = await apiService.register({ name, email, password });
      
      setUser(response.user);
      setToken(response.token);
      
      // Persist authentication state
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      apiService.setAuthToken(response.token);
    } catch (error) {
      console.error('Registration fehlergeschlagen:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   * Clears all authentication state from memory and localStorage
   * Removes API token and redirects to login
   */
  const logout = (): void => {
    // Clear all authentication state
    setUser(null);
    setToken(null);
    
    // Clear persisted state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear API token
    apiService.clearAuthToken();
  };

  /**
   * Computed authentication status
   * User is considered authenticated if both user and token are present
   */
  const isAuthenticated = useMemo(() => {
    return Boolean(user && token);
  }, [user, token]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  }), [user, token, isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
