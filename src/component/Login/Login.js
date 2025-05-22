import { useState } from 'react';
import { loginUser } from '../../services/auth.service';
import { useSocket } from '../../context/socketContext';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const socket = useSocket();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            loginUser(username, socket);
            onLogin(username);
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome to Chat App</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
                <button type="submit">Join Chat</button>
            </form>
        </div>
    );
}