import React from 'react';

const NavButton = ({ icon, label, active = false, onClick, profilePhoto = null, notificationCount = 0 }) => {
  return (
    <button
      className={`flex flex-col items-center p-3 w-full rounded-xl transition-all ${
        active ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {profilePhoto ? (
        <img src={profilePhoto} alt="Perfil" className="w-8 h-8 rounded-full object-cover mb-1" />
      ) : (
        <span className="text-2xl mb-1">{icon}</span>
      )}
      <span className="text-xs font-medium">{label}</span>
      {notificationCount > 0 && (
        <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </button>
  );
};

export default NavButton;