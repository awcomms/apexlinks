import { b as base } from "../../chunks/send-95f08c33.js";
import "cookie";
import "../../chunks/parseMarkdown-2f2db9f5.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
const get = () => {
  return {
    headers: {
      Location: `${base}/robots.txt`
    },
    status: 301
  };
};
export { get };
