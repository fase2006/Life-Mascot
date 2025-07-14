import React, { useEffect, useState } from 'react';

const ToastNotification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Allow fade out animation
      }
    }, 3000); // Visible for 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type] || 'bg-gray-800';

  return (
    <div 
      className={`fixed top-4 left-4 z-50 p-4 rounded-lg shadow-lg text-black transition-opacity duration-300 ${bgColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ minWidth: '200px' }}
    >
      {message}
    </div>
  );
};

export default ToastNotification;