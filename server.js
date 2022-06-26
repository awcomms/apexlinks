import { handler } from './build/handler.js'

import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'

const app = express();
app.use(handler);

const server = createServer(app)
const io = new Server(server)

io.on("connection", (socket) => {
  socket.on("txt", (data) => {
    io.to(String(data.room)).emit("txt", data.data);
  });

  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
  });
});

server.listen('3000', '0.0.0.0')