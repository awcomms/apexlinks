import { browser } from "$app/env";
import { parse } from "cookie";
import {cFetch} from "$lib/utils"

import { API } from "$lib/env";

console.log('API', API)

export const base = API || "http://127.0.0.1:5000";
console.log("base", base);

export function send({ method, path, data, auth }, f) {
  const opts = { method, headers: {} };

  if (auth) {
    if (auth.username) {
      opts.headers["auth"] = Buffer.from(
        `${auth.username}:${auth.password || ""}`
      ).toString("base64");
    } else {
      opts.headers["auth"] = auth;
    }
  } else if (browser) {
    opts.headers["auth"] = (() => {
      const { token } = parse(document.cookie || "");
      return token;
    })();
  }

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }

  return cFetch(base, path, opts, f)
}
