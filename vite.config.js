import { sveltekit } from "@sveltejs/kit/vite";
import { getIO } from "./src/lib/getIO.js";

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      "xmlhttprequest-ssl":
        "./node_modules/engine.io-client/lib/xmlhttprequest.js",
    },
  },
  plugins: [
    {
      name: "sveltekit-socket-io",
      configureServer(server) {
        getIO(server.httpServer);
      },
    },
    sveltekit(),
  ],
};

export default config;
