'use client'

import { FC } from 'react';
import Notification from './index';
import { NotificationState } from './useNotification';

interface NotificationContainerProps {
  notifications: NotificationState[];
  onClose: (id: string) => void;
}

const NotificationContainer: FC<NotificationContainerProps> = ({ 
  notifications, 
  onClose 
}) => {
  return (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            transform: `translateY(-${index * 80}px)`, // Stack notifications
          }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() => onClose(notification.id)}
            duration={0} // Handle duration in the hook instead
          />
        </div>
      ))}
    </>
  );
};

export default NotificationContainer; 