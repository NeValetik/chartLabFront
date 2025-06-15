'use client'

import { useState, useCallback } from 'react';

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

export const useNotification = () => {
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

  return {
    notifications,
    showNotification,
    hideNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}; 