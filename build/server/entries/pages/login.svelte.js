import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, i as createEventDispatcher, j as subscribe, l as set_store_value, e as escape_attribute_value, g as add_attribute, h as add_classes, v as validate_component, f as escape, t as each } from "../../chunks/index-706e192e.js";
import "cookie";
import { r as routes } from "../../chunks/routes-fb6e9fa0.js";
import "../../chunks/socket-c916af1c.js";
import { w as writable } from "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import { B as Button } from "../../chunks/Button-b257bd6b.js";
import "flatpickr";
import { F as Form, I as Input } from "../../chunks/Input-0cefd85c.js";
import { R as Row } from "../../chunks/Row-d1968937.js";
import { C as Column } from "../../chunks/Column-a86887bc.js";
import { C as Close } from "../../chunks/Close-75a59370.js";
import { s as session } from "../../chunks/stores-f80eb8f4.js";
import { n as newUser } from "../../chunks/index-ca308a68.js";
import "socket.io-client";
import "../../chunks/TextInput-3971c789.js";
const ButtonSet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["stacked"]);
  let { stacked = false } = $$props;
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--btn-set " + (stacked ? "bx--btn-set--stacked" : "")
  })}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modalLabelId;
  let modalHeadingId;
  let modalBodyId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "alert",
    "passiveModal",
    "modalHeading",
    "modalLabel",
    "modalAriaLabel",
    "iconDescription",
    "hasForm",
    "hasScrollingContent",
    "primaryButtonText",
    "primaryButtonDisabled",
    "primaryButtonIcon",
    "shouldSubmitOnEnter",
    "secondaryButtonText",
    "secondaryButtons",
    "selectorPrimaryFocus",
    "preventCloseOnClickOutside",
    "id",
    "ref"
  ]);
  let $openStore, $$unsubscribe_openStore;
  let { size = void 0 } = $$props;
  let { open = false } = $$props;
  let { danger = false } = $$props;
  let { alert = false } = $$props;
  let { passiveModal = false } = $$props;
  let { modalHeading = void 0 } = $$props;
  let { modalLabel = void 0 } = $$props;
  let { modalAriaLabel = void 0 } = $$props;
  let { iconDescription = "Close the modal" } = $$props;
  let { hasForm = false } = $$props;
  let { hasScrollingContent = false } = $$props;
  let { primaryButtonText = "" } = $$props;
  let { primaryButtonDisabled = false } = $$props;
  let { primaryButtonIcon = void 0 } = $$props;
  let { shouldSubmitOnEnter = true } = $$props;
  let { secondaryButtonText = "" } = $$props;
  let { secondaryButtons = [] } = $$props;
  let { selectorPrimaryFocus = "[data-modal-primary-focus]" } = $$props;
  let { preventCloseOnClickOutside = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  let buttonRef = null;
  let innerModal = null;
  const openStore = writable(open);
  $$unsubscribe_openStore = subscribe(openStore, (value) => $openStore = value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.alert === void 0 && $$bindings.alert && alert !== void 0)
    $$bindings.alert(alert);
  if ($$props.passiveModal === void 0 && $$bindings.passiveModal && passiveModal !== void 0)
    $$bindings.passiveModal(passiveModal);
  if ($$props.modalHeading === void 0 && $$bindings.modalHeading && modalHeading !== void 0)
    $$bindings.modalHeading(modalHeading);
  if ($$props.modalLabel === void 0 && $$bindings.modalLabel && modalLabel !== void 0)
    $$bindings.modalLabel(modalLabel);
  if ($$props.modalAriaLabel === void 0 && $$bindings.modalAriaLabel && modalAriaLabel !== void 0)
    $$bindings.modalAriaLabel(modalAriaLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.primaryButtonIcon === void 0 && $$bindings.primaryButtonIcon && primaryButtonIcon !== void 0)
    $$bindings.primaryButtonIcon(primaryButtonIcon);
  if ($$props.shouldSubmitOnEnter === void 0 && $$bindings.shouldSubmitOnEnter && shouldSubmitOnEnter !== void 0)
    $$bindings.shouldSubmitOnEnter(shouldSubmitOnEnter);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.secondaryButtons === void 0 && $$bindings.secondaryButtons && secondaryButtons !== void 0)
    $$bindings.secondaryButtons(secondaryButtons);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  set_store_value(openStore, $openStore = open, $openStore);
  modalLabelId = `bx--modal-header__label--modal-${id}`;
  modalHeadingId = `bx--modal-header__heading--modal-${id}`;
  modalBodyId = `bx--modal-body--${id}`;
  ariaLabel = modalLabel || $$props["aria-label"] || modalAriaLabel || modalHeading;
  $$unsubscribe_openStore();
  return `
<div${spread([
    { role: "presentation" },
    { id: escape_attribute_value(id) },
    escape_object($$restProps)
  ], {
    classes: "bx--modal " + (!passiveModal ? "bx--modal-tall" : "") + " " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : "")
  })}${add_attribute("this", ref, 0)}><div tabindex="${"-1"}"${add_attribute("role", alert ? passiveModal ? "alert" : "alertdialog" : "dialog", 0)}${add_attribute("aria-describedby", alert && !passiveModal ? modalBodyId : void 0, 0)} aria-modal="${"true"}"${add_attribute("aria-label", ariaLabel, 0)}${add_classes(("bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : "")).trim())}${add_attribute("this", innerModal, 0)}><div${add_classes("bx--modal-header".trim())}>${passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render($$result, {
    size: 20,
    class: "bx--modal-close__icon",
    "aria-hidden": "true"
  }, {}, {})}</button>` : ``}
      ${modalLabel ? `<h2${add_attribute("id", modalLabelId, 0)}${add_classes("bx--modal-header__label".trim())}>${slots.label ? slots.label({}) : `${escape(modalLabel)}`}</h2>` : ``}
      <h3${add_attribute("id", modalHeadingId, 0)}${add_classes("bx--modal-header__heading".trim())}>${slots.heading ? slots.heading({}) : `${escape(modalHeading)}`}</h3>
      ${!passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render($$result, {
    size: 20,
    class: "bx--modal-close__icon",
    "aria-hidden": "true"
  }, {}, {})}</button>` : ``}</div>
    <div${add_attribute("id", modalBodyId, 0)}${add_attribute("tabindex", hasScrollingContent ? "0" : void 0, 0)}${add_attribute("role", hasScrollingContent ? "region" : void 0, 0)}${add_attribute("aria-label", hasScrollingContent ? ariaLabel : void 0, 0)}${add_attribute("aria-labelledby", modalLabel ? modalLabelId : modalHeadingId, 0)}${add_classes(("bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")).trim())}>${slots.default ? slots.default({}) : ``}</div>
    ${hasScrollingContent ? `<div${add_classes("bx--modal-content--overflow-indicator".trim())}></div>` : ``}
    ${!passiveModal ? `<div${add_classes(("bx--modal-footer " + (secondaryButtons.length === 2 ? "bx--modal-footer--three-button" : "")).trim())}>${secondaryButtons.length > 0 ? `${each(secondaryButtons, (button) => {
    return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
      default: () => {
        return `${escape(button.text)}
            `;
      }
    })}`;
  })}` : `${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => {
      return `${escape(secondaryButtonText)}`;
    }
  })}` : ``}`}
        ${validate_component(Button, "Button").$$render($$result, {
    kind: danger ? "danger" : "primary",
    disabled: primaryButtonDisabled,
    icon: primaryButtonIcon
  }, {}, {
    default: () => {
      return `${escape(primaryButtonText)}`;
    }
  })}</div>` : ``}</div></div>`;
});
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
  let $newUser, $$unsubscribe_newUser;
  $$unsubscribe_session = subscribe(session, (value) => value);
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
  $$unsubscribe_newUser();
  return $$rendered;
});
export { Login as default, load };
