import React, { useState } from 'react';
import LogoHeader from './LogoHeader';
import AuthButton from './AuthButton';
import BackButton from './BackButton';
import { addUser, userExists } from '../mock/users';

const RegisterRescuerScreen = ({ onRegisterSuccess, onBackToWelcome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [password, setPassword] = useState('');
  const [vetName, setVetName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !emailDomain || !password || !vetName) {
      setError('Por favor, llena todos los campos.');
      return;
    }
    const fullEmail = `${email}@${emailDomain}`;
    if (userExists(fullEmail)) {
      setError('Este correo ya está registrado.');
      return;
    }

    addUser({ id: Date.now(), name, email: fullEmail, password, type: 'rescatista', vetName, nickname: `@${name.toLowerCase().replace(/\s/g, '')}`, profilePhoto: '', description: '', registeredDate: new Date().toLocaleDateString(), isPremium: false });
    onRegisterSuccess();
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative" 
      style={{ backgroundImage: `url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc06upbIoVFtni9pklCcebwvoumN4D1UEQ3aHWZ')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay oscuro */}
      <BackButton onClick={onBackToWelcome} />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 relative z-10">
        <LogoHeader />
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Regístrate como Rescatista</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            placeholder="Tu Nombre" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-500">
            <input 
              type="text" 
              placeholder="Correo" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="flex-grow px-4 py-3 bg-transparent outline-none"
            />
            <span className="py-3">@</span>
            <select
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              className="px-4 py-3 bg-transparent outline-none rounded-r-lg"
            >
              <option value="">Dominio</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="outlook.com">outlook.com</option>
            </select>
          </div>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input 
            type="text" 
            placeholder="Nombre de la Veterinaria" 
            value={vetName} 
            onChange={(e) => setVetName(e.target.value)} 
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <AuthButton text="Registrarme" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default RegisterRescuerScreen;