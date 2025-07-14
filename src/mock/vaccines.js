let vaccines = JSON.parse(localStorage.getItem('vaccines')) || [];

const saveVaccines = () => {
  localStorage.setItem('vaccines', JSON.stringify(vaccines));
};

export const addVaccine = (vaccine) => {
  vaccines.push(vaccine);
  saveVaccines();
};

export const getVaccinesByPet = (petId) => {
  return vaccines.filter(v => v.petId === petId);
};

export default vaccines;