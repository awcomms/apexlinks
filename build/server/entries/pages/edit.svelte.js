import { c as create_ssr_component, a as compute_rest_props, s as setContext, v as validate_component, j as subscribe, b as spread, d as escape_object } from "../../chunks/index-706e192e.js";
import "cookie";
import { r as routes } from "../../chunks/routes-fb6e9fa0.js";
import "../../chunks/socket-c916af1c.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6a6eb170.js";
import { B as Button } from "../../chunks/Button-b257bd6b.js";
import { C as Checkbox, T as Tags } from "../../chunks/Tags-dd265a95.js";
import { F as Form, I as Input } from "../../chunks/Input-46f6326b.js";
import { R as Row } from "../../chunks/Row-d1968937.js";
import { C as Column } from "../../chunks/Column-a86887bc.js";
import { s as session } from "../../chunks/stores-f80eb8f4.js";
import "socket.io-client";
import "../../chunks/index-cf6f227c.js";
import "../../chunks/Tag-8f483cdc.js";
import "../../chunks/Close-75a59370.js";
/* empty css                                                        */import "../../chunks/TextInput-3971c789.js";
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
