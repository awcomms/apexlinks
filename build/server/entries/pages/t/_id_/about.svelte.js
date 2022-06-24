import { c as create_ssr_component, v as validate_component, f as escape } from "../../../../chunks/index-706e192e.js";
import { a as api } from "../../../../chunks/api-47bb839d.js";
import "../../../../chunks/socket-c916af1c.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
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
/* empty css                                                              */import "../../../../chunks/Button-b257bd6b.js";
const load = async ({ params, fetch }) => {
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
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { txt } = $$props;
  let { tags } = txt;
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
            return `<p>txt ${escape(txt.id)}</p>
        <p>${escape(txt.value)}</p>
        ${validate_component(Tags, "Tags").$$render($$result, { editable: false, tags }, {
              tags: ($$value) => {
                tags = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export { About as default, load };
