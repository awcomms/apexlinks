import { c as create_ssr_component, h as subscribe, v as validate_component, b as spread, d as escape_object, f as escape } from "../../chunks/index-70dffb27.js";
import "cookie";
import { r as routes } from "../../chunks/routes-2be82c1b.js";
import "../../chunks/parseMarkdown-2f2db9f5.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import { B as Button } from "../../chunks/Button-fa0593f7.js";
import { B as ButtonSet } from "../../chunks/ButtonSet-820f91e3.js";
import "flatpickr";
import { F as Form, I as Input } from "../../chunks/Input-1efa1ffa.js";
import { R as Row, C as Column } from "../../chunks/Column-9dd4af0c.js";
import { M as Modal } from "../../chunks/Modal-537a947a.js";
import { s as session } from "../../chunks/stores-1f04fa1d.js";
import { p as previousPage, n as newUser } from "../../chunks/index-3f4ef6a9.js";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
import "../../chunks/TextInput-badba880.js";
var login_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "@font-face{font-family:round;src:url('/junegull.ttf')}#head.svelte-1qu8hie{font-family:round}.right.svelte-1qu8hie{float:right}")();
const css = {
  code: "@font-face{font-family:round;src:url('/junegull.ttf')}#head.svelte-1qu8hie{font-family:round}.right.svelte-1qu8hie{float:right}",
  map: null
};
const load = ({ session: session2 }) => {
  if (session2.user) {
    return { redirect: routes.index, status: 302 };
  }
  return { props: {} };
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  let $$unsubscribe_previousPage;
  let $newUser, $$unsubscribe_newUser;
  $$unsubscribe_session = subscribe(session, (value) => value);
  $$unsubscribe_previousPage = subscribe(previousPage, (value) => value);
  $$unsubscribe_newUser = subscribe(newUser, (value) => $newUser = value);
  let userText;
  let usernameInvalid = false;
  let username = null;
  let usernameError;
  let usernameRef;
  let passwordRef;
  let emailRef;
  let passwordInvalid = false;
  let password = null;
  let passwordError;
  let emailInvalid = false;
  let emailError = "Invalid Email";
  let email;
  let noPasswordModal;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if ($newUser) {
        userText = "Login instead";
      } else {
        userText = "Join instead";
      }
    }
    $$rendered = `





${validate_component(Modal, "Modal").$$render($$result, {
      danger: true,
      modalHeading: "Create user account without a password",
      primaryButtonText: "Confirm",
      secondaryButtonText: "Cancel",
      open: noPasswordModal
    }, {
      open: ($$value) => {
        noPasswordModal = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<p>This will create a user account without a password, allowing
        anyone to access it. Continue?
    </p>`;
      }
    })}

${$$result.head += `${$$result.title = `<title>Login</title>`, ""}`, ""}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, { sm: 8, md: 8, lg: 8, xlg: 8 }, {}, {
          default: () => {
            return `${validate_component(Form, "Form").$$render($$result, {}, {}, {
              default: () => {
                return `${$newUser ? `${validate_component(Input, "Input").$$render($$result, {
                  invalidText: emailError,
                  labelText: "Email",
                  focus: true,
                  invalid: emailInvalid,
                  ref: emailRef,
                  value: email
                }, {
                  invalid: ($$value) => {
                    emailInvalid = $$value;
                    $$settled = false;
                  },
                  ref: ($$value) => {
                    emailRef = $$value;
                    $$settled = false;
                  },
                  value: ($$value) => {
                    email = $$value;
                    $$settled = false;
                  }
                }, {})}` : ``}
            ${validate_component(Input, "Input").$$render($$result, {
                  invalidText: usernameError,
                  labelText: "Username",
                  invalid: usernameInvalid,
                  value: username,
                  ref: usernameRef
                }, {
                  invalid: ($$value) => {
                    usernameInvalid = $$value;
                    $$settled = false;
                  },
                  value: ($$value) => {
                    username = $$value;
                    $$settled = false;
                  },
                  ref: ($$value) => {
                    usernameRef = $$value;
                    $$settled = false;
                  }
                }, {})}
            ${`${validate_component(Input, "Input").$$render($$result, {
                  invalidText: passwordError,
                  labelText: "Password",
                  password: true,
                  invalid: passwordInvalid,
                  value: password,
                  ref: passwordRef
                }, {
                  invalid: ($$value) => {
                    passwordInvalid = $$value;
                    $$settled = false;
                  },
                  value: ($$value) => {
                    password = $$value;
                    $$settled = false;
                  },
                  ref: ($$value) => {
                    passwordRef = $$value;
                    $$settled = false;
                  }
                }, {})}`}
            ${validate_component(ButtonSet, "ButtonSet").$$render($$result, { stacked: true }, {}, {
                  default: () => {
                    return `${!$newUser ? `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
                      default: ({ props }) => {
                        return `<div${spread([escape_object(props)], { classes: "svelte-1qu8hie" })}><p>Login</p>
                            ${``}</div>`;
                      }
                    })}
                    ` : `${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
                      default: ({ props }) => {
                        return `<div${spread([escape_object(props)], { classes: "svelte-1qu8hie" })}><p>Join</p>
                            ${``}</div>`;
                      }
                    })}`}
                ${validate_component(Button, "Button").$$render($$result, { kind: "ghost", size: "small" }, {}, {
                      default: () => {
                        return `${escape(userText)}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}
    ${validate_component(Column, "Column").$$render($$result, {}, {}, {})}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_session();
  $$unsubscribe_previousPage();
  $$unsubscribe_newUser();
  return $$rendered;
});
export { Login as default, load };
