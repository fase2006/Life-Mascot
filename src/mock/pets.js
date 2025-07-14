let pets = JSON.parse(localStorage.getItem('pets')) || [];

const savePets = () => {
  localStorage.setItem('pets', JSON.stringify(pets));
};

export const addPet = (pet) => {
  pets.push(pet);
  savePets();
};

export const updatePet = (updatedPet) => {
  const index = pets.findIndex(pet => pet.id === updatedPet.id);
  if (index !== -1) {
    pets[index] = updatedPet;
    savePets();
  }
};

export const getPetsByUser = (userId) => {
  return pets.filter(pet => pet.ownerId === userId);
};

export default pets;