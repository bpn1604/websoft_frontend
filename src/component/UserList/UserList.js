export default function UserList({ users, selectedUser, onSelectUser }) {
    return (
        <div className="user-list">
            <h3>Online Users</h3>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.username}
                        onClick={() => onSelectUser(user)}
                        className={selectedUser === user.username ? 'selected' : ''}
                    >
                        {user.username}
                        <span className={`status ${user.online ? 'online' : 'offline'}`}>
                            {user.online ? '● Online' : '○ Offline'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}