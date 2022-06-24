import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, h as add_classes, i as createEventDispatcher, v as validate_component, g as add_attribute, f as escape, j as subscribe, q as getContext, s as setContext, e as escape_attribute_value, k as compute_slots, m as missing_component, t as each } from "./index-706e192e.js";
import { a as notify } from "./index-ca308a68.js";
import { w as writable } from "./HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { T as Tag } from "./Tag-8f483cdc.js";
/* empty css                                             */import { B as Button } from "./Button-b257bd6b.js";
const CheckboxSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `
<div${spread([escape_object($$restProps)], {
    classes: "bx--form-item bx--checkbox-wrapper bx--checkbox-label"
  })}><span${add_classes("bx--checkbox-label-text bx--skeleton".trim())}></span></div>`;
});
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let useGroup;
  let isTruncated;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "checked",
    "group",
    "indeterminate",
    "skeleton",
    "required",
    "readonly",
    "disabled",
    "labelText",
    "hideLabel",
    "name",
    "title",
    "id",
    "ref"
  ]);
  let { value = "" } = $$props;
  let { checked = false } = $$props;
  let { group = void 0 } = $$props;
  let { indeterminate = false } = $$props;
  let { skeleton = false } = $$props;
  let { required = false } = $$props;
  let { readonly = false } = $$props;
  let { disabled = false } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { name = "" } = $$props;
  let { title = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  let refLabel = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
    $$bindings.indeterminate(indeterminate);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  useGroup = Array.isArray(group);
  checked = useGroup ? group.includes(value) : checked;
  {
    dispatch("check", checked);
  }
  isTruncated = (refLabel == null ? void 0 : refLabel.offsetWidth) < (refLabel == null ? void 0 : refLabel.scrollWidth);
  title = !title && isTruncated ? refLabel == null ? void 0 : refLabel.innerText : title;
  return `
${skeleton ? `${validate_component(CheckboxSkeleton, "CheckboxSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `<div${spread([escape_object($$restProps)], {
    classes: "bx--form-item bx--checkbox-wrapper"
  })}><input type="${"checkbox"}"${add_attribute("value", value, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("name", name, 0)} ${required ? "required" : ""} ${readonly ? "readonly" : ""}${add_classes("bx--checkbox".trim())}${add_attribute("this", ref, 0)}>
    <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_classes("bx--checkbox-label".trim())}><span${add_classes(("bx--checkbox-label-text " + (hideLabel ? "bx--visually-hidden" : "")).trim())}${add_attribute("this", refLabel, 0)}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</span></label></div>`}`;
});
let direction = 1;
const ContextMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let level;
  let $$restProps = compute_rest_props($$props, ["target", "open", "x", "y", "ref"]);
  let $$unsubscribe_hasPopup;
  let { target = null } = $$props;
  let { open = false } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  const position = writable([x, y]);
  const currentIndex = writable(-1);
  const hasPopup = writable(false);
  $$unsubscribe_hasPopup = subscribe(hasPopup, (value) => value);
  const menuOffsetX = writable(0);
  const ctx = getContext("ContextMenu");
  let focusIndex = -1;
  function close() {
    open = false;
    x = 0;
    y = 0;
    focusIndex = -1;
  }
  function openMenu(e) {
    const { height, width } = ref.getBoundingClientRect();
    if (open || x === 0) {
      if (window.innerWidth - width < e.x) {
        x = e.x - width;
      } else {
        x = e.x;
      }
    }
    if (open || y === 0) {
      menuOffsetX.set(e.x);
      if (window.innerHeight - height < e.y) {
        y = e.y - height;
      } else {
        y = e.y;
      }
    }
    position.set([x, y]);
    open = true;
    e.target;
  }
  setContext("ContextMenu", {
    menuOffsetX,
    currentIndex,
    position,
    close,
    setPopup: (popup) => {
      hasPopup.set(popup);
    }
  });
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (target != null) {
      if (Array.isArray(target)) {
        target.forEach((node) => node == null ? void 0 : node.addEventListener("contextmenu", openMenu));
      } else {
        target.addEventListener("contextmenu", openMenu);
      }
    }
  }
  level = !ctx ? 1 : 2;
  {
    currentIndex.set(focusIndex);
  }
  $$unsubscribe_hasPopup();
  return `

<ul${spread([
    { role: "menu" },
    { tabindex: "-1" },
    {
      "data-direction": escape_attribute_value(direction)
    },
    {
      "data-level": escape_attribute_value(level)
    },
    escape_object($$restProps),
    {
      style: "left: " + escape(x) + "px; top: " + escape(y) + "px; " + escape($$restProps.style)
    }
  ], {
    classes: "bx--menu " + (open ? "bx--menu--open" : "") + " " + (open && x === 0 && y === 0 ? "bx--menu--invisible" : "") + " " + (level === 1 ? "bx--menu--root" : "")
  })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</ul>`;
});
const Checkmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"}"></path></svg>`;
});
const CaretRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M12 8L22 16 12 24z"}"></path></svg>`;
});
const ContextMenuOption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSelectable;
  let isRadio;
  let subOptions;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "disabled",
    "indented",
    "icon",
    "labelText",
    "selected",
    "selectable",
    "shortcutText",
    "id",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "default" } = $$props;
  let { disabled = false } = $$props;
  let { indented = false } = $$props;
  let { icon = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { selected = false } = $$props;
  let { selectable = false } = $$props;
  let { shortcutText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  const ctx = getContext("ContextMenu");
  const ctxGroup = getContext("ContextMenuGroup");
  const ctxRadioGroup = getContext("ContextMenuRadioGroup");
  let role = "menuitem";
  let submenuOpen = false;
  let submenuPosition = [0, 0];
  ctx.position.subscribe((position) => {
  });
  ctx.menuOffsetX.subscribe((_menuOffsetX) => {
  });
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.indented === void 0 && $$bindings.indented && indented !== void 0)
    $$bindings.indented(indented);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
    $$bindings.selectable(selectable);
  if ($$props.shortcutText === void 0 && $$bindings.shortcutText && shortcutText !== void 0)
    $$bindings.shortcutText(shortcutText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  isSelectable = !!ctxGroup || selectable;
  isRadio = !!ctxRadioGroup;
  subOptions = $$slots.default;
  {
    ctx.setPopup(submenuOpen);
  }
  {
    {
      if (isSelectable) {
        indented = true;
        role = "menuitemcheckbox";
        if (selected) {
          if (ctxGroup)
            ctxGroup.addOption({ id });
          icon = Checkmark;
        } else {
          icon = void 0;
        }
      }
      if (isRadio) {
        indented = true;
        role = "menuitemradio";
        ctxRadioGroup.addOption({ id });
        if (selected) {
          if (ctxRadioGroup)
            ctxRadioGroup.setOption({ id });
          icon = Checkmark;
        } else {
          icon = void 0;
        }
      }
    }
  }
  return `<li${spread([
    { role: escape_attribute_value(role) },
    { tabindex: "-1" },
    {
      "aria-disabled": escape_attribute_value(!subOptions && disabled)
    },
    {
      "aria-haspopup": escape_attribute_value(subOptions ? true : void 0)
    },
    {
      "aria-expanded": escape_attribute_value(subOptions ? submenuOpen : void 0)
    },
    {
      indented: escape_attribute_value(indented)
    },
    {
      "aria-checked": escape_attribute_value(isSelectable || isRadio ? selected : void 0)
    },
    {
      "data-nested": escape_attribute_value(ref && ref.closest(".bx--menu").getAttribute("data-level") === "2")
    },
    {
      "data-sub": escape_attribute_value(subOptions)
    },
    { "data-id": escape_attribute_value(id) },
    escape_object($$restProps)
  ], {
    classes: "bx--menu-option bx--menu-option--disabled " + (subOptions && submenuOpen ? "bx--menu-option--active" : "") + " " + (!subOptions && kind === "danger" ? "bx--menu-option--danger" : "")
  })}${add_attribute("this", ref, 0)}>${subOptions ? `<div${add_classes(("bx--menu-option__content " + (disabled ? "bx--menu-option__content--disabled" : "")).trim())}>${indented ? `<div${add_classes("bx--menu-option__icon".trim())}>${slots.icon ? slots.icon({}) : `
            ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
          `}</div>` : ``}
      <span${add_attribute("title", labelText, 0)}${add_classes("bx--menu-option__label".trim())}>${slots.labelText ? slots.labelText({}) : `${escape(labelText)}`}</span>
      <div${add_classes("bx--menu-option__info".trim())}>${validate_component(CaretRight, "CaretRight").$$render($$result, {}, {}, {})}</div></div>

    ${validate_component(ContextMenu, "ContextMenu").$$render($$result, {
    open: submenuOpen,
    x: submenuPosition[0],
    y: submenuPosition[1]
  }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : `<div${add_classes(("bx--menu-option__content " + (disabled ? "bx--menu-option__content--disabled" : "")).trim())}>${indented ? `<div${add_classes("bx--menu-option__icon".trim())}>${slots.icon ? slots.icon({}) : `
            ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
          `}</div>` : ``}
      <span${add_attribute("title", labelText, 0)}${add_classes("bx--menu-option__label".trim())}>${slots.labelText ? slots.labelText({}) : `${escape(labelText)}`}</span>
      <div${add_classes("bx--menu-option__info".trim())}>${slots.shortcutText ? slots.shortcutText({}) : `${escape(shortcutText)}`}</div></div>`}</li>`;
});
const WarningAlt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16 23a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 23zM15 12H17V21H15z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path></svg>`;
});
const css$1 = {
  code: ".s.svelte-q3yywv{font-size:var(--cds-label-01-font-size, 0.75rem);font-weight:var(--cds-label-01-font-weight, 400);line-height:var(--cds-label-01-line-height, 1.33333);letter-spacing:var(--cds-label-01-letter-spacing, 0.32px);visibility:hidden;height:0;width:fit-content}input.svelte-q3yywv{font-size:var(--cds-label-01-font-size, 0.75rem);font-weight:var(--cds-label-01-font-weight, 400);line-height:var(--cds-label-01-line-height, 1.33333);letter-spacing:var(--cds-label-01-letter-spacing, 0.32px);margin:0 0;outline:none;appearance:none;border:none;background-color:rgba(0, 0, 0, 0)}input.svelte-q3yywv:focus{outline:none;border:none}",
  map: null
};
const Tag_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { valueRef: input } = $$props;
  let { inputEventDelay = 0 } = $$props;
  let { warning = false } = $$props;
  let { filter } = $$props;
  let { value = "" } = $$props;
  let { type = "cool-gray" } = $$props;
  let { editable = false } = $$props;
  let { ref } = $$props;
  let s;
  createEventDispatcher();
  if ($$props.valueRef === void 0 && $$bindings.valueRef && input !== void 0)
    $$bindings.valueRef(input);
  if ($$props.inputEventDelay === void 0 && $$bindings.inputEventDelay && inputEventDelay !== void 0)
    $$bindings.inputEventDelay(inputEventDelay);
  if ($$props.warning === void 0 && $$bindings.warning && warning !== void 0)
    $$bindings.warning(warning);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0)
    $$bindings.filter(filter);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (warning && input) {
        input.focus();
      }
    }
    $$rendered = `<div class="${"s svelte-q3yywv"}"${add_attribute("this", s, 0)}>${escape(value)}</div>

${validate_component(Tag, "Tag").$$render($$result, { type, filter, ref }, {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `${editable ? `
    <input spellcheck="${"false"}" class="${"svelte-q3yywv"}"${add_attribute("this", input, 0)}${add_attribute("value", value, 0)}>
    
    ${warning ? `${validate_component(WarningAlt, "WarningAlt").$$render($$result, {}, {}, {})}` : ``}` : `${escape(value)}
    ${slots.default ? slots.default({}) : ``}`}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"}"></path></svg>`;
});
const css = {
  code: ".head.svelte-1ebf017{display:grid;grid-template-columns:repeat(2, min-content)}.title.svelte-1ebf017{width:max-content}",
  map: null
};
const Tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notify;
  $$unsubscribe_notify = subscribe(notify, (value) => value);
  let { prefix = "" } = $$props;
  let { text = "" } = $$props;
  let { editable = true } = $$props;
  let { showUseOptions = false } = $$props;
  let { useOptions = false } = $$props;
  let { hidable = false } = $$props;
  let { open = false } = $$props;
  let { tags = [] } = $$props;
  let { focusLast = false } = $$props;
  createEventDispatcher();
  let focused;
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.showUseOptions === void 0 && $$bindings.showUseOptions && showUseOptions !== void 0)
    $$bindings.showUseOptions(showUseOptions);
  if ($$props.useOptions === void 0 && $$bindings.useOptions && useOptions !== void 0)
    $$bindings.useOptions(useOptions);
  if ($$props.hidable === void 0 && $$bindings.hidable && hidable !== void 0)
    $$bindings.hidable(hidable);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.focusLast === void 0 && $$bindings.focusLast && focusLast !== void 0)
    $$bindings.focusLast(focusLast);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

${text ? `<p>${escape(text)}</p>` : ``}
<div class="${"head svelte-1ebf017"}"><p class="${"title svelte-1ebf017"}">${escape(tags.length)}
    ${escape(`${tags.length === 1 ? `${prefix}tag` : `${prefix}tags`}`)}</p>
  ${validate_component(Button, "Button").$$render($$result, {
      kind: "ghost",
      size: "small",
      hasIconOnly: true,
      icon: Add,
      iconDescription: "Add a tag"
    }, {}, {})}</div>
${slots.default ? slots.default({}) : ``}

${showUseOptions ? `${validate_component(Checkbox, "Checkbox").$$render($$result, {
      labelText: "Use options",
      checked: useOptions
    }, {
      checked: ($$value) => {
        useOptions = $$value;
        $$settled = false;
      }
    }, {})}` : ``}

${open ? `${editable && tags.length > 0 ? `${validate_component(Tag_1, "Tag").$$render($$result, { type: "magenta" }, {}, {
      default: () => {
        return `Clear`;
      }
    })}` : ``}
  ${each(tags, (tag) => {
      return `${editable && hidable ? `${validate_component(ContextMenu, "ContextMenu").$$render($$result, { target: tag.ref }, {}, {
        default: () => {
          return `${validate_component(ContextMenuOption, "ContextMenuOption").$$render($$result, {
            selectable: true,
            labelText: "Hide",
            selected: tag.hide
          }, {
            selected: ($$value) => {
              tag.hide = $$value;
              $$settled = false;
            }
          }, {})}
      `;
        }
      })}` : ``}

    ${validate_component(Tag_1, "Tag").$$render($$result, {
        inputEventDelay: 2100,
        filter: true,
        focusOnMount: true,
        editable: true,
        label: tag.label,
        value: tag.value,
        inputRef: tag.inputRef,
        ref: tag.ref,
        focused
      }, {
        label: ($$value) => {
          tag.label = $$value;
          $$settled = false;
        },
        value: ($$value) => {
          tag.value = $$value;
          $$settled = false;
        },
        inputRef: ($$value) => {
          tag.inputRef = $$value;
          $$settled = false;
        },
        ref: ($$value) => {
          tag.ref = $$value;
          $$settled = false;
        },
        focused: ($$value) => {
          focused = $$value;
          $$settled = false;
        }
      }, {})}`;
    })}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_notify();
  return $$rendered;
});
export { Checkbox as C, Tags as T };
