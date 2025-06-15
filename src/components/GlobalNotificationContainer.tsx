'use client'

import React from 'react';
import NotificationContainer from './Notification/NotificationContainer';
import { useNotification } from '@/contexts/NotificationContext';

const GlobalNotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <NotificationContainer 
      notifications={notifications}
      onClose={hideNotification}
    />
  );
};

export default GlobalNotificationContainer; 