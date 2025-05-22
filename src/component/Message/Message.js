export default function Message({ message, isCurrentUser }) {
    return (
        <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
            <p>{message.content}</p>
            <small>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
        </div>
    );
}