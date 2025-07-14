import React, { useState, useEffect, useRef } from 'react';
import BackButton from './BackButton';
import { addMessage, getMessagesBetweenUsers } from '../mock/messages';
import { getUserById } from '../mock/users';

const SupportChatScreen = ({ currentUser, onBack }) => {
  const supportAgentId = 999; // ID ficticio para el agente de soporte
  const supportAgent = { id: supportAgentId, name: "Soporte Técnico", profilePhoto: "https://via.placeholder.com/50/0000FF/FFFFFF?text=ST" };
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialMessages = getMessagesBetweenUsers(currentUser.id, supportAgentId);
    setMessages(initialMessages);

    if (initialMessages.length === 0) {
      const hour = new Date().getHours();
      let greeting;
      if (hour >= 0 && hour < 12) {
        greeting = "Buenos días";
      } else if (hour >= 12 && hour < 19) {
        greeting = "Buenas tardes";
      } else {
        greeting = "Buenas noches";
      }
      
      const initialSupportMessage = {
        id: Date.now(),
        senderId: supportAgentId,
        receiverId: currentUser.id,
        text: `${greeting}, ¿en qué lo podemos ayudar?😁`,
        timestamp: Date.now(),
        read: false
      };
      addMessage(initialSupportMessage);
      setMessages(prev => [...prev, initialSupportMessage]);
    }
  }, [currentUser.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        senderId: currentUser.id,
        receiverId: supportAgentId,
        text: newMessage,
        timestamp: Date.now(),
        read: false
      };
      addMessage(userMessage);
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Auto-reply from support
      setTimeout(() => {
        const autoReply = {
          id: Date.now() + 1,
          senderId: supportAgentId,
          receiverId: currentUser.id,
          text: "En unos momentos se contactará con una persona real que lo ayudará con su problema😁",
          timestamp: Date.now() + 1000,
          read: false
        };
        addMessage(autoReply);
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <BackButton onClick={onBack} />
        <h2 className="text-xl font-bold text-gray-800 ml-12">Soporte Técnico</h2>
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
          onClick={handleSendMessage}
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

export default SupportChatScreen;