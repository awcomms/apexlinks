import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

export default {
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
  }, 
  preprocess: preprocess({
    preserve: ["ld+json"],
  }),
};
