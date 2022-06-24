import { s as send } from "../../chunks/send-c1a8b40b.js";
import "cookie";
import "../../chunks/env-06439403.js";
import "../../chunks/socket-c916af1c.js";
import "socket.io-client";
async function post({ request, locals }) {
  const { token: auth } = locals;
  const { path, method, data } = await request.json();
  return { body: await send({ method, path, data, auth }) };
}
export { post };
