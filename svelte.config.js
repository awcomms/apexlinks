import adapter from "@sveltejs/adapter-node";
import { getIO } from "./src/lib/getIO.js";
import preprocess from "svelte-preprocess";

export default {
  kit: {
    adapter: adapter({
      out: "build",
      precompress: true,
      envPrefix: "X_CUSTOM_",
    }),
    vite: {
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
            const io = getIO(server)
          },
        },
      ],
    },
  },
  preprocess: preprocess({
    preserve: ["ld+json"],
  }),
};
