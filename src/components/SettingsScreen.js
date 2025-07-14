import React from 'react';
import BackButton from './BackButton';

const SettingsScreen = ({ onBack, onLogout, onDeleteAccount, onChangePassword }) => {
  const creators = [
    "Asmad Santos, José Arcadio",
    "Boulangger Atoche Luis Samuel",
    "Castillo Alburqueque Fabian",
    "Saavedra Carrillo Jessie Sam",
    "Seminario Mejia, Fabrizio Eduardo",
    "Laban Saavedra Yuri Magdalena",
    "Guerrero Gonzales Lenin Stalin"
  ];

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Configuración</h2>

      <div className="space-y-4">
        <button 
          onClick={onChangePassword}
          className="w-full bg-white text-gray-800 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-2xl">🔑</span>
          <span className="font-medium">Cambiar Contraseña</span>
        </button>
        <button 
          onClick={onDeleteAccount}
          className="w-full bg-white text-red-600 py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-red-50 transition-colors"
        >
          <span className="text-2xl">🗑️</span>
          <span className="font-medium">Eliminar Cuenta</span>
        </button>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Creadores de la Aplicación</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {creators.map((creator, index) => (
              <li key={index}>{creator}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">¡Gracias por instalar Life Mascot!</h3>
          <p className="text-gray-700">Esperamos que disfrutes de todas las funcionalidades que hemos creado para ti y tus mascotas.</p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-red-600 transition-colors"
        >
          <span className="text-2xl">🚪</span>
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;