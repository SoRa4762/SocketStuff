const { config } = require("dotenv");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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

server.listen(PORT, HOST, () => {
  console.log("listening to port 3000");
});
