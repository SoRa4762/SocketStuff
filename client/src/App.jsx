import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Message received:", message);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
  };

  return (
    <>
      <div>
        <h1>Chat App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <h2>Chats</h2>
      </div>
    </>
  );
};

export default App;
