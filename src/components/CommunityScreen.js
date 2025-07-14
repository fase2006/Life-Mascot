import React, { useState } from 'react';
import StoryCard from './StoryCard';
import storiesData, { updateStoryLikes, addStory, addStoryComment, deleteStory } from '../mock/stories';
import BackButton from './BackButton';

const CommunityScreen = ({ onBack, currentUser, onProfileClick }) => {
  const [stories, setStories] = useState(storiesData);
  const [newStoryContent, setNewStoryContent] = useState('');
  const [newStoryImage, setNewStoryImage] = useState(null);
  const [newStoryImagePreview, setNewStoryImagePreview] = useState('');

  const handleLikeToggle = (storyId, userId, liked) => {
    updateStoryLikes(storyId, userId, liked);
    setStories([...storiesData]); // Forzar re-renderizado
  };

  const handleCommentSubmit = (storyId, comment) => {
    addStoryComment(storyId, { ...comment, user: currentUser.name, userId: currentUser.id });
    setStories([...storiesData]); // Forzar re-renderizado
  };

  const handleStoryDelete = (storyId) => {
    deleteStory(storyId);
    setStories([...storiesData]);
  };

  const handleNewStoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStoryImage(file);
      setNewStoryImagePreview(URL.createObjectURL(file));
    } else {
      setNewStoryImage(null);
      setNewStoryImagePreview('');
    }
  };

  const handleNewStorySubmit = () => {
    if (newStoryContent.trim() || newStoryImage) {
      const newStory = {
        id: Date.now(),
        user: currentUser.name,
        userId: currentUser.id,
        time: new Date().toLocaleTimeString(),
        content: newStoryContent,
        image: newStoryImagePreview,
        likes: 0,
        likedBy: [],
        comments: []
      };
      addStory(newStory);
      setStories([...storiesData]);
      setNewStoryContent('');
      setNewStoryImage(null);
      setNewStoryImagePreview('');
    }
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Comunidad</h2>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Crear Nueva Historia</h3>
        <textarea
          placeholder="¿Qué hay de nuevo con tu mascota?"
          value={newStoryContent}
          onChange={(e) => setNewStoryContent(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        ></textarea>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Subir Imagen (opcional):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleNewStoryImageChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {newStoryImagePreview && (
          <div className="mb-4 text-center">
            <img src={newStoryImagePreview} alt="Previsualización" className="max-w-full h-32 object-contain mx-auto rounded-lg" />
          </div>
        )}
        <button
          onClick={handleNewStorySubmit}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Publicar Historia
        </button>
      </div>

      <div className="space-y-4">
        {stories.map(story => (
          <StoryCard 
            key={story.id} 
            story={story} 
            onLikeToggle={handleLikeToggle} 
            onCommentSubmit={handleCommentSubmit} 
            onProfileClick={onProfileClick}
            currentUserId={currentUser.id}
            onStoryDelete={handleStoryDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityScreen;