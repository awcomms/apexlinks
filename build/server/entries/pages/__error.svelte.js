import { c as create_ssr_component, v as validate_component, f as escape } from "../../chunks/index-70dffb27.js";
import { L as Link } from "../../chunks/Link-3903a16b.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import "flatpickr";
import { R as Row, C as Column } from "../../chunks/Column-9dd4af0c.js";
const load = async ({ error, status }) => {
  let message;
  try {
    message = JSON.parse(error.message);
  } catch {
  }
  return { props: { message, error, status } };
};
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = "" } = $$props;
  let { error = "" } = $$props;
  let { message } = $$props;
  const dev = process.env.NODE_ENV === "development";
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, { lg: 16 }, {}, {
        default: () => {
          return `<h1>Error code: ${escape(status)}</h1>
    <div>${message ? `<p>${escape(message.message)}</p>
        ${message.guide ? `${validate_component(Link, "Link").$$render($$result, { href: message.guide.route }, {}, {
            default: () => {
              return `${escape(message.guide.message)}`;
            }
          })}` : ``}` : `<p>${escape(error.message)}</p>`}</div>
    ${error && dev && error.stack ? `<div><pre>${escape(error.stack)}</pre></div>` : ``}`;
        }
      })}`;
    }
  })}`;
});
export { _error as default, load };
