import React, { useState, useEffect, useRef } from 'react';
import BackButton from './BackButton';
import { getMessagesBetweenUsers, addMessage, markMessagesAsRead } from '../mock/messages';
import { getUserById } from '../mock/users';

const ChatScreen = ({ currentUser, recipientId, onBack, initialMessage = null }) => {
  const recipient = getUserById(recipientId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [adoptionStatus, setAdoptionStatus] = useState(null); // null, 'pending', 'accepted', 'confirmed'

  useEffect(() => {
    if (recipientId) {
      const currentMessages = getMessagesBetweenUsers(currentUser.id, recipientId);
      setMessages(currentMessages);
      markMessagesAsRead(currentUser.id, recipientId);

      if (initialMessage && currentMessages.length === 0) {
        // Send initial message if provided and no previous messages
        const message = {
          id: Date.now(),
          senderId: currentUser.id,
          receiverId: recipientId,
          text: initialMessage,
          timestamp: Date.now(),
          read: false,
          adoptionStatus: 'pending' // Mark as pending if it's an adoption request
        };
        addMessage(message);
        setMessages(prev => [...prev, message]);
      }
      
      // Check for existing adoption status in messages
      const lastMessage = currentMessages.find(msg => msg.adoptionStatus);
      if (lastMessage) {
        setAdoptionStatus(lastMessage.adoptionStatus);
      }
    }
  }, [currentUser.id, recipientId, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (status = null) => {
    if (newMessage.trim() || status) {
      const message = {
        id: Date.now(),
        senderId: currentUser.id,
        receiverId: recipientId,
        text: newMessage,
        timestamp: Date.now(),
        read: false,
        adoptionStatus: status
      };
      addMessage(message);
      setMessages(getMessagesBetweenUsers(currentUser.id, recipientId));
      setNewMessage('');
      if (status) setAdoptionStatus(status);
    }
  };

  const handleAcceptPet = () => {
    handleSendMessage('accepted');
  };

  const handleConfirmAcceptance = () => {
    handleSendMessage('confirmed');
  };

  const handleFinalizeChat = () => {
    // Logic to finalize chat, maybe archive it
    alert('Chat finalizado.');
    onBack();
  };

  if (!recipient) {
    return (
      <div className="p-4 relative">
        <BackButton onClick={onBack} />
        <p className="text-center text-red-500 mt-8">Usuario no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <BackButton onClick={onBack} />
        <h2 className="text-xl font-bold text-gray-800 ml-12">{recipient.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-3 rounded-lg shadow-md ${
              msg.senderId === currentUser.id ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <p>{msg.text}</p>
              <span className="text-xs opacity-75 mt-1 block text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {msg.adoptionStatus === 'accepted' && currentUser.type === 'rescatista' && (
                <div className="mt-2 text-center">
                  <p className="font-bold">Mascota aceptada por el adoptante.</p>
                  <button onClick={handleConfirmAcceptance} className="bg-green-600 text-white px-3 py-1 rounded-lg mt-1 text-sm">
                    Confirmar Aceptación
                  </button>
                </div>
              )}
              {msg.adoptionStatus === 'confirmed' && (
                <div className="mt-2 text-center">
                  <p className="font-bold">Mascota aceptada.</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <button onClick={handleFinalizeChat} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                      Continuar
                    </button>
                    <button onClick={handleFinalizeChat} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors">
                      Finalizar Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-4 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;