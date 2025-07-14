import React, { useState } from 'react';
import BackButton from './BackButton';
import { updateUser, findUser } from '../mock/users';

const ChangePasswordScreen = ({ currentUser, onBack, onPasswordChangeSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    // Simulate checking current password
    const user = findUser(currentUser.email, currentPassword);
    if (!user) {
      setError('La contraseña actual es incorrecta.');
      return;
    }

    const updatedUser = { ...currentUser, password: newPassword };
    updateUser(updatedUser);
    onPasswordChangeSuccess();
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cambiar Contraseña</h2>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={currentUser.email}
          readOnly
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg bg-gray-100"
        />
        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <button
          onClick={handleChangePassword}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;