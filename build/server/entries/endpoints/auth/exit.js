import { a as api } from "../../../chunks/api-9ba527ac.js";
import "../../../chunks/socket-c916af1c.js";
import "../../../chunks/send-c1a8b40b.js";
import "cookie";
import "../../../chunks/env-06439403.js";
import "socket.io-client";
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
