import { c as create_ssr_component, v as validate_component, f as escape } from "../../chunks/index-706e192e.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { R as Row } from "../../chunks/Row-d1968937.js";
import { C as Column } from "../../chunks/Column-a86887bc.js";
const load = async ({ error, status }) => {
  return { props: { error, status } };
};
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = "" } = $$props;
  let { error = "" } = $$props;
  const dev = process.env.NODE_ENV === "development";
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, { lg: 16 }, {}, {
        default: () => {
          return `<h1>Error code: ${escape(status)}</h1>
    <div>${escape(error.txt || "")}
      </div>
    ${error && dev && error.stack ? `<div><pre>${escape(error.stack)}</pre></div>` : ``}`;
        }
      })}`;
    }
  })}`;
});
export { _error as default, load };
