import React, { useState } from 'react';
import { getUserById } from '../mock/users';
import { deleteStory } from '../mock/stories';

const StoryCard = ({ story, onLikeToggle, onCommentSubmit, onProfileClick, currentUserId, onStoryDelete }) => {
  const [commentText, setCommentText] = useState('');
  const hasLiked = story.likedBy.includes(currentUserId);

  const handleLikeClick = () => {
    onLikeToggle(story.id, currentUserId, !hasLiked);
  };

  const handleCommentSubmitLocal = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(story.id, { text: commentText, time: new Date().toLocaleTimeString() });
      setCommentText('');
    }
  };

  const handleDeleteStory = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      onStoryDelete(story.id);
    }
  };

  const commenterUser = getUserById(story.userId);
  const commenterNameClass = commenterUser?.isPremium ? 'text-amber-500' : 'text-gray-800';

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
      <div className="flex items-center mb-3">
        <button onClick={() => onProfileClick(story.userId)} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
            <span className="text-amber-800 font-bold">{story.user.charAt(0)}</span>
          </div>
          <div>
            <h4 className={`font-medium ${commenterNameClass}`}>{story.user} {commenterUser?.isPremium && '✨'}</h4>
            <p className="text-xs text-gray-500">{story.time}</p>
          </div>
        </button>
        {story.userId === currentUserId && (
          <button onClick={handleDeleteStory} className="ml-auto text-red-500 hover:text-red-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        )}
      </div>
      <p className="mb-3">{story.content}</p>
      {story.image && (
        <img 
          src={story.image} 
          alt="Historia" 
          className="w-full h-40 object-cover rounded-lg mb-3"
          onClick={() => window.open(story.image, '_blank')} // Open image in new tab
        />
      )}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <button 
          className={`flex items-center hover:text-orange-500 ${hasLiked ? 'text-red-500' : ''}`}
          onClick={handleLikeClick}
        >
          <span className="mr-1">{hasLiked ? '❤️' : '🤍'}</span> {story.likes} Me gusta
        </button>
        <span className="text-gray-500">{story.comments.length} Comentarios</span>
      </div>

      {/* Comments Section */}
      {story.comments.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          {story.comments.map((comment, index) => {
            const commentUser = getUserById(comment.userId);
            const commentUserNameClass = commentUser?.isPremium ? 'text-amber-500' : 'text-gray-800';
            return (
              <div key={index} className="mb-2 text-sm">
                <button onClick={() => onProfileClick(comment.userId)} className={`font-semibold hover:underline ${commentUserNameClass}`}>
                  {comment.user}:
                </button> {comment.text} <span className="text-gray-400 text-xs">({comment.time})</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmitLocal} className="mt-3 flex">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors text-sm"
        >
          Comentar
        </button>
      </form>
    </div>
  );
};

export default StoryCard;