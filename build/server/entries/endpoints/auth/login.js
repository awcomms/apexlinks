import { s as send } from "../../../chunks/send-95f08c33.js";
import { r as respond } from "../../../chunks/authResponse-ab7d2b8b.js";
import "cookie";
import "../../../chunks/parseMarkdown-2f2db9f5.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
async function post({ request }) {
  const { username, password } = await request.json();
  const body = await send({
    method: "POST",
    path: "tokens",
    auth: { username, password }
  });
  return respond(body);
}
export { post };
