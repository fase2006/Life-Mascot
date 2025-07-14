import React from 'react';

const VetConnectCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl shadow-xl text-white p-6">
      <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda profesional?</h3>
      <p className="mb-6">Conéctate con veterinarios certificados en tiempo real</p>
      
      <div className="space-y-3 mb-6">
        <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Video consulta
        </button>
        <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Chat 24/7
        </button>
        <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Clínicas cercanas
        </button>
      </div>
      
      <div className="flex items-center text-sm">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Todos nuestros veterinarios están certificados
      </div>
    </div>
  );
};

export default VetConnectCard;