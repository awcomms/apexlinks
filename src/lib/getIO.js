import { Server } from "socket.io";

export const getIO = (server) => {
    const io = new Server(server);

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

    return io
}