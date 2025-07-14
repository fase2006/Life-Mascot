let messages = JSON.parse(localStorage.getItem('messages')) || [];

const saveMessages = () => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

export const addMessage = (message) => {
  messages.push(message);
  saveMessages();
};

export const getMessagesBetweenUsers = (user1Id, user2Id) => {
  return messages.filter(msg => 
    (msg.senderId === user1Id && msg.receiverId === user2Id) ||
    (msg.senderId === user2Id && msg.receiverId === user1Id)
  ).sort((a, b) => a.timestamp - b.timestamp);
};

export const getUnreadMessagesCount = (userId) => {
  return messages.filter(msg => msg.receiverId === userId && !msg.read).length;
};

export const markMessagesAsRead = (userId, senderId) => {
  messages.forEach(msg => {
    if (msg.receiverId === userId && msg.senderId === senderId) {
      msg.read = true;
    }
  });
  saveMessages();
};

export default messages;