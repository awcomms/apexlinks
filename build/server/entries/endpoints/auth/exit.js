import { a as api } from "../../../chunks/api-47bb839d.js";
import "../../../chunks/socket-c916af1c.js";
import "../../../chunks/send-cf4176c0.js";
import "cookie";
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
