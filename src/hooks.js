import { parse } from "cookie";
import { send } from "$lib/send";
import { minify } from "html-minifier";
import { prerendering } from "$app/env";

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
  let include = JSON.stringify(['username'])
  let user = await send({ method: "GET", path: `user?include=${include}`, auth });
  if (!user.OK) return {}; //TODO
  return {
    user,
  };
};

export async function handle({ event, resolve }) {
  const { request } = event;
  event.locals.token = parse(request.headers.get("cookie") || "").token;
  const response = await resolve(event);

  if (
    prerendering &&
    response.headers.get("content-type")?.startsWith("text/html")
  ) {
    return new Response(minify(await response.text(), min_opts), {
      status: response.status,
      headers: response.headers,
    });
  }

  return response;
}
