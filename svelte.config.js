import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

export default {
  kit: {
    adapter: adapter({
      out: "build",
      precompress: true,
      envPrefix: "X_CUSTOM_",
    })
  },
  preprocess: preprocess({
    preserve: ["ld+json"],
  }),
};
