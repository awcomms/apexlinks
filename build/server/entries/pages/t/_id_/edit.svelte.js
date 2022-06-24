import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-706e192e.js";
import { a as api } from "../../../../chunks/api-47bb839d.js";
import "../../../../chunks/socket-c916af1c.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import { B as Button } from "../../../../chunks/Button-b257bd6b.js";
import "flatpickr";
import { R as Row } from "../../../../chunks/Row-d1968937.js";
import { C as Column } from "../../../../chunks/Column-a86887bc.js";
import { T as Tags } from "../../../../chunks/Tags-8ac9097a.js";
import "../../../../chunks/send-cf4176c0.js";
import "cookie";
import "socket.io-client";
import "../../../../chunks/index-ca308a68.js";
import "../../../../chunks/Tag-8f483cdc.js";
import "../../../../chunks/Close-75a59370.js";
/* empty css                                                              */const load = async ({ params, fetch }) => {
  const { id } = params;
  const txt = api.get(`txts/${id}`, fetch);
  if (!txt.OK) {
    return {
      error: txt.error,
      status: Number(txt.STATUS)
    };
  }
  return { props: { txt } };
};
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { txt } = $$props;
  let { tags, about } = txt;
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Tags, "Tags").$$render($$result, { tags }, {
              tags: ($$value) => {
                tags = $$value;
                $$settled = false;
              }
            }, {})}
        ${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Edit`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export { Edit as default, load };
