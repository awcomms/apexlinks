import { w as writable } from "./HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
const store = (defaultValue = []) => {
  const { subscribe, set } = writable(defaultValue);
  return {
    subscribe,
    set: (value) => {
      set(value);
    }
  };
};
const notify = store();
const newUser = store();
const users = store();
const isSideNavOpen = store();
const selectedUsers = store();
const userTags = store();
export { notify as a, userTags as b, isSideNavOpen as i, newUser as n, selectedUsers as s, users as u };
