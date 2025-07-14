import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import { getMessagesBetweenUsers, getUnreadMessagesCount, markMessagesAsRead } from '../mock/messages';
import { getUserById, getAllUsers } from '../mock/users';

const ChatListScreen = ({ currentUser, onBack, onSelectChat }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const allUsers = getAllUsers(); 
    const uniqueChatPartners = new Set();
    const tempConversations = [];

    allUsers.forEach(user => {
      if (user.id !== currentUser.id) {
        const messages = getMessagesBetweenUsers(currentUser.id, user.id);
        if (messages.length > 0) {
          uniqueChatPartners.add(user.id);
        }
      }
    });

    uniqueChatPartners.forEach(partnerId => {
      const partner = getUserById(partnerId);
      if (partner) {
        const messages = getMessagesBetweenUsers(currentUser.id, partnerId);
        const unreadCount = messages.filter(msg => msg.receiverId === currentUser.id && !msg.read).length;
        tempConversations.push({
          partner: partner,
          lastMessage: messages[messages.length - 1]?.text || '',
          unreadCount: unreadCount
        });
      }
    });
    setConversations(tempConversations);
  }, [currentUser.id]);

  const handleChatClick = (partnerId) => {
    markMessagesAsRead(currentUser.id, partnerId);
    onSelectChat(partnerId);
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Chats</h2>

      {conversations.length === 0 ? (
        <p className="text-center text-gray-500">No tienes conversaciones activas.</p>
      ) : (
        <div className="space-y-3">
          {conversations.map(conv => (
            <button 
              key={conv.partner.id} 
              onClick={() => handleChatClick(conv.partner.id)}
              className="w-full bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
            >
              <img src={conv.partner.profilePhoto || 'https://via.placeholder.com/50'} alt="Perfil" className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">{conv.partner.name}</h3>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatListScreen;