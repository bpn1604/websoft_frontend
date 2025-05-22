// src/hooks/useChat.js
import { useState, useEffect } from 'react';
import { useSocket } from '../context/socketContext';

export function useChat() {
    const socket = useSocket(); // This will now throw if socket is invalid

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState('');


    useEffect(() => {
        // Make sure socket is connected
        if (!socket.connected) {
            socket.connect();
        }

        // Event listeners
        const onUserStatus = (data) => {
            setUsers(prevUsers => updateUserList(prevUsers, data));
        };

        const onReceiveMessage = (message) => {
            setMessages(prev => [...prev, message]);
        };

        const onUserTyping = (data) => {
            setIsTyping(data.isTyping);
            setTypingUser(data.from);
        };

        socket.on('user status', onUserStatus);
        socket.on('receive message', onReceiveMessage);
        socket.on('user typing', onUserTyping);

        return () => {
            socket.off('user status', onUserStatus);
            socket.off('receive message', onReceiveMessage);
            socket.off('user typing', onUserTyping);
        };
    }, [socket]);

    return { users, messages, isTyping, typingUser, setMessages };
}

// Helper function
function updateUserList(prevUsers, data) {
    const userExists = prevUsers.some(u => u.username === data.username);
    if (userExists) {
        return prevUsers.map(u =>
            u.username === data.username ? { ...u, online: data.online } : u
        );
    }
    return [...prevUsers, { username: data.username, online: data.online }];
}