import { c as create_ssr_component, h as subscribe, v as validate_component, f as escape } from "../../../../chunks/index-70dffb27.js";
import { a as api } from "../../../../chunks/api-38343fdb.js";
import { r as routes } from "../../../../chunks/routes-2be82c1b.js";
import { p as parseMarkdown } from "../../../../chunks/parseMarkdown-2f2db9f5.js";
import { s as session } from "../../../../chunks/stores-1f04fa1d.js";
import { L as Link } from "../../../../chunks/Link-3903a16b.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import "flatpickr";
import { R as Row, C as Column } from "../../../../chunks/Column-9dd4af0c.js";
import { T as Tags } from "../../../../chunks/Tags-22bd6bc0.js";
import "../../../../chunks/send-95f08c33.js";
import "cookie";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
import "../../../../chunks/index-3f4ef6a9.js";
import "../../../../chunks/Button-fa0593f7.js";
const load = async ({ params, fetch }) => {
  const { id } = params;
  const include = ["value", "text", "user", "tags"];
  const txt = await api.get(`txts/${id}?include=${JSON.stringify(include)}`, fetch);
  if (!txt.OK) {
    return {
      error: txt.error,
      status: Number(txt.STATUS)
    };
  }
  return { props: { txt } };
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { txt } = $$props;
  let { user } = $session;
  let { tags, text } = txt;
  if (!tags)
    tags = [];
  text = parseMarkdown(text);
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  $$unsubscribe_session();
  return `${(user == null ? void 0 : user.id) === ((_a = txt.user) == null ? void 0 : _a.id) ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Link, "Link").$$render($$result, { href: routes.txtEdit(txt.id) }, {}, {
            default: () => {
              return `Edit this txt`;
            }
          })}`;
        }
      })}`;
    }
  })}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Link, "Link").$$render($$result, { href: routes.txtTxt(txt.id) }, {}, {
            default: () => {
              return `Replies to this txt`;
            }
          })}`;
        }
      })}`;
    }
  })}

${txt.user ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Link, "Link").$$render($$result, { href: routes.user(txt.user.id) }, {}, {
            default: () => {
              return `Creator of this txt`;
            }
          })}`;
        }
      })}`;
    }
  })}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<p>txt ${escape(txt.id)}</p>
        <p>${escape(txt.value)}</p>
        ${validate_component(Tags, "Tags").$$render($$result, {
            tags,
            editable: false,
            hide: true,
            open: true,
            showHiddenCount: true
          }, {}, {})}`;
        }
      })}`;
    }
  })}

<br>

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<!-- HTML_TAG_START -->${text}<!-- HTML_TAG_END -->`;
        }
      })}`;
    }
  })}`;
});
export { U5Bidu5D as default, load };
