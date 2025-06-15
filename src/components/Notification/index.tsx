'use client'

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto close duration in milliseconds
}

const Notification: FC<NotificationProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!mounted || !isVisible) return null;

  const getNotificationStyles = () => {
    const baseStyles = "flex items-center gap-10 p-4 rounded-lg min-w-80 max-w-96";
    
    switch (type) {
      case "success":
        return `${baseStyles} bg-monokai-green text-white`;
      case "error":
        return `${baseStyles} bg-monokai-red text-white`;
      case "warning":
        return `${baseStyles} bg-monokai-yellow text-white`;
      case "info":
        return `${baseStyles} bg-monokai-blue text-white`;
      default:
        return `${baseStyles} bg-gray-600 text-white`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  const notificationContent = (
    <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none">
      <div 
        className={`
          ${getNotificationStyles()}
          transition-all duration-300 ease-in-out
          invisible opacity-0
          data-[visible=true]:opacity-100 data-[visible=true]:visible
          pointer-events-auto
        `}
        data-visible={isVisible}
      >
        <div className="flex-shrink-0 text-xl font-bold">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-lg hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );

  return createPortal(notificationContent, document.body);
};

export default Notification;