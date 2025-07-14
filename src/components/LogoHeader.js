import React from 'react';

const LogoHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <img 
        src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0oWu9bIgDjdvqUQH6XhKYIiaSc3LCtrM1fen0" 
        alt="Life Mascot Logo" 
        className="w-40 h-40 object-contain mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-800">Life Mascot</h1>
      <p className="text-gray-600 mt-2">Donde las mascotas encuentran su hogar</p>
    </div>
  );
};

export default LogoHeader;