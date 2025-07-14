import React, { useState } from 'react';
import LogoHeader from './LogoHeader';
import AuthButton from './AuthButton';
import BackButton from './BackButton';
import { findUser } from '../mock/users';

const LoginScreen = ({ onLoginSuccess, onBackToWelcome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !emailDomain) {
      setError('Por favor, ingresa tu correo, dominio y contraseña.');
      return;
    }

    const fullEmail = `${email}@${emailDomain}`;
    const user = findUser(fullEmail, password);
    if (user) {
      onLoginSuccess(user);
    } else {
      setError('Correo o contraseña incorrectos.');
    }
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <AuthButton text="Ingresar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;