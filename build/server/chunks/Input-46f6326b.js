import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, g as add_attribute, e as escape_attribute_value, f as escape, k as compute_slots, q as getContext, h as add_classes, v as validate_component, m as missing_component } from "./index-706e192e.js";
import "./HeaderSearch.svelte_svelte_type_style_lang-6a6eb170.js";
import { W as WarningFilled, a as WarningAltFilled, T as TextInput } from "./TextInput-3971c789.js";
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref"]);
  let { ref = null } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
<form${spread([escape_object($$restProps)], { classes: "bx--form" })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</form>`;
});
const View = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread([
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { preserveAspectRatio: "xMidYMid meet" },
    { width: escape_attribute_value(size) },
    { height: escape_attribute_value(size) },
    escape_object(attributes),
    escape_object($$restProps)
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-12.93-9C5.1,10.93,10.7,7,16,7s10.9,3.93,12.93,9C26.9,21.07,21.3,25,16,25Z"}"></path><path d="${"M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"}"></path></svg>`;
});
const ViewOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread([
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { preserveAspectRatio: "xMidYMid meet" },
    { width: escape_attribute_value(size) },
    { height: escape_attribute_value(size) },
    escape_object(attributes),
    escape_object($$restProps)
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M5.24,22.51l1.43-1.42A14.06,14.06,0,0,1,3.07,16C5.1,10.93,10.7,7,16,7a12.38,12.38,0,0,1,4,.72l1.55-1.56A14.72,14.72,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16,16,0,0,0,5.24,22.51Z"}"></path><path d="${"M12 15.73a4 4 0 013.7-3.7l1.81-1.82a6 6 0 00-7.33 7.33zM30.94 15.66A16.4 16.4 0 0025.2 8.22L30 3.41 28.59 2 2 28.59 3.41 30l5.1-5.1A15.29 15.29 0 0016 27 16.69 16.69 0 0030.94 16.34 1 1 0 0030.94 15.66zM20 16a4 4 0 01-6 3.44L19.44 14A4 4 0 0120 16zm-4 9a13.05 13.05 0 01-6-1.58l2.54-2.54a6 6 0 008.35-8.35l2.87-2.87A14.54 14.54 0 0128.93 16C26.9 21.07 21.3 25 16 25z"}"></path></svg>`;
});
const PasswordInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "hidePasswordLabel",
    "showPasswordLabel",
    "tooltipAlignment",
    "tooltipPosition",
    "light",
    "disabled",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "inline",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { type = "password" } = $$props;
  let { placeholder = "" } = $$props;
  let { hidePasswordLabel = "Hide password" } = $$props;
  let { showPasswordLabel = "Show password" } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { inline = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.hidePasswordLabel === void 0 && $$bindings.hidePasswordLabel && hidePasswordLabel !== void 0)
    $$bindings.hidePasswordLabel(hidePasswordLabel);
  if ($$props.showPasswordLabel === void 0 && $$bindings.showPasswordLabel && showPasswordLabel !== void 0)
    $$bindings.showPasswordLabel(showPasswordLabel);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `
<div${add_classes(("bx--form-item bx--text-input-wrapper " + (!isFluid ? "bx--password-input-wrapper" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (inline ? "bx--text-input-wrapper--inline" : "")).trim())}>${inline ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline--sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline--xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>
    ${!isFluid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}` : ``}
  ${!inline && (labelText || $$slots.labelText) ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline--sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline--xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>` : ``}
  <div${add_classes(("bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")).trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(("bx--text-input__field-wrapper " + (warn ? "bx--text-input__field-wrapper--warning" : "")).trim())}>${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render($$result, {
    class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
      <input${spread([
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
    },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    {
      value: escape_attribute_value(value ?? "")
    },
    { disabled: disabled || null },
    escape_object($$restProps)
  ], {
    classes: "bx--text-input bx--password-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warning" : "") + " " + (size === "sm" ? "bx--text-input--sm" : "") + " " + (size === "xl" ? "bx--text-input--xl" : "")
  })}${add_attribute("this", ref, 0)}>
      <button type="${"button"}" ${disabled ? "disabled" : ""}${add_classes(("bx--text-input--password__visibility__toggle bx--btn bx--btn--icon-only " + (disabled ? "bx--btn--disabled" : "") + " bx--tooltip__trigger bx--tooltip--a11y " + (tooltipPosition === "top" ? "bx--tooltip--top" : "") + " " + (tooltipPosition === "right" ? "bx--tooltip--right" : "") + " " + (tooltipPosition === "bottom" ? "bx--tooltip--bottom" : "") + " " + (tooltipPosition === "left" ? "bx--tooltip--left" : "") + " " + (tooltipAlignment === "start" ? "bx--tooltip--align-start" : "") + " " + (tooltipAlignment === "center" ? "bx--tooltip--align-center" : "") + " " + (tooltipAlignment === "end" ? "bx--tooltip--align-end" : "")).trim())}>${!disabled ? `<span${add_classes("bx--assistive-text".trim())}>${type === "text" ? `${escape(hidePasswordLabel)}` : `${escape(showPasswordLabel)}`}</span>` : ``}
        ${type === "text" ? `${validate_component(ViewOff, "ViewOff").$$render($$result, { class: "bx--icon-visibility-off" }, {}, {})}` : `${validate_component(View, "View").$$render($$result, { class: "bx--icon-visibility-on" }, {}, {})}`}</button></div>
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
    ${!invalid && !warn && !isFluid && !inline ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
const Invalid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["autoFocusInvalid", "ref", "value", "password"]);
  let { autoFocusInvalid = true } = $$props;
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { password = "" } = $$props;
  if ($$props.autoFocusInvalid === void 0 && $$bindings.autoFocusInvalid && autoFocusInvalid !== void 0)
    $$bindings.autoFocusInvalid(autoFocusInvalid);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${password ? `${validate_component(PasswordInput, "PasswordInput").$$render($$result, Object.assign({ invalid: true }, $$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}` : `${validate_component(TextInput, "TextInput").$$render($$result, Object.assign({ invalid: true }, $$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`}`;
  } while (!$$settled);
  return $$rendered;
});
const Valid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref", "value", "password"]);
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { password = "" } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${password ? `${validate_component(PasswordInput, "PasswordInput").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}` : `${validate_component(TextInput, "TextInput").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`}`;
  } while (!$$settled);
  return $$rendered;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["autovalidate", "ref", "value", "invalid"]);
  let { autovalidate = true } = $$props;
  let { ref = null } = $$props;
  let { value = "" } = $$props;
  let { invalid = false } = $$props;
  let current = Valid;
  const autovalid = () => {
    invalid = false;
  };
  if ($$props.autovalidate === void 0 && $$bindings.autovalidate && autovalidate !== void 0)
    $$bindings.autovalidate(autovalidate);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (autovalidate) {
        autovalid();
      }
    }
    {
      if (invalid) {
        current = Invalid;
      } else {
        current = Valid;
      }
    }
    $$rendered = `${validate_component(current || missing_component, "svelte:component").$$render($$result, Object.assign($$restProps, { ref }, { value }), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export { Form as F, Input as I };
