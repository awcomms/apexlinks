import { b as base } from "../../chunks/send-cf4176c0.js";
import "cookie";
import "../../chunks/socket-c916af1c.js";
import "socket.io-client";
const get = () => {
  return {
    headers: {
      Location: `${base}/robots.txt`
    },
    status: 301
  };
};
export { get };
