import { c as create_ssr_component, a as compute_rest_props, s as setContext, v as validate_component, h as subscribe, b as spread, d as escape_object } from "../../chunks/index-70dffb27.js";
import "cookie";
import { r as routes } from "../../chunks/routes-2be82c1b.js";
import "../../chunks/parseMarkdown-2f2db9f5.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import { B as Button } from "../../chunks/Button-fa0593f7.js";
import { C as Checkbox, T as Tags } from "../../chunks/Tags-22bd6bc0.js";
import "flatpickr";
import { F as Form, I as Input } from "../../chunks/Input-1efa1ffa.js";
import { R as Row, C as Column } from "../../chunks/Column-9dd4af0c.js";
import { s as session } from "../../chunks/stores-1f04fa1d.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
import "../../chunks/index-3f4ef6a9.js";
import "../../chunks/TextInput-badba880.js";
const FluidForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  setContext("Form", { isFluid: true });
  return `${validate_component(Form, "Form").$$render($$result, Object.assign($$restProps, {
    class: "bx--form--fluid " + $$restProps.class
  }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
var edit_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".right.svelte-1ensibi{float:right}")();
const css = {
  code: ".right.svelte-1ensibi{float:right}",
  map: null
};
const load = async ({ session: session2 }) => {
  let user = session2.user;
  if (!user) {
    return { status: 302, redirect: routes.login };
  }
  return {
    props: { user }
  };
};
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  let { user } = $$props;
  let username = user.username;
  let hidden = user.hidden;
  user.image;
  let tags = user.tags || [];
  let usernameInvalid;
  let usernameError;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<h1>Edit your profile</h1>`;
          }
        })}`;
      }
    })}

<br>

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Checkbox, "Checkbox").$$render($$result, {
              labelText: "Hide profile from public",
              checked: hidden
            }, {
              checked: ($$value) => {
                hidden = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}`;
      }
    })}

${validate_component(Tags, "Tag").$$render($$result, { hidable: true, tags }, {
      tags: ($$value) => {
        tags = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(FluidForm, "FluidForm").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Input, "Input").$$render($$result, {
                  labelText: "Username",
                  invalidText: usernameError,
                  invalid: usernameInvalid,
                  value: username
                }, {
                  invalidText: ($$value) => {
                    usernameError = $$value;
                    $$settled = false;
                  },
                  invalid: ($$value) => {
                    usernameInvalid = $$value;
                    $$settled = false;
                  },
                  value: ($$value) => {
                    username = $$value;
                    $$settled = false;
                  }
                }, {})}`;
              }
            })}`;
          }
        })}`;
      }
    })}

<br>
${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {})}`;
      }
    })}
<br>

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
              default: ({ props }) => {
                return `<div${spread([escape_object(props)], { classes: "svelte-1ensibi" })}><p>Edit</p>
        ${``}</div>`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_session();
  return $$rendered;
});
export { Edit as default, load };
