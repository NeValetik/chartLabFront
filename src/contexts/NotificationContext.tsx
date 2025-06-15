'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

interface NotificationContextType {
  notifications: NotificationState[];
  showNotification: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => string;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showSuccess: (message: string, duration?: number) => string;
  showError: (message: string, duration?: number) => string;
  showWarning: (message: string, duration?: number) => string;
  showInfo: (message: string, duration?: number) => string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback((
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration?: number
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setNotifications(prev => [...prev, {
      id,
      message,
      type,
      isVisible: true
    }]);

    // Auto-remove notification after duration
    if (duration !== 0) {
      setTimeout(() => {
        hideNotification(id);
      }, duration || 5000);
    }

    return id;
  }, []);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isVisible: false }
          : notification
      )
    );

    // Remove from state after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 300);
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message: string, duration?: number) => 
    showNotification(message, 'success', duration), [showNotification]);
  
  const showError = useCallback((message: string, duration?: number) => 
    showNotification(message, 'error', duration), [showNotification]);
  
  const showWarning = useCallback((message: string, duration?: number) => 
    showNotification(message, 'warning', duration), [showNotification]);
  
  const showInfo = useCallback((message: string, duration?: number) => 
    showNotification(message, 'info', duration), [showNotification]);

  const value = {
    notifications,
    showNotification,
    hideNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 