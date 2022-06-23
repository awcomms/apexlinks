import adapter from "@sveltejs/adapter-node";
import { Server } from "socket.io";
import preprocess from "svelte-preprocess";

export default {
  kit: {
    adapter: adapter({
      out: "build",
      precompress: true,
      envPrefix: 'X_CUSTOM_'
    }),
    vite: {
      plugins: [
        {
          name: "sveltekit-socket-io",
          configureServer(server) {
            const io = new Server(server.httpServer);

            io.on("connection", (socket) => {
              socket.on("txt", (data) => {
                io
                  .to(String(data.room))
                  .emit("txt", data.data);
              });

              socket.on("join", (room) => {
                socket.join(room);
              });

              socket.on("leave", (room) => {
                socket.leave(room);
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
