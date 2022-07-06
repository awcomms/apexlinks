import { c as create_ssr_component, a as compute_rest_props, i as add_classes, g as add_attribute, f as escape, v as validate_component, b as spread, e as escape_attribute_value, d as escape_object, k as compute_slots } from "../../../../chunks/index-70dffb27.js";
import { a as api } from "../../../../chunks/api-38343fdb.js";
import "../../../../chunks/parseMarkdown-2f2db9f5.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import { B as Button } from "../../../../chunks/Button-fa0593f7.js";
import { C as Checkbox, T as Tags } from "../../../../chunks/Tags-22bd6bc0.js";
import "flatpickr";
import { R as Row, C as Column } from "../../../../chunks/Column-9dd4af0c.js";
import { I as InlineLoading } from "../../../../chunks/InlineLoading-dd3cecbe.js";
import { W as WarningFilled, T as TextInput } from "../../../../chunks/TextInput-badba880.js";
import "socket.io-client";
import { D as Delete } from "../../../../chunks/Delete-fad7343b.js";
import "../../../../chunks/send-95f08c33.js";
import "cookie";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
import "../../../../chunks/index-3f4ef6a9.js";
import "../../../../chunks/Loading-8d26f732.js";
import "../../../../chunks/stores-1f04fa1d.js";
import "../../../../chunks/Modal-537a947a.js";
const TextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "placeholder",
    "cols",
    "rows",
    "maxCount",
    "light",
    "disabled",
    "readonly",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { cols = 50 } = $$props;
  let { rows = 4 } = $$props;
  let { maxCount = void 0 } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { readonly = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.maxCount === void 0 && $$bindings.maxCount && maxCount !== void 0)
    $$bindings.maxCount(maxCount);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
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
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  return `
<div${add_classes("bx--form-item".trim())}>${(labelText || $$slots.labelText) && !hideLabel ? `<div${add_classes("bx--text-area__label-wrapper".trim())}><label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</label>
      ${maxCount ? `<div${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "")).trim())}>${escape(value.length)}/${escape(maxCount)}</div>` : ``}</div>` : ``}
  <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes("bx--text-area__wrapper".trim())}>${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-area__invalid-icon" }, {}, {})}` : ``}
    <textarea${spread([
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : void 0)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name) },
    { cols: escape_attribute_value(cols) },
    { rows: escape_attribute_value(rows) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { readonly: readonly || null },
    {
      maxlength: escape_attribute_value(maxCount ?? void 0)
    },
    escape_object($$restProps)
  ], {
    classes: "bx--text-area " + (light ? "bx--text-area--light" : "") + " " + (invalid ? "bx--text-area--invalid" : "")
  })}${add_attribute("this", ref, 0)}>${value || ""}</textarea></div>
  ${!invalid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}
  ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}</div>`;
});
var edit_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".right.svelte-1ensibi{float:right}")();
const css = {
  code: ".right.svelte-1ensibi{float:right}",
  map: null
};
const load = async ({ params, fetch }) => {
  const { id } = params;
  const include = ["value", "tags", "txt", "self", "personal", "dm"];
  const txt = await api.get(`txts/${id}?include=${JSON.stringify(include)}`, fetch);
  if (!txt.OK) {
    return {
      error: txt.error,
      status: Number(txt.STATUS)
    };
  }
  return { props: { txt } };
};
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { txt } = $$props;
  let open;
  let deleteLoading;
  let { value, tags, text, self, personal } = txt;
  if (!tags)
    tags = [];
  if ($$props.txt === void 0 && $$bindings.txt && txt !== void 0)
    $$bindings.txt(txt);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Delete, "Delete").$$render($$result, { txt, open, loading: deleteLoading }, {
      open: ($$value) => {
        open = $$value;
        $$settled = false;
      },
      loading: ($$value) => {
        deleteLoading = $$value;
        $$settled = false;
      }
    }, {})}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${!txt.dm ? `${validate_component(Checkbox, "Checkbox").$$render($$result, {
              labelText: "disable public replies",
              checked: self
            }, {
              checked: ($$value) => {
                self = $$value;
                $$settled = false;
              }
            }, {})}
      ${validate_component(Checkbox, "Checkbox").$$render($$result, {
              labelText: "personal - only you can view this txt",
              checked: personal
            }, {
              checked: ($$value) => {
                personal = $$value;
                $$settled = false;
              }
            }, {})}` : ``}
    ${validate_component(Tags, "Tags").$$render($$result, { text: "edit this txt's tags", tags }, {
              tags: ($$value) => {
                tags = $$value;
                $$settled = false;
              }
            }, {})}
    <br>
    ${validate_component(TextInput, "TextInput").$$render($$result, { labelText: "txt value", value }, {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            }, {})}
    <br>
    ${validate_component(TextArea, "TextArea").$$render($$result, {
              labelText: "description text about this txt",
              helperText: "works with markdown",
              value: text
            }, {
              value: ($$value) => {
                text = $$value;
                $$settled = false;
              }
            }, {})}
    <br>
    ${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
              default: ({ props }) => {
                return `<div${spread([escape_object(props)], { classes: "svelte-1ensibi" })}><p>Edit</p>
        ${``}</div>`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { as: true }, {}, {
              default: ({ props }) => {
                return `<div${spread([escape_object(props)], { classes: "svelte-1ensibi" })}><p>Delete</p>
        ${deleteLoading ? `<div class="${"right svelte-1ensibi"}">${validate_component(InlineLoading, "InlineLoading").$$render($$result, {}, {}, {})}</div>` : ``}</div>`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export { Edit as default, load };
