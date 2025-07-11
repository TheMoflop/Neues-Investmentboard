import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

interface ToastMessage {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
}

/**
 * Toast context interface providing notification management
 */
interface ToastContextType {
  /** Show success message */
  showSuccess: (message: string, duration?: number) => void;
  /** Show error message */
  showError: (message: string, duration?: number) => void;
  /** Show warning message */
  showWarning: (message: string, duration?: number) => void;
  /** Show info message */
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook to access toast notifications
 * @throws {Error} If used outside of ToastProvider
 * @returns {ToastContextType} Toast context with notification methods
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Toast Provider Component
 * Manages toast notifications state and provides methods to show different types of messages
 * Automatically handles toast display duration and removal
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  /**
   * Generic function to show toast message
   * @param message - Message to display
   * @param severity - Type of message (success, error, warning, info)
   * @param duration - Duration in milliseconds (default: 6000)
   */
  const showToast = useCallback((message: string, severity: AlertColor, duration = 6000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToast({ id, message, severity, duration });
  }, []);

  /**
   * Close current toast
   */
  const handleClose = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * Show success message
   * @param message - Success message to display
   * @param duration - Duration in milliseconds
   */
  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  /**
   * Show error message
   * @param message - Error message to display
   * @param duration - Duration in milliseconds
   */
  const showError = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  /**
   * Show warning message
   * @param message - Warning message to display
   * @param duration - Duration in milliseconds
   */
  const showWarning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  /**
   * Show info message
   * @param message - Info message to display
   * @param duration - Duration in milliseconds
   */
  const showInfo = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }), [showSuccess, showError, showWarning, showInfo]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={toast?.duration || 6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast?.severity || 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast?.message || ''}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
