import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-706e192e.js";
import { a as api } from "../../../../chunks/api-47bb839d.js";
import { r as routes } from "../../../../chunks/routes-fb6e9fa0.js";
import "../../../../chunks/socket-c916af1c.js";
import { T as Txt } from "../../../../chunks/Txt-6fba074b.js";
import "../../../../chunks/send-cf4176c0.js";
import "cookie";
import "socket.io-client";
import "../../../../chunks/TxtInput-e6d7f3c6.js";
import "../../../../chunks/stores-f80eb8f4.js";
import "../../../../chunks/Link-ac336e41.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import "../../../../chunks/Row-d1968937.js";
import "../../../../chunks/Column-a86887bc.js";
import "../../../../chunks/TextInput-3971c789.js";
/* empty css                                                              */function post(path, data, _fetch) {
  let f = _fetch || fetch;
  return f(path, {
    method: "POST",
    body: JSON.stringify(data || {}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((r) => r.json());
}
const load = async ({ params, session, fetch: fetch2 }) => {
  const { id } = params;
  const user = await api.get(`users/${id}`, fetch2);
  if (!user.OK) {
    return { status: user.STATUS, error: user.error };
  }
  if (!session.user) {
    return {
      status: 302,
      redirect: `${routes.users}/${id}/about`
    };
  }
  const txt = await post("/send", {
    path: "txts/users",
    method: "POST",
    data: { user: id }
  }, fetch2);
  if (!txt.OK) {
    return { status: txt.STATUS, error: txt.error };
  }
  let { items, total, page, pages } = await api.get(`txts?id=${txt.id}`);
  return {
    props: {
      txt,
      items,
      total,
      page,
      pages,
      user,
      authUser: session.user
    }
  };
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [], total, page, pages, txt, user, authUser } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.authUser === void 0 && $$bindings.authUser && authUser !== void 0)
    $$bindings.authUser(authUser);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Txt, "Txt").$$render($$result, {
      leaveText: authUser.id === user.id ? "Texts to self" : "Stop receiving txts from this user",
      title: user.username,
      txt,
      items,
      total,
      page,
      pages
    }, {
      title: ($$value) => {
        user.username = $$value;
        $$settled = false;
      },
      txt: ($$value) => {
        txt = $$value;
        $$settled = false;
      },
      items: ($$value) => {
        items = $$value;
        $$settled = false;
      },
      total: ($$value) => {
        total = $$value;
        $$settled = false;
      },
      page: ($$value) => {
        page = $$value;
        $$settled = false;
      },
      pages: ($$value) => {
        pages = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export { U5Bidu5D as default, load };
