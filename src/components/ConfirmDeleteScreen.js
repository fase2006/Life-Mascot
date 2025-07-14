import React, { useState } from 'react';
import BackButton from './BackButton';

const ConfirmDeleteScreen = ({ onBack, onConfirmDelete }) => {
  const [confirmationText, setConfirmationText] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (confirmationText === 'CONFIRMO') {
      onConfirmDelete();
    } else {
      setError('La palabra de confirmación es incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      <BackButton onClick={onBack} />
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">¿Estás seguro de eliminar tu cuenta?</h2>
        <p className="text-gray-700 mb-6">Esta acción es irreversible. Todos tus datos, mascotas y publicaciones serán eliminados permanentemente.</p>
        
        <p className="text-gray-800 font-semibold mb-3">Para confirmar, escribe "CONFIRMO" en mayúsculas:</p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => { setConfirmationText(e.target.value); setError(''); }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button
          onClick={handleConfirm}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors mb-3"
        >
          Eliminar Cuenta
        </button>
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteScreen;