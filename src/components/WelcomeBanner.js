import React from 'react';

const WelcomeBanner = ({ userName, userType, vetName, onProfileClick, profilePhoto, isPremium }) => {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-4 mb-6 shadow-sm flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-800">¡BIENVENID@ {userName || 'AMIGO DE LAS MASCOTAS'}!</h2>
        <p className="text-gray-600">
          {userType === 'adoptante' && 'Registrado como Adoptante'}
          {userType === 'rescatista' && `Registrado como Rescatista (${vetName})`}
          {isPremium && <span className="ml-2 px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-bold">Premium ✨</span>}
        </p>
      </div>
      <button onClick={onProfileClick} className="p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
        <img src={profilePhoto || 'https://via.placeholder.com/150'} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
      </button>
    </div>
  );
};

export default WelcomeBanner;