import React, { useState } from 'react';

const HealthTracker = ({ petId }) => {
  const [activeTab, setActiveTab] = useState('vaccines');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'vaccines' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('vaccines')}
        >
          Vacunas
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'meals' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('meals')}
        >
          Alimentación
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'meds' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('meds')}
        >
          Medicamentos
        </button>
      </div>
      
      {activeTab === 'vaccines' && (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <h4 className="font-medium">Rabia</h4>
            <p className="text-sm text-gray-600">Próxima dosis: 2023-12-10</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <h4 className="font-medium">Moquillo</h4>
            <p className="text-sm text-gray-600">Completo hasta 2024-06-15</p>
          </div>
        </div>
      )}

      {activeTab === 'meals' && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div>
                <h4 className="font-medium">Comida {i}</h4>
                <p className="text-sm text-gray-600">08:00 AM • Croquetas premium</p>
              </div>
              <button className="text-emerald-600 hover:text-emerald-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthTracker;