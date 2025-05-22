import { useState, useRef, useEffect } from 'react';
import Message from '../Message/Message';
import UserList from '../UserList/UserList';
import { useChat } from '../../hooks/useChat';
import { useSocket } from '../../context/socketContext';
import { sendMessage, getChatHistory, notifyStopTyping, notifyTyping } from '../../services/chat.service';


export default function Chat({ currentUser }) {
    const socket = useSocket();
    const { users, messages, isTyping, typingUser } = useChat();
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!socket.connected) {
            console.log('Connecting socket...');
            socket.connect();
        }

        return () => {
            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, [socket]);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user.username);
        getChatHistory({ user1: currentUser, user2: user.username }, socket);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedUser) {
            const messageData = {
                from: currentUser,
                to: selectedUser,
                message: newMessage
            };
            sendMessage(messageData, socket);
            setNewMessage('');
            notifyStopTyping({ to: selectedUser }, socket);
        }
    };

    const handleTyping = () => {
        if (!selectedUser) return;
        notifyTyping({ to: selectedUser }, socket);
    };

    return (
        <div className="chat-app">
            <UserList
                users={users}
                selectedUser={selectedUser}
                onSelectUser={handleSelectUser}
            />

            <div className="chat-area">
                {selectedUser ? (
                    <>
                        <div className="chat-header">
                            <h3>{selectedUser}</h3>
                            <span className="status">
                                {users.find(u => u.username === selectedUser)?.online
                                    ? '● Online'
                                    : '○ Offline'}
                            </span>
                        </div>

                        <div className="messages-container">
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    message={msg}
                                    isCurrentUser={msg.sender === currentUser}
                                />
                            ))}

                            {isTyping && typingUser === selectedUser && (
                                <div className="typing-indicator">
                                    <p>{typingUser} is typing...</p>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => {
                                    setNewMessage(e.target.value);
                                    handleTyping();
                                }}
                                onBlur={() => notifyStopTyping({ to: selectedUser }, socket)}
                                placeholder="Type a message..."
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="select-user-prompt">
                        <p>Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}