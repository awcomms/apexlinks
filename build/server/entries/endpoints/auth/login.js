import { s as send } from "../../../chunks/send-cf4176c0.js";
import { r as respond } from "../../../chunks/authResponse-ab7d2b8b.js";
import "cookie";
import "../../../chunks/socket-c916af1c.js";
import "socket.io-client";
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
