export const sendMessage = (messageData, socket) => {
    socket.emit('send message', messageData);
};

export const getChatHistory = (users, socket) => {
    socket.emit('get history', {
        user1: users.user1,
        user2: users.user2
    });
};

export const notifyTyping = (data, socket) => {
    socket.emit('typing', data);
};

export const notifyStopTyping = (data, socket) => {
    socket.emit('stop typing', data);
};