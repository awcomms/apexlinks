import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-70dffb27.js";
import { p as post, T as Txt } from "../../../chunks/Txt-018b5cd1.js";
import { a as api } from "../../../chunks/api-38343fdb.js";
import "../../../chunks/parseMarkdown-2f2db9f5.js";
import "../../../chunks/routes-2be82c1b.js";
import "../../../chunks/stores-1f04fa1d.js";
import "cookie";
import "../../../chunks/Link-3903a16b.js";
import "../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import "flatpickr";
import "../../../chunks/Column-9dd4af0c.js";
import "../../../chunks/TextInput-badba880.js";
import "../../../chunks/Tags-22bd6bc0.js";
import "../../../chunks/index-3f4ef6a9.js";
import "../../../chunks/Button-fa0593f7.js";
import "../../../chunks/ButtonSet-820f91e3.js";
import "../../../chunks/Loading-8d26f732.js";
import "socket.io-client";
import "../../../chunks/Delete-fad7343b.js";
import "../../../chunks/Modal-537a947a.js";
import "../../../chunks/send-95f08c33.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
const load = async ({ url, fetch, session }) => {
  let include = ["user", "value"];
  let getUrl = `txts?include=${JSON.stringify(include)}`;
  let user = url.searchParams.get("user");
  let joined = typeof url.searchParams.get("joined") === "string";
  let props = {};
  let id = url.searchParams.get("id");
  if (id) {
    const txt = await api.get(`txts/${id}?include=${JSON.stringify(["value"])}`, fetch);
    if (!txt.OK) {
      return {
        error: txt.error,
        status: Number(txt.STATUS)
      };
    }
    props.txt = txt;
    getUrl = getUrl.concat(`&id=${txt.id}`);
  }
  let res, items, total, page, pages;
  if (user) {
    user = await api.get(`users/${user}?include=${JSON.stringify(["username"])}`, fetch);
    if (!user.OK) {
      return {
        status: Number(user.STATUS),
        error: user.error
      };
    }
    getUrl = getUrl.concat(`&user=${user.id}`);
  }
  if (joined) {
    if (!session.user) {
      return {
        error: JSON.stringify({
          message: "query argument `join` was specified in url but no logged in user",
          guide: {
            message: "Click here to login",
            route: `${routes.login}`
          }
        }),
        status: 400
      };
    }
    getUrl = getUrl.concat(`&joined`);
    res = await post("/send", { path: getUrl, method: "GET" }, fetch);
  } else {
    res = await api.get(getUrl, fetch);
  }
  if (!res.OK) {
    return {
      status: Number(res.STATUS),
      error: res.error
    };
  }
  ({ items, total, page, pages } = res);
  console.log("page", page);
  console.log("items.length", items.length);
  return {
    props: {
      ...props,
      items,
      page,
      pages,
      total,
      getUrl
    }
  };
};
const T = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { txt, items, page, pages, total, getUrl } = $$props;
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.getUrl === void 0 && $$bindings.getUrl && getUrl !== void 0)
    $$bindings.getUrl(getUrl);
  return `${validate_component(Txt, "Txt").$$render($$result, {
    labelText: txt ? "Reply to this txt" : "Add a new txt",
    txt,
    getUrl,
    items,
    page,
    pages,
    total
  }, {}, {})}`;
});
export { T as default, load };
