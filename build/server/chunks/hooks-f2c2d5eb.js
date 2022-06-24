import { parse } from "cookie";
import { s as send } from "./send-c1a8b40b.js";
import { minify } from "html-minifier";
import { p as prerendering } from "./index-7e6f1d75.js";
import "./env-06439403.js";
import "./socket-c916af1c.js";
import "socket.io-client";
import "./index-706e192e.js";
const min_opts = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};
const getSession = async ({ locals }) => {
  let { token: auth } = locals;
  let user = await send({ method: "GET", path: "user", auth });
  if (!user.OK)
    return {};
  return {
    user
  };
};
async function handle({ event, resolve }) {
  var _a;
  const { request } = event;
  event.locals.token = parse(request.headers.get("cookie") || "").token;
  const response = await resolve(event);
  if (prerendering && ((_a = response.headers.get("content-type")) == null ? void 0 : _a.startsWith("text/html"))) {
    return new Response(minify(await response.text(), min_opts), {
      status: response.status,
      headers: response.headers
    });
  }
  return response;
}
export { getSession, handle };
