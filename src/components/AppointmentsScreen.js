import React, { useState } from 'react';
import BackButton from './BackButton';
import { getAppointmentsByUser, cancelAppointment } from '../mock/appointments';
import { getUserById } from '../mock/users';
import { getPetsByUser } from '../mock/pets';

const AppointmentsScreen = ({ currentUser, onBack }) => {
  const [appointments, setAppointments] = useState(getAppointmentsByUser(currentUser.id));

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('¿Estás seguro de cancelar esta cita?')) {
      cancelAppointment(appointmentId);
      setAppointments(getAppointmentsByUser(currentUser.id));
      alert('Cita cancelada. Se notificará a la veterinaria.');
    }
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mis Citas</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No tienes citas agendadas.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => {
            const vet = getUserById(app.vetId);
            const pet = getPetsByUser(currentUser.id).find(p => p.id === app.petId);
            return (
              <div key={app.id} className="bg-white rounded-xl shadow-md p-4">
                <p className="font-semibold text-gray-800">Cita de la {vet ? vet.vetName : 'Veterinaria Desconocida'}</p>
                <p className="text-gray-700 text-sm">Para la mascota: {pet ? pet.name : 'Mascota Desconocida'}</p>
                <p className="text-gray-700 text-sm">Fecha: {app.date} a las {app.time}</p>
                <p className="text-gray-700 text-sm">Motivo: {app.reason}</p>
                <p className="text-gray-700 text-sm">Estado: <span className="font-bold text-orange-500">{app.status}</span></p>
                <button 
                  onClick={() => handleCancelAppointment(app.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg mt-3 hover:bg-red-600 transition-colors"
                >
                  Cancelar Cita
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsScreen;