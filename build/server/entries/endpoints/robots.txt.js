import "cookie";
import "../../chunks/socket-c916af1c.js";
import { A as API } from "../../chunks/env-06439403.js";
import "socket.io-client";
const get = () => {
  return {
    headers: {
      Location: `${API}/robots.txt`
    },
    status: 301
  };
};
export { get };
