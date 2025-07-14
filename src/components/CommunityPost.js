import React from 'react';

const CommunityPost = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center mr-3">
          <span className="text-emerald-800 font-bold">{post.user.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-medium">{post.user}</h4>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="mb-3">{post.content}</p>
      <div className="flex text-sm text-gray-500 space-x-4">
        <button className="flex items-center hover:text-emerald-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
        <button className="flex items-center hover:text-emerald-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Comentar
        </button>
        <button className="flex items-center hover:text-emerald-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Compartir
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;