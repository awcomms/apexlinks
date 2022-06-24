import { s as send } from "../../../chunks/send-cf4176c0.js";
import { r as respond } from "../../../chunks/authResponse-ab7d2b8b.js";
import "cookie";
import "../../../chunks/socket-c916af1c.js";
import "socket.io-client";
async function post({ request }) {
  const { email, username, password } = await request.json();
  const token = await send({ method: "POST", path: "users", data: { email }, auth: { username, password } });
  return respond(token);
}
export { post };
