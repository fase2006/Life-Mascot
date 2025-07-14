import React from 'react';
import BackButton from './BackButton';

const MoreScreen = ({ onBack, onNavigate, onSupportChat }) => {
  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Más Opciones</h2>

      <div className="space-y-4">
        <button 
          onClick={() => onNavigate('community')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">🗨️</span>
          <span className="font-medium">Comunidad</span>
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">🛍️</span>
          <span className="font-medium">Tienda</span>
        </button>
        <button 
          onClick={() => onNavigate('chatList')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">💬</span>
          <span className="font-medium">Chat</span>
        </button>
        <button 
          onClick={() => onNavigate('vets')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">📍</span>
          <span className="font-medium">Veterinarias (Mapa)</span>
        </button>
        <button 
          onClick={() => onNavigate('appointments')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">📅</span>
          <span className="font-medium">Citas</span>
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">⚙️</span>
          <span className="font-medium">Configuración</span>
        </button>
        <button 
          onClick={() => onNavigate('premium')}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:from-amber-500 hover:to-orange-600 transition-colors"
        >
          <span className="text-2xl">✨</span>
          <span className="font-medium">Mejorar a Premium</span>
        </button>
      </div>

      <div className="mt-8 flex justify-around">
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <img src="https://acortar.link/Dygg2o" alt="TikTok" className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <img src="https://acortar.link/n2gYgu" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <img src="https://acortar.link/UuDePQ" alt="Instagram" className="w-6 h-6" />
        </a>
      </div>
      <button 
        onClick={onSupportChat}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
      >
        Soporte Técnico
      </button>
    </div>
  );
};

export default MoreScreen;