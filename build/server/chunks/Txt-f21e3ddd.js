import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, j as subscribe, v as validate_component, i as createEventDispatcher, f as escape, t as each } from "./index-706e192e.js";
import "cookie";
import { r as routes } from "./routes-fb6e9fa0.js";
import "./socket-c916af1c.js";
import { s as session } from "./stores-f80eb8f4.js";
import { L as Link } from "./Link-ac336e41.js";
import "./HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { R as Row } from "./Row-d1968937.js";
import { C as Column } from "./Column-a86887bc.js";
import { T as TextInput } from "./TextInput-3971c789.js";
/* empty css                                             */const Truncate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clamp"]);
  let { clamp = "end" } = $$props;
  if ($$props.clamp === void 0 && $$bindings.clamp && clamp !== void 0)
    $$bindings.clamp(clamp);
  return `<p${spread([escape_object($$restProps)], {
    classes: (clamp === "end" ? "bx--text-truncate--end" : "") + " " + (clamp === "front" ? "bx--text-truncate--front" : "")
  })}>${slots.default ? slots.default({}) : ``}</p>`;
});
const TxtInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value2) => $session = value2);
  let { ref, value = "" } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"input"}">${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${$session.user ? `${validate_component(TextInput, "TextInput").$$render($$result, { rows: 2, ref, value }, {
              ref: ($$value) => {
                ref = $$value;
                $$settled = false;
              },
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            }, {})}` : `<div class="${"login-prompt"}">${validate_component(Link, "Link").$$render($$result, { href: routes.login }, {}, {
              default: () => {
                return `Login to send txts to this txt`;
              }
            })}</div>`}`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  $$unsubscribe_session();
  return $$rendered;
});
var Txt_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".pointer.svelte-1ues56k{cursor:pointer}.small.svelte-1ues56k{color:grey;font-size:0.75rem}.head-space.svelte-1ues56k{height:0.5rem}")();
const css = {
  code: ".pointer.svelte-1ues56k{cursor:pointer}.small.svelte-1ues56k{color:grey;font-size:0.75rem}.head-space.svelte-1ues56k{height:0.5rem}",
  map: null
};
const Txt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title, add, page, pages, txt, items, leaveText = "Leave txt" } = $$props;
  createEventDispatcher();
  let value;
  let ref;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.add === void 0 && $$bindings.add && add !== void 0)
    $$bindings.add(add);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.leaveText === void 0 && $$bindings.leaveText && leaveText !== void 0)
    $$bindings.leaveText(leaveText);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<span>${title ? `${validate_component(Link, "Link").$$render($$result, {
              href: routes.txts + "/" + txt.id + "/about"
            }, {}, {
              default: () => {
                return `${validate_component(Truncate, "Truncate").$$render($$result, { clamp: "end" }, {}, {
                  default: () => {
                    return `${escape(title)}`;
                  }
                })}`;
              }
            })}` : ``}
      ${txt ? `${txt.joined ? `<p class="${"pointer svelte-1ues56k"}">${escape(leaveText)}</p>` : `<p class="${"pointer svelte-1ues56k"}">Join this txt</p>`}` : ``}
      <br></span>
    <div class="${"head-space svelte-1ues56k"}"></div>`;
          }
        })}`;
      }
    })}

${txt ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Truncate, "Truncate").$$render($$result, {}, {}, {
              default: () => {
                return `txt ${escape(txt.id)}: ${escape(txt.value)}`;
              }
            })}`;
          }
        })}`;
      }
    })}` : ``}

${pages > 1 ? `<p>Get older txts</p>` : ``}

<div class="${"con"}">${each(items, (item) => {
      return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Link, "Link").$$render($$result, { href: routes.users + "/" + item.user.id }, {}, {
                default: () => {
                  var _a;
                  return `<p class="${"small pointer svelte-1ues56k"}">${escape((_a = item.user) == null ? void 0 : _a.username)}</p>
        `;
                }
              })}
        ${validate_component(Link, "Link").$$render($$result, { href: routes.txts + "/" + item.id }, {}, {
                default: () => {
                  return `<p>${escape(item.value)}</p>
        `;
                }
              })}
      `;
            }
          })}
    `;
        }
      })}`;
    })}

  ${validate_component(TxtInput, "TxtInput").$$render($$result, { value, ref }, {
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      },
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      }
    }, {})}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Txt as T };
