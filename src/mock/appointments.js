let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

const saveAppointments = () => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const addAppointment = (appointment) => {
  appointments.push(appointment);
  saveAppointments();
};

export const getAppointmentsByUser = (userId) => {
  return appointments.filter(app => app.ownerId === userId);
};

export const cancelAppointment = (appointmentId) => {
  appointments = appointments.filter(app => app.id !== appointmentId);
  saveAppointments();
};

export default appointments;