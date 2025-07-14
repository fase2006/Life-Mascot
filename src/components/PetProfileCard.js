import React from 'react';

const PetProfileCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="bg-emerald-100 p-4">
        <h3 className="text-xl font-bold text-emerald-800">{pet.name}</h3>
        <p className="text-emerald-600">{pet.type} • {pet.breed}</p>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Edad</span>
          <span className="font-medium">{pet.age} años</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Peso</span>
          <span className="font-medium">{pet.weight} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Última visita</span>
          <span className="font-medium">{pet.lastVisit}</span>
        </div>
      </div>
      <button className="w-full bg-emerald-500 text-white py-2 hover:bg-emerald-600 transition-colors">
        Ver historial completo
      </button>
    </div>
  );
};

export default PetProfileCard;