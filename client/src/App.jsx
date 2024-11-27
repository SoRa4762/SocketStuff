import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socket.off("message");
    };
  });

  const sendMessage = () => {
    socket.emit("message", chat);
  };

  return (
    <>
      <h1>Chat App Mate!</h1>
      <p>Welcome to Sora group chat!</p>
      <input type="text" onChange={(e) => setChat(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <h1>Chats</h1>
      {chats && (
        <>
          {chats.map((chat, index) => (
            <p key={index}>{chat}</p>
          ))}
        </>
      )}
    </>
  );
}

export default App;
