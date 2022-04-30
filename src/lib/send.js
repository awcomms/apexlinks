import { dev, browser } from "$app/env";
import { parse } from "cookie";

let local = "http://127.0.0.1:5000";
import { API as live } from "$lib/env";

export let base = dev ? local : live;

export function send({ method, path, data, auth }) {
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
      console.log('d.c', document.cookie)
      const { token } = parse(document.cookie || "");
      return token;
    })();
  }

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }

  try {
    return fetch(`${base}/${path}`, opts)
      .then(async (r) => {
        const text = await r.text();
        try {
          const json = JSON.parse(text);
          json.STATUS = r.status;
          json.OK = r.statusText === 'OK';
          return json;
        } catch (err) {
          return text;
        }
      })
      .catch((err) => {
        console.log("send err", err);
        return { status: 500, error: "internal error" };
      });
  } catch {
    return { status: 500, error: "internal error" };
  }
}
