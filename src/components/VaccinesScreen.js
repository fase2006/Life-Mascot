import React, { useState } from 'react';
import BackButton from './BackButton';
import { getPetsByUser } from '../mock/pets';
import { addVaccine, getVaccinesByPet } from '../mock/vaccines';

const VaccinesScreen = ({ currentUser, onBack }) => {
  const userPets = getPetsByUser(currentUser.id);
  const [selectedPetId, setSelectedPetId] = useState(userPets.length > 0 ? userPets[0].id : null);
  const [vaccineName, setVaccineName] = useState('');
  const [vaccineDate, setVaccineDate] = useState('');
  const [vaccineTime, setVaccineTime] = useState('');
  const [vaccineNextDate, setVaccineNextDate] = useState('');

  const handleAddVaccine = () => {
    if (!selectedPetId || !vaccineName || !vaccineDate || !vaccineTime) {
      alert('Por favor, selecciona una mascota y llena los campos de la vacuna.');
      return;
    }
    const newVaccine = {
      id: Date.now(),
      petId: selectedPetId,
      name: vaccineName,
      date: vaccineDate,
      time: vaccineTime,
      nextDate: vaccineNextDate || 'N/A'
    };
    addVaccine(newVaccine);
    setVaccineName('');
    setVaccineDate('');
    setVaccineTime('');
    setVaccineNextDate('');
    alert('Vacuna registrada con éxito!');
  };

  const currentPetVaccines = selectedPetId ? getVaccinesByPet(selectedPetId) : [];

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vacunas</h2>

      {userPets.length === 0 ? (
        <p className="text-center text-gray-500">No tienes mascotas registradas para asignar vacunas.</p>
      ) : (
        <>
          <div className="mb-6">
            <label htmlFor="select-pet" className="block text-gray-700 text-sm font-bold mb-2">
              Seleccionar Mascota:
            </label>
            <select
              id="select-pet"
              value={selectedPetId || ''}
              onChange={(e) => setSelectedPetId(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {userPets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.name}</option>
              ))}
            </select>
          </div>

          {selectedPetId && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Registrar Nueva Vacuna</h3>
              <input
                type="text"
                placeholder="Nombre de la vacuna (ej. Rabia)"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <label htmlFor="vaccine-date" className="block text-gray-700 text-sm font-bold mb-2">
                Fecha de aplicación:
              </label>
              <input
                type="date"
                id="vaccine-date"
                value={vaccineDate}
                onChange={(e) => setVaccineDate(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <label htmlFor="vaccine-time" className="block text-gray-700 text-sm font-bold mb-2">
                Hora de aplicación:
              </label>
              <input
                type="time"
                id="vaccine-time"
                value={vaccineTime}
                onChange={(e) => setVaccineTime(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <label htmlFor="vaccine-next-date" className="block text-gray-700 text-sm font-bold mb-2">
                Próxima fecha (opcional):
              </label>
              <input
                type="date"
                id="vaccine-next-date"
                value={vaccineNextDate}
                onChange={(e) => setVaccineNextDate(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleAddVaccine}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Registrar Vacuna
              </button>
            </div>
          )}

          {selectedPetId && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Historial de Vacunas de {userPets.find(p => p.id === selectedPetId)?.name}</h3>
              {currentPetVaccines.length === 0 ? (
                <p className="text-center text-gray-500">No hay vacunas registradas para esta mascota.</p>
              ) : (
                <div className="space-y-3">
                  {currentPetVaccines.map(vaccine => (
                    <div key={vaccine.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                      <p className="text-sm text-gray-600">Aplicada: {vaccine.date} a las {vaccine.time}</p>
                      <p className="text-sm text-gray-600">Próxima: {vaccine.nextDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VaccinesScreen;