import { parse } from "cookie";
import { send } from "$lib/send";
import { minify } from "html-minifier";
import { dev, prerendering } from "$app/env";

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
  sortClassName: true,
};

export const getSession = async ({ locals }) => {
  let { token: auth } = locals;
  let user = await send({ method: "GET", path: "user", auth });
  if (!user || user.error) return {}
  return {
    user
  };
};

export async function handle({ event, resolve }) {
  const { request } = event;
  const cookie = request.headers.get("cookie");

  if (cookie) {
    const { token } = parse(request.headers.get('cookie') || "");

    event.locals.token = token;
  }

  const response = await resolve(event);

  // if (
  //   prerendering &&
  //   response.headers.get("content-type").startsWith("text/html")
  // ) {
  //   response.body = minify(response.body, min_opts);
  // }
  
  return response;
}
