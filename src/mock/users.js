let users = JSON.parse(localStorage.getItem('users')) || [];

// Add default vet accounts if they don't exist
const defaultVets = [
  { id: 101, name: "Clínica Veterinaria Patitas Felices", email: "vetpatfe@gmail.com", password: "1234", type: "rescatista", vetName: "Clínica Veterinaria Patitas Felices", nickname: "@patitasfelices", profilePhoto: "", description: "", registeredDate: "01/01/2023", isPremium: false },
  { id: 102, name: "Hospital Veterinario Central", email: "vetcen@gmail.com", password: "1234", type: "rescatista", vetName: "Hospital Veterinario Central", nickname: "@vetcentral", profilePhoto: "", description: "", registeredDate: "01/01/2023", isPremium: false },
  { id: 103, name: "Consultorio Dr. Peludo", email: "drpel@gmail.com", password: "1234", type: "rescatista", vetName: "Consultorio Dr. Peludo", nickname: "@drpeludo", profilePhoto: "", description: "", registeredDate: "01/01/2023", isPremium: false },
];

defaultVets.forEach(defaultVet => {
  if (!users.some(user => user.email === defaultVet.email)) {
    users.push(defaultVet);
  }
});

const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const addUser = (user) => {
  users.push(user);
  saveUsers();
};

export const findUser = (email, password) => {
  return users.find(user => user.email === email && user.password === password);
};

export const userExists = (email) => {
  return users.some(user => user.email === email);
};

export const updateUser = (updatedUser) => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers();
  }
};

export const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
  saveUsers();
};

export const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

export const getAllUsers = () => {
  return users;
};

export default users;