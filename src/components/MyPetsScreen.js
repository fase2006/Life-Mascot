import React, { useState } from 'react';
import { addPet, updatePet, getPetsByUser } from '../mock/pets';
import BackButton from './BackButton';

const MyPetsScreen = ({ currentUser, onBack }) => {
  const [pets, setPets] = useState(getPetsByUser(currentUser.id));
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petOtherType, setPetOtherType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petAgeUnit, setPetAgeUnit] = useState('años');
  const [petBreed, setPetBreed] = useState('');
  const [petPhotoFile, setPetPhotoFile] = useState(null);
  const [petPhotoPreview, setPetPhotoPreview] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [foodSchedule, setFoodSchedule] = useState([]);
  const [walkSchedule, setWalkSchedule] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetPhotoFile(file);
      setPetPhotoPreview(URL.createObjectURL(file));
    } else {
      setPetPhotoFile(null);
      setPetPhotoPreview('');
    }
  };

  const handleAddPet = () => {
    if (!petName || !petType || !petAge || !petBreed || (petType === 'Otro' && !petOtherType)) {
      alert('Por favor, llena todos los campos.');
      return;
    }
    const newPet = {
      id: Date.now(),
      ownerId: currentUser.id,
      name: petName,
      type: petType === 'Otro' ? petOtherType : petType,
      age: `${petAge} ${petAgeUnit}`,
      breed: petBreed,
      photo: petPhotoPreview || 'https://via.placeholder.com/150',
      moodHistory: [],
      foodSchedule: [],
      walkSchedule: []
    };
    addPet(newPet);
    setPets(getPetsByUser(currentUser.id));
    resetForm();
    setShowAddForm(false);
  };

  const handleUpdatePet = () => {
    if (!petName || !petType || !petAge || !petBreed || (petType === 'Otro' && !petOtherType)) {
      alert('Por favor, llena todos los campos.');
      return;
    }
    const updatedPet = {
      ...editingPet,
      name: petName,
      type: petType === 'Otro' ? petOtherType : petType,
      age: `${petAge} ${petAgeUnit}`,
      breed: petBreed,
      photo: petPhotoPreview || 'https://via.placeholder.com/150',
      moodHistory: moodHistory,
      foodSchedule: foodSchedule,
      walkSchedule: walkSchedule
    };
    updatePet(updatedPet);
    setPets(getPetsByUser(currentUser.id));
    resetForm();
    setEditingPet(null);
    setShowAddForm(false);
  };

  const handleEditClick = (pet) => {
    setEditingPet(pet);
    setPetName(pet.name);
    setPetType(pet.type);
    if (!['Perro', 'Gato'].includes(pet.type)) {
      setPetType('Otro');
      setPetOtherType(pet.type);
    }
    const [ageValue, ageUnit] = pet.age.split(' ');
    setPetAge(ageValue);
    setPetAgeUnit(ageUnit);
    setPetBreed(pet.breed);
    setPetPhotoPreview(pet.photo);
    setPetPhotoFile(null); // Clear file input
    setMoodHistory(pet.moodHistory || []);
    setFoodSchedule(pet.foodSchedule || []);
    setWalkSchedule(pet.walkSchedule || []);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setPetName('');
    setPetType('');
    setPetOtherType('');
    setPetAge('');
    setPetAgeUnit('años');
    setPetBreed('');
    setPetPhotoFile(null);
    setPetPhotoPreview('');
    setMoodHistory([]);
    setFoodSchedule([]);
    setWalkSchedule([]);
  };

  const moodOptions = [
    { value: 'Feliz', emoji: '😁' },
    { value: 'Energético', emoji: '😜' },
    { value: 'Molesto', emoji: '😡' },
    { value: 'Cansado', emoji: '😴' },
    { value: 'Asustado', emoji: '😨' },
    { value: 'Triste', emoji: '😓' },
    { value: 'Durmiendo', emoji: '😴' },
    { value: 'Enfermo', emoji: '🤒' }
  ];

  const foodOptions = [
    { value: 'Croquetas', label: 'Croquetas' },
    { value: 'Comida Húmeda', label: 'Comida Húmeda' },
    { value: 'Agua', label: 'Agua' },
    { value: 'Snacks', label: 'Snacks' },
    { value: 'Otros', label: 'Otros (especificar)' }
  ];

  const handleAddMood = (mood) => {
    setMoodHistory([...moodHistory, { date: new Date().toLocaleDateString(), mood }]);
  };

  const handleAddFood = (time, type) => {
    setFoodSchedule([...foodSchedule, { time, type }]);
  };

  const handleAddWalk = (time, duration) => {
    setWalkSchedule([...walkSchedule, { time, duration }]);
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mis Mascotas</h2>

      <button 
        onClick={() => { setShowAddForm(true); setEditingPet(null); resetForm(); }}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-6"
      >
        Añadir Nueva Mascota
      </button>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingPet ? 'Modificar Mascota' : 'Añadir Mascota'}</h3>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={petName} 
            onChange={(e) => setPetName(e.target.value)} 
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select 
            value={petType} 
            onChange={(e) => { setPetType(e.target.value); if (e.target.value !== 'Otro') setPetOtherType(''); }} 
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Tipo de Mascota</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>
          {petType === 'Otro' && (
            <input 
              type="text" 
              placeholder="Especificar tipo de mascota" 
              value={petOtherType} 
              onChange={(e) => setPetOtherType(e.target.value)} 
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <div className="flex mb-3 space-x-2">
            <input 
              type="number" 
              placeholder="Edad" 
              value={petAge} 
              onChange={(e) => setPetAge(e.target.value)} 
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select 
              value={petAgeUnit} 
              onChange={(e) => setPetAgeUnit(e.target.value)} 
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="años">años</option>
              <option value="meses">meses</option>
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Raza" 
            value={petBreed} 
            onChange={(e) => setPetBreed(e.target.value)} 
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subir Foto:
          </label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {petPhotoPreview && (
            <div className="mb-4 text-center">
              <img src={petPhotoPreview} alt="Previsualización" className="max-w-full h-32 object-contain mx-auto rounded-lg" />
            </div>
          )}

          {editingPet && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Historial y Horarios</h4>
              
              <div className="mb-4">
                <h5 className="font-medium mb-2">Estado de Ánimo</h5>
                <div className="flex flex-wrap gap-2 mb-2">
                  {moodOptions.map(option => (
                    <button 
                      key={option.value} 
                      onClick={() => handleAddMood(option.value)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {option.value} {option.emoji}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                  {moodHistory.length === 0 ? <p className="text-sm text-gray-500">Sin registros de ánimo.</p> :
                    moodHistory.map((entry, idx) => <p key={idx} className="text-sm">{entry.date}: {entry.mood}</p>)}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2">Horario de Comida/Bebida</h5>
                <div className="flex space-x-2 mb-2">
                  <input type="time" id="food-time" className="w-1/2 px-3 py-1 border rounded-lg" />
                  <select id="food-type" className="w-1/2 px-3 py-1 border rounded-lg">
                    {foodOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => handleAddFood(document.getElementById('food-time').value, document.getElementById('food-type').value)} className="w-full bg-green-100 text-green-700 py-2 rounded-lg mb-2 hover:bg-green-200">
                  Añadir Comida/Bebida
                </button>
                <div className="bg-gray-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                  {foodSchedule.length === 0 ? <p className="text-sm text-gray-500">Sin horarios de comida/bebida.</p> :
                    foodSchedule.map((entry, idx) => <p key={idx} className="text-sm">{entry.time}: {entry.type}</p>)}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2">Horario de Paseo</h5>
                <div className="flex space-x-2 mb-2">
                  <input type="time" id="walk-time" className="w-1/2 px-3 py-1 border rounded-lg" />
                  <input type="text" id="walk-duration" placeholder="Duración (ej. 30 min)" className="w-1/2 px-3 py-1 border rounded-lg" />
                </div>
                <button onClick={() => handleAddWalk(document.getElementById('walk-time').value, document.getElementById('walk-duration').value)} className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg mb-2 hover:bg-purple-200">
                  Añadir Paseo
                </button>
                <div className="bg-gray-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                  {walkSchedule.length === 0 ? <p className="text-sm text-gray-500">Sin horarios de paseo.</p> :
                    walkSchedule.map((entry, idx) => <p key={idx} className="text-sm">{entry.time}: {entry.duration}</p>)}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button 
              onClick={editingPet ? handleUpdatePet : handleAddPet}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {editingPet ? 'Guardar Cambios' : 'Añadir Mascota'}
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {pets.length === 0 ? (
          <p className="text-center text-gray-500">Aún no tienes mascotas registradas. ¡Añade una!</p>
        ) : (
          pets.map(pet => (
            <div key={pet.id} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img src={pet.photo} alt={pet.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                  <p className="text-gray-600 text-sm">{pet.breed} • {pet.type} • {pet.age}</p>
                </div>
                <button 
                  onClick={() => handleEditClick(pet)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Estado de Ánimo</h4>
                  <div className="bg-gray-50 p-2 rounded-lg max-h-20 overflow-y-auto text-sm">
                    {pet.moodHistory && pet.moodHistory.length > 0 ? 
                      pet.moodHistory.map((entry, idx) => <p key={idx}>{entry.date}: {entry.mood}</p>) : 
                      <p className="text-gray-500">Sin registros de ánimo.</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Horario de Comida/Bebida</h4>
                  <div className="bg-gray-50 p-2 rounded-lg max-h-20 overflow-y-auto text-sm">
                    {pet.foodSchedule && pet.foodSchedule.length > 0 ? 
                      pet.foodSchedule.map((entry, idx) => <p key={idx}>{entry.time}: {entry.type}</p>) : 
                      <p className="text-gray-500">Sin horarios de comida/bebida.</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Horario de Paseo</h4>
                  <div className="bg-gray-50 p-2 rounded-lg max-h-20 overflow-y-auto text-sm">
                    {pet.walkSchedule && pet.walkSchedule.length > 0 ? 
                      pet.walkSchedule.map((entry, idx) => <p key={idx}>{entry.time}: {entry.duration}</p>) : 
                      <p className="text-gray-500">Sin horarios de paseo.</p>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPetsScreen;