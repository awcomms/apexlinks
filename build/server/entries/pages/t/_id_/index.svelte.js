import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-706e192e.js";
import { a as api } from "../../../../chunks/api-9ba527ac.js";
import "../../../../chunks/socket-c916af1c.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6a6eb170.js";
import { R as Row } from "../../../../chunks/Row-d1968937.js";
import { C as Column } from "../../../../chunks/Column-a86887bc.js";
import { T as Txt } from "../../../../chunks/Txt-8d3b6ac6.js";
import { T as Tags } from "../../../../chunks/Tags-dd265a95.js";
import { io } from "socket.io-client";
import "../../../../chunks/send-c1a8b40b.js";
import "cookie";
import "../../../../chunks/env-06439403.js";
import "../../../../chunks/stores-f80eb8f4.js";
import "../../../../chunks/routes-fb6e9fa0.js";
import "../../../../chunks/Link-ac336e41.js";
import "../../../../chunks/TextInput-3971c789.js";
/* empty css                                                              */import "../../../../chunks/index-cf6f227c.js";
import "../../../../chunks/Tag-8f483cdc.js";
import "../../../../chunks/Close-75a59370.js";
import "../../../../chunks/Button-b257bd6b.js";
const load = async ({ params, fetch }) => {
  const { id } = params;
  let txt;
  if (id) {
    txt = await api.get(`txts?id=${id}`, fetch);
    if (!txt.OK) {
      return {
        status: Number(txt.STATUS),
        error: txt.error
      };
    }
  }
  let repliesUrl = id ? `txts?id=${id}&replies` : `txts`;
  let res = await api.get(repliesUrl, fetch);
  if (!res.OK) {
    return {
      status: Number(res.STATUS),
      error: res.error
    };
  }
  let { items, total, page, pages } = res;
  return {
    props: { txt, items, page, pages, total }
  };
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { txt, items, total, page, pages } = $$props;
  let add = true;
  const socket = io();
  let tags;
  let room = txt ? String(txt.id) : "home";
  socket.on("connect", () => {
    connect();
  });
  socket.on("txt", async (obj) => {
    if (txt)
      await api.put(`seen?id=${txt.id}`, {});
    items = [...items, obj];
    add = !add;
  });
  const connect = () => {
    socket.emit("join", room);
  };
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Tags, "Tags").$$render($$result, { prefix: "search ", tags }, {
              tags: ($$value) => {
                tags = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}`;
      }
    })}

${validate_component(Txt, "Txt").$$render($$result, {
      socket,
      txt,
      items,
      total,
      add,
      pages,
      page
    }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export { U5Bidu5D as default, load };
