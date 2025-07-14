import React from 'react';

const AuthButton = ({ text, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const baseClasses = "w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-sm";
  
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-white hover:bg-gray-50 text-orange-500 border border-orange-500",
    tertiary: "bg-gray-100 hover:bg-gray-200 text-gray-800"
  };

  return (
    <button 
      type={type}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default AuthButton;