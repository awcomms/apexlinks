import adapter from "@sveltejs/adapter-node";
import { Server } from "socket.io";
import preprocess from "svelte-preprocess";

export default {
  kit: {
    adapter: adapter({
      out: "build",
    }),
    vite: {
      plugins: [
        {
          name: "socket",
          configureServer(server) {
            const io = new Server(server.httpServer);

            io.on("connection", (socket) => {
              socket.on("msg", (data) => {
                io.to(data.room).emit("msg", data);
              });

              socket.on("join", (id) => {
                socket.join(id);
              });

              socket.on("leave", (id) => {
                socket.leave(id);
              });
            });
          },
        },
      ],
    },
  },
  preprocess: preprocess({
    preserve: ["ld+json"],
  }),
};
