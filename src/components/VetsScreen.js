import React, { useState } from 'react';
import BackButton from './BackButton';
import { getPetsByUser } from '../mock/pets';
import { getUserById } from '../mock/users';
import { addAppointment } from '../mock/appointments';

const VetsScreen = ({ currentUser, onBack, onStartChat }) => {
  const vets = [
    { id: 101, name: "Clínica Veterinaria Patitas Felices", address: "Av. Siempre Viva 123", phone: "55-1234-5678", rating: 4.8 },
    { id: 102, name: "Hospital Veterinario Central", address: "Calle del Perro 45", phone: "55-8765-4321", rating: 4.5 },
    { id: 103, name: "Consultorio Dr. Peludo", address: "Blvd. Gatuno 789", phone: "55-1122-3344", rating: 4.9 }
  ];

  const userPets = getPetsByUser(currentUser.id);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [selectedPetForAppointment, setSelectedPetForAppointment] = useState(userPets.length > 0 ? userPets[0].id : null);

  const handleScheduleAppointment = () => {
    if (!selectedVet || !appointmentDate || !appointmentTime || !selectedPetForAppointment) {
      alert('Por favor, completa todos los campos para agendar la cita.');
      return;
    }
    const pet = userPets.find(p => p.id === selectedPetForAppointment);
    
    const newAppointment = {
      id: Date.now(),
      ownerId: currentUser.id,
      vetId: selectedVet.id,
      vetName: selectedVet.name,
      petId: pet.id,
      petName: pet.name,
      date: appointmentDate,
      time: appointmentTime,
      reason: appointmentReason || 'No especificado',
      status: 'Pendiente'
    };
    addAppointment(newAppointment);

    alert(`Cita agendada con ${selectedVet.name} para ${pet.name} el ${appointmentDate} a las ${appointmentTime}.`);
    setShowAppointmentForm(false);
    setSelectedVet(null);
    setAppointmentDate('');
    setAppointmentTime('');
    setAppointmentReason('');
    setSelectedPetForAppointment(userPets.length > 0 ? userPets[0].id : null);
  };

  const handleContactVet = (vetId) => {
    const vetUser = getUserById(vetId);
    if (vetUser) {
      onStartChat(vetUser.id);
    } else {
      alert('No se pudo iniciar el chat con esta veterinaria.');
    }
  };

  const handlePetSelectionForAppointment = (petId) => {
    setSelectedPetForAppointment(petId);
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Veterinarias</h2>

      <div className="space-y-4">
        {vets.map(vet => (
          <div key={vet.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800">{vet.name}</h3>
            <p className="text-gray-600 text-sm">{vet.address}</p>
            <p className="text-gray-600 text-sm">Tel: {vet.phone}</p>
            <p className="text-gray-600 text-sm">Calificación: {vet.rating} ⭐</p>
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => { setSelectedVet(vet); setShowAppointmentForm(true); }}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
              >
                Agendar Cita
              </button>
              <button 
                onClick={() => handleContactVet(vet.id)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Contactar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAppointmentForm && selectedVet && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Nueva Cita con {selectedVet.name}</h3>
          
          <label htmlFor="select-pet-appointment" className="block text-gray-700 text-sm font-bold mb-2">
            Seleccionar Mascota:
          </label>
          <select
            id="select-pet-appointment"
            value={selectedPetForAppointment || ''}
            onChange={(e) => handlePetSelectionForAppointment(parseInt(e.target.value))}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {userPets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
          </select>

          <label htmlFor="service-type" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Servicio:</label>
          <select id="service-type" className="w-full px-4 py-2 mb-3 border rounded-lg">
            <option value="">Seleccionar</option>
            <option value="Consulta General">Consulta General</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Desparasitación">Desparasitación</option>
            <option value="Emergencia">Emergencia</option>
            <option value="Estética">Estética</option>
            <option value="Otro">Otro</option>
          </select>

          <label htmlFor="appointment-reason" className="block text-gray-700 text-sm font-bold mb-2">Motivo (opcional):</label>
          <textarea id="appointment-reason" value={appointmentReason} onChange={(e) => setAppointmentReason(e.target.value)} placeholder="Motivo de la cita" rows="3" className="w-full px-4 py-2 mb-3 border rounded-lg resize-none"></textarea>
          
          <label htmlFor="appointment-date" className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
          <input type="date" id="appointment-date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded-lg" />
          
          <label htmlFor="appointment-time" className="block text-gray-700 text-sm font-bold mb-2">Hora:</label>
          <input type="time" id="appointment-time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-lg" />

          <button
            onClick={handleScheduleAppointment}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Confirmar Cita
          </button>
          <button
            onClick={() => setShowAppointmentForm(false)}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors mt-2"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Mapa de Veterinarias en Piura</h3>
        <iframe
          src="https://www.google.com.pe/maps/embed?pb=!1m18!1m12!1m3!1d3979.999999999999!2d-80.6660264!3d-5.1681463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMDQuMyJTIDgwwrAzOSc1Ny43Ilc!5e0!3m2!1ses-419!2spe!4v1678901234567!5m2!1ses-419!2spe"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Veterinarias en Piura"
          className="rounded-xl shadow-md"
        ></iframe>
      </div>
    </div>
  );
};

export default VetsScreen;