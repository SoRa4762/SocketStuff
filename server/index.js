const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with ID: ", socket.id);

  socket.on("message", (message) => {
    console.log("Message Received: ", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected with ID: ", socket.id);
  });
});

app.get("/gomu", (req, res) => {
  console.log("Siddhei IT Operations!!!");
  res.send("Siddhei IT Operations!");
});

server.listen(3000, () => {
  console.log("listening to port 3000");
});
