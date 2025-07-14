import React, { useState } from 'react';
import BackButton from './BackButton';
import { updateUser } from '../mock/users';

const PremiumScreen = ({ currentUser, onBack, onUpgradeSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [subscriptionType, setSubscriptionType] = useState('trial'); // trial, monthly, annual
  const [error, setError] = useState('');

  const handleUpgrade = () => {
    setError('');
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      setError('Por favor, completa todos los detalles de la tarjeta.');
      return;
    }
    
    let endDate;
    let price;
    if (subscriptionType === 'trial') {
      endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
      price = 0;
    } else if (subscriptionType === 'monthly') {
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      price = 28.90;
    } else if (subscriptionType === 'annual') {
      endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      price = 294.78;
    }

    // Simulate payment processing
    alert(`Procesando pago de S/.${price.toFixed(2)} para ${subscriptionType} Premium...`);
    
    const updatedUser = { ...currentUser, isPremium: true, premiumTrialEndDate: endDate.toISOString(), subscriptionType: subscriptionType };
    updateUser(updatedUser);
    onUpgradeSuccess(updatedUser);
  };

  const getRenewalDate = () => {
    if (currentUser.isPremium && currentUser.premiumTrialEndDate) {
      const date = new Date(currentUser.premiumTrialEndDate);
      return date.toLocaleDateString();
    }
    return 'N/A';
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mejorar a Premium</h2>

      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg p-6 mb-6 text-center">
        <h3 className="text-3xl font-bold mb-2">¡Conviértete en Premium!</h3>
        <p className="text-lg mb-4">Disfruta de beneficios exclusivos</p>
        <ul className="list-disc list-inside text-left mx-auto max-w-xs space-y-1">
          <li>Descuentos exclusivos en la tienda</li>
          <li>Envío gratis en todas tus compras</li>
          <li>Nombre en comentarios en color dorado</li>
          <li>Acceso a productos Premium en la tienda</li>
        </ul>
      </div>

      {currentUser.isPremium && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Tu Suscripción Premium</h3>
          <p className="text-gray-700">Actualmente eres usuario Premium.</p>
          <p className="text-gray-700">Tipo de suscripción: <span className="font-bold">{currentUser.subscriptionType === 'trial' ? 'Prueba de 3 días' : currentUser.subscriptionType === 'monthly' ? 'Mensual' : 'Anual'}</span></p>
          <p className="text-gray-700">Fecha de renovación: <span className="font-bold">{getRenewalDate()}</span></p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Selecciona tu Plan</h3>
        <div className="flex justify-around mb-4">
          <button 
            onClick={() => setSubscriptionType('trial')}
            className={`px-4 py-2 rounded-lg font-medium ${subscriptionType === 'trial' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            3 Días Prueba
          </button>
          <button 
            onClick={() => setSubscriptionType('monthly')}
            className={`px-4 py-2 rounded-lg font-medium ${subscriptionType === 'monthly' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Mensual (S/.28.90)
          </button>
          <button 
            onClick={() => setSubscriptionType('annual')}
            className={`px-4 py-2 rounded-lg font-medium ${subscriptionType === 'annual' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Anual (S/.294.78)
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Método de Pago</h3>
        <div className="space-y-3 mb-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="card" 
              checked={paymentMethod === 'card'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="mr-2"
            /> Tarjeta de Crédito/Débito
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="googlePay" 
              checked={paymentMethod === 'googlePay'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="mr-2"
            /> Google Pay
          </label>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-3 mb-4">
            <input 
              type="text" 
              placeholder="Número de Tarjeta" 
              value={cardDetails.number} 
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input 
              type="text" 
              placeholder="Nombre en la Tarjeta" 
              value={cardDetails.name} 
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex space-x-3">
              <input 
                type="text" 
                placeholder="MM/AA" 
                value={cardDetails.expiry} 
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} 
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input 
                type="text" 
                placeholder="CVV" 
                value={cardDetails.cvv} 
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} 
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <button
          onClick={handleUpgrade}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          {subscriptionType === 'trial' ? 'Activar Prueba Gratis de 3 Días' : `Suscribirse ${subscriptionType === 'monthly' ? 'Mensual' : 'Anual'}`}
        </button>
      </div>
    </div>
  );
};

export default PremiumScreen;