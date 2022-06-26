import { c as create_ssr_component, j as subscribe, i as createEventDispatcher, l as set_store_value, v as validate_component, t as each, f as escape } from "../../chunks/index-706e192e.js";
import "../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { R as Row } from "../../chunks/Row-d1968937.js";
import { C as Column } from "../../chunks/Column-a86887bc.js";
import "cookie";
import "../../chunks/socket-c916af1c.js";
import { u as users, b as userTags, s as selectedUsers } from "../../chunks/index-ca308a68.js";
import { T as Tags } from "../../chunks/Tags-8ac9097a.js";
import "socket.io-client";
import "../../chunks/Tag-8f483cdc.js";
import "../../chunks/Close-75a59370.js";
/* empty css                                                        */import "../../chunks/Button-b257bd6b.js";
var Users_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".selected.svelte-yomnls{background-color:gray}.actions.svelte-yomnls{margin-right:1rem}.label.svelte-yomnls{padding-left:0.5rem}.user.svelte-yomnls{display:flex;flex-direction:row}.pointer.svelte-yomnls:hover{color:rgb(52, 59, 204);cursor:pointer}")();
const css = {
  code: ".selected.svelte-yomnls{background-color:gray}.actions.svelte-yomnls{margin-right:1rem}.label.svelte-yomnls{padding-left:0.5rem}.user.svelte-yomnls{display:flex;flex-direction:row}.pointer.svelte-yomnls:hover{color:rgb(52, 59, 204);cursor:pointer}",
  map: null
};
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $users, $$unsubscribe_users;
  let $userTags, $$unsubscribe_userTags;
  let $selectedUsers, $$unsubscribe_selectedUsers;
  $$unsubscribe_users = subscribe(users, (value) => $users = value);
  $$unsubscribe_userTags = subscribe(userTags, (value) => $userTags = value);
  $$unsubscribe_selectedUsers = subscribe(selectedUsers, (value) => $selectedUsers = value);
  const selected = {};
  let { showSelected = false } = $$props;
  createEventDispatcher();
  set_store_value(users, $users = [], $users);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.showSelected === void 0 && $$bindings.showSelected && showSelected !== void 0)
    $$bindings.showSelected(showSelected);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${``}





${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Tags, "Tag").$$render($$result, {
              text: "Add tags to search for users",
              open: true,
              focusLast: true,
              placeholder: "Search",
              tags: $userTags
            }, {
              tags: ($$value) => {
                $userTags = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}`;
      }
    })}

${``}

${each($users, (user) => {
      return `<br>
  ${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
            default: () => {
              return `<div class="${[
                "pointer user svelte-yomnls",
                showSelected && $selectedUsers.find((s) => s.id === (user == null ? void 0 : user.id)) ? "selected" : ""
              ].join(" ").trim()}">
        <div class="${"label svelte-yomnls"}">${user.username ? `<h4>${escape(user.username)}</h4>
            ` : ``}
        </div></div>
      <div class="${"actions svelte-yomnls"}"></div>
    `;
            }
          })}
  `;
        }
      })}`;
    })}

${``}

${``}`;
  } while (!$$settled);
  $$unsubscribe_users();
  $$unsubscribe_userTags();
  $$unsubscribe_selectedUsers();
  return $$rendered;
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Users, "Users").$$render($$result, {}, {}, {})}`;
});
export { Routes as default };
