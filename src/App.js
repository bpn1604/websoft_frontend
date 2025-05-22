import { useState } from 'react';

import './App.css';
import { SocketProvider } from './context/socketContext';
import Login from './component/Login/Login';
import Chat from './component/Chat/Chat';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <SocketProvider>
      <div className="app">

        {!currentUser ? (
          <Login onLogin={setCurrentUser} />
        ) : (
          <Chat currentUser={currentUser} />
        )}
      </div>
    </SocketProvider>
  );
}

export default App;