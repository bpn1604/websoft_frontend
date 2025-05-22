// src/context/socketContext.js
import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

// Create the socket instance
const socket = io('https://websoft-6ibz.onrender.com/', {
    withCredentials: true,
    autoConnect: false // We'll connect manually
});

// Debugging helpers
socket.on('connect', () => console.log('Socket connected'));
socket.on('disconnect', () => console.log('Socket disconnected'));

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);

    // Add validation
    if (!socket || typeof socket.on !== 'function') {
        throw new Error('Socket is not properly initialized');
    }

    return socket;
};

// Export the raw socket for debugging
export const socketInstance = socket;