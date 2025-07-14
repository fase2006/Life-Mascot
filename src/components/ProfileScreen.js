import React, { useState } from 'react';
import BackButton from './BackButton';
import { getPetsByUser } from '../mock/pets';
import { updateUser } from '../mock/users';

const ProfileScreen = ({ currentUser, onBack, isMyProfile = false, onUpdateProfile }) => {
  const [user, setUser] = useState(currentUser);
  const [editMode, setEditMode] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(user.profilePhoto || 'https://via.placeholder.com/150');
  const [nickname, setNickname] = useState(user.nickname || '');
  const [description, setDescription] = useState(user.description || '');

  const userPets = getPetsByUser(user.id);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    } else {
      setProfilePhotoFile(null);
      setProfilePhotoPreview(user.profilePhoto || 'https://via.placeholder.com/150');
    }
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      nickname: nickname.startsWith('@') ? nickname : `@${nickname}`,
      description: description,
      profilePhoto: profilePhotoPreview
    };
    updateUser(updatedUser);
    setUser(updatedUser);
    onUpdateProfile(updatedUser); // Notify App.js to update currentUser
    setEditMode(false);
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil</h2>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="relative w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-200">
          <img 
            src={profilePhotoPreview} 
            alt="Foto de Perfil" 
            className="w-full h-full object-cover" 
          />
          {isMyProfile && editMode && (
            <label htmlFor="profile-photo-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input id="profile-photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>
        
        {editMode ? (
          <>
            <input 
              type="text" 
              value={user.name} 
              readOnly 
              className="w-full text-2xl font-bold text-gray-800 text-center mb-1 bg-transparent border-none focus:outline-none"
            />
            <input 
              type="text" 
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
              placeholder="@apodo"
              className="w-full text-gray-600 text-center mb-4 bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
            ></input>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Escribe una descripción (máx. 150 palabras)"
              maxLength="150"
              rows="4"
              className="w-full text-gray-700 text-sm text-center mb-4 bg-gray-100 rounded-lg px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
            ></textarea>
            <button onClick={handleSaveProfile} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
              Guardar Cambios
            </button>
            <button onClick={() => setEditMode(false)} className="ml-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800">{user.name} {user.isPremium && <span className="ml-2 text-amber-500">Premium ✨</span>}</h3>
            <p className="text-gray-600 mb-4">{user.nickname}</p>
            <p className="text-gray-700 text-sm mb-4">{user.description || 'Sin descripción.'}</p>
            {isMyProfile && (
              <button onClick={() => setEditMode(true)} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Editar Perfil
              </button>
            )}
          </>
        )}

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Información Adicional</h4>
          <p className="text-gray-700">Tipo de Usuario: <span className="font-medium">{user.type === 'adoptante' ? 'Adoptante' : `Rescatista (${user.vetName})`}</span></p>
          <p className="text-gray-700">Mascotas Registradas: <span className="font-medium">{userPets.length}</span></p>
          <p className="text-gray-700">Registrado el: <span className="font-medium">{user.registeredDate}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;