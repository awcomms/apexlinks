import adapter from "@sveltejs/adapter-node";
import { Server } from "socket.io";
import preprocess from "svelte-preprocess";
import cFetch from "./src/lib/utils/cFetch.js"

const send = (method, path, body, auth) => {
  let opts = {
    method,
    "content-type": "application/json",
    headers: {
      auth,
    },
    body
  };
  return cFetch("http://127.0.0.1:5000", path, opts);
}

const roomAction = (socket, name) => {
  socket.on(name, data => {
    send("PUT", name, { room: data.room }, data.auth);
  })
}

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
                console.log('h')
                send('POST', 'messages', data.data, data.auth).then((r) => {
                  console.log('cr', r)
                  io.emit("msg", data.data);
                });
              });

              roomAction(socket, "join");
              roomAction(socket, "leave");
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
