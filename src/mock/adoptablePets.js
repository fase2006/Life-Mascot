let adoptablePets = JSON.parse(localStorage.getItem('adoptablePets')) || [];

const saveAdoptablePets = () => {
  localStorage.setItem('adoptablePets', JSON.stringify(adoptablePets));
};

export const addAdoptablePet = (pet) => {
  adoptablePets.push(pet);
  saveAdoptablePets();
};

export const removeAdoptablePet = (petId) => {
  const index = adoptablePets.findIndex(pet => pet.id === petId);
  if (index !== -1) {
    adoptablePets.splice(index, 1);
    saveAdoptablePets();
  }
};

export const getAdoptablePets = (filters = {}) => {
  let filteredPets = adoptablePets;

  if (filters.type) {
    filteredPets = filteredPets.filter(pet => pet.type === filters.type);
  }
  if (filters.breed) {
    filteredPets = filteredPets.filter(pet => pet.breed.toLowerCase().includes(filters.breed.toLowerCase()));
  }
  if (filters.age) {
    filteredPets = filteredPets.filter(pet => {
      const [ageValue, ageUnit] = pet.age.split(' ');
      if (filters.age === 'joven' && (ageUnit === 'meses' || (ageUnit === 'años' && parseInt(ageValue) < 3))) return true;
      if (filters.age === 'adulto' && (ageUnit === 'años' && parseInt(ageValue) >= 3 && parseInt(ageValue) < 8)) return true;
      if (filters.age === 'senior' && (ageUnit === 'años' && parseInt(ageValue) >= 8)) return true;
      return false;
    });
  }
  // Add more filters as needed (size, location, etc.)

  return filteredPets;
};

export default adoptablePets;