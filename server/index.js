import express, { json } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(json());

const groups = {}; // Store groups and users

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("joinGroup", ({ userName, groupName }) => {
    socket.join(groupName);
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push({ id: socket.id, userName });
    
    io.to(groupName).emit("groupUsers", groups[groupName]);
  });

  socket.on("sendMessage", ({ groupName, userName, message }) => {
    io.to(groupName).emit("receiveMessage", { userName, message });
    console.log(message)
  });

  socket.on("disconnect", () => {
    for (const group in groups) {
      groups[group] = groups[group].filter((user) => user.id !== socket.id);
      io.to(group).emit("groupUsers", groups[group]);
    }
    console.log("User disconnected", socket.id);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));