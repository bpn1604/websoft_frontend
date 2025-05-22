export const loginUser = (username, socket) => {
    socket.emit('join', username);
};