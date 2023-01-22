import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css'

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join a Chat</h3>
        <input 
          type="text" 
          placeholder='Olga...' 
          onChange={(e) => {setUsername(e.target.value)
          }}
        />
        <input 
          type="text" 
          placeholder='Room ID...'
          onChange={(e) => {setRoom(e.target.value)
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      {showChat ? 
      <Chat socket={socket} username={username} room={room}/>
      : null}
    </div>
  );
}

export default App;
