import { s as send } from "../../chunks/send-95f08c33.js";
import "cookie";
import "../../chunks/parseMarkdown-2f2db9f5.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
async function post({ request, locals }) {
  const { token: auth } = locals;
  const { path, method, data } = await request.json();
  return { body: await send({ method, path, data, auth }) };
}
export { post };
