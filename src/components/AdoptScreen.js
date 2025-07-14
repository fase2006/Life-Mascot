import React, { useState } from 'react';
import BackButton from './BackButton';
import { getAdoptablePets, addAdoptablePet, removeAdoptablePet } from '../mock/adoptablePets';

const AdoptScreen = ({ currentUser, onBack, onStartChat }) => {
  const [filters, setFilters] = useState({ type: '', breed: '', age: '' });
  const [adoptablePets, setAdoptablePets] = useState(getAdoptablePets(filters));
  const [showAddForm, setShowAddForm] = useState(false);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petOtherType, setPetOtherType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petAgeUnit, setPetAgeUnit] = useState('años');
  const [petBreed, setPetBreed] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [petPhotoFile, setPetPhotoFile] = useState(null);
  const [petPhotoPreview, setPetPhotoPreview] = useState('');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setAdoptablePets(getAdoptablePets({ ...filters, [name]: value }));
  };

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

  const handleAddAdoptablePet = () => {
    if (!petName || !petType || !petAge || !petBreed || !petDescription || !petPhotoPreview || (petType === 'Otro' && !petOtherType)) {
      alert('Por favor, llena todos los campos y sube una foto.');
      return;
    }
    const newPet = {
      id: Date.now(),
      rescuerId: currentUser.id,
      name: petName,
      type: petType === 'Otro' ? petOtherType : petType,
      age: `${petAge} ${petAgeUnit}`,
      breed: petBreed,
      description: petDescription,
      photo: petPhotoPreview,
      rescuerName: currentUser.name,
      vetName: currentUser.vetName
    };
    addAdoptablePet(newPet);
    setAdoptablePets(getAdoptablePets(filters));
    resetForm();
    setShowAddForm(false);
  };

  const handleRemoveAdoptablePet = (petId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mascota de la lista de adopción?')) {
      removeAdoptablePet(petId);
      setAdoptablePets(getAdoptablePets(filters));
    }
  };

  const resetForm = () => {
    setPetName('');
    setPetType('');
    setPetOtherType('');
    setPetAge('');
    setPetAgeUnit('años');
    setPetBreed('');
    setPetDescription('');
    setPetPhotoFile(null);
    setPetPhotoPreview('');
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mascotas para Adoptar</h2>

      {currentUser.type === 'rescatista' && (
        <button 
          onClick={() => { setShowAddForm(true); resetForm(); }}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-6"
        >
          Subir Mascota para Adopción
        </button>
      )}

      {showAddForm && currentUser.type === 'rescatista' && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Subir Mascota para Adopción</h3>
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
          <textarea 
            placeholder="Descripción de la mascota" 
            value={petDescription} 
            onChange={(e) => setPetDescription(e.target.value)} 
            rows="3"
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          ></textarea>
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
          <div className="flex space-x-3">
            <button 
              onClick={handleAddAdoptablePet}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Subir para Adopción
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

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Filtros de Búsqueda</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
            <select 
              id="filter-type" 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-breed" className="block text-gray-700 text-sm font-bold mb-2">Raza:</label>
            <input 
              type="text" 
              id="filter-breed" 
              name="breed" 
              value={filters.breed} 
              onChange={handleFilterChange}
              placeholder="Ej. Labrador"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="filter-age" className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
            <select 
              id="filter-age" 
              name="age" 
              value={filters.age} 
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Cualquiera</option>
              <option value="joven">Joven (0-2 años)</option>
              <option value="adulto">Adulto (3-7 años)</option>
              <option value="senior">Senior (8+ años)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {adoptablePets.length === 0 ? (
          <p className="text-center text-gray-500">No hay mascotas disponibles para adopción con estos filtros.</p>
        ) : (
          adoptablePets.map(pet => (
            <div key={pet.id} className="bg-white rounded-xl shadow-md p-4">
              <img src={pet.photo} alt={pet.name} className="w-full h-48 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
              <p className="text-gray-600 text-sm">{pet.breed} • {pet.age}</p>
              <p className="text-gray-700 mt-2 text-sm">{pet.description}</p>
              <p className="text-gray-500 text-xs mt-2">Publicado por: {pet.rescuerName} ({pet.vetName})</p>
              {currentUser.type === 'rescatista' && currentUser.id === pet.rescuerId && (
                <button 
                  onClick={() => handleRemoveAdoptablePet(pet.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg mt-3 hover:bg-red-600 transition-colors"
                >
                  Eliminar de Adopción
                </button>
              )}
              {currentUser.type === 'adoptante' && (
                <button 
                  onClick={() => onStartChat(pet.rescuerId, `¡Me interesa la mascota ${pet.name}! ¿Podemos hablar sobre la adopción?`)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3 hover:bg-orange-600 transition-colors"
                >
                  ¡Me interesa!
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdoptScreen;