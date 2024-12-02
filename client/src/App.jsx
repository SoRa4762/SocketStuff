import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

const App = () => {
  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Message received: ", message);
      setMessages((prevMsg) => [...prevMsg, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
  };

  return (
    <>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {messages && (
        <>
          <h2>Chats</h2>
          {messages.map((msg, index) => (
            <div key={index}>
              <p>{msg}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default App;
