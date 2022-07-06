import { a as api } from "../../../chunks/api-38343fdb.js";
import "../../../chunks/parseMarkdown-2f2db9f5.js";
import "../../../chunks/send-95f08c33.js";
import "cookie";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
async function post(req) {
  req.locals.token = null;
  await api.del("tokens", req.locals.token);
  return {
    headers: {
      "set-cookie": "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    },
    body: {
      ok: true
    }
  };
}
export { post };
