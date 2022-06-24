import { c as create_ssr_component, g as add_attribute, f as escape, v as validate_component, t as each } from "../../../../chunks/index-706e192e.js";
import { a as api } from "../../../../chunks/api-47bb839d.js";
import "../../../../chunks/socket-c916af1c.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { C as Column } from "../../../../chunks/Column-a86887bc.js";
import { T as Tag } from "../../../../chunks/Tag-8f483cdc.js";
import "../../../../chunks/send-cf4176c0.js";
import "cookie";
import "socket.io-client";
import "../../../../chunks/Close-75a59370.js";
const load = async ({ params, fetch }) => {
  let { id } = params;
  let user = await api.get(`users/${id}`, fetch);
  console.log("-u", user);
  if (!user.OK) {
    console.log("yeet");
    return {
      status: Number(user.STATUS),
      error: user.error
    };
  }
  if (!user.tags)
    user.tags = [];
  return { props: { user } };
};
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `${$$result.head += `<meta name="${"keywords"}"${add_attribute("content", (() => {
    let stringOfTags = "";
    user.tags.forEach((t, i, a) => {
      let tagString = i === a.length - 1 ? t : `${t}, `;
      stringOfTags = stringOfTags.concat(tagString);
    });
    return stringOfTags;
  })(), 0)} data-svelte="svelte-19aqtsx"><meta name="${"description"}" content="${escape(user.name) + "'s Apexlinks page"}" data-svelte="svelte-19aqtsx">${$$result.title = `<title>/${escape(user.username)}</title>`, ""}<script id="${"ld"}" type="${"application/ld+json"}" data-svelte="svelte-19aqtsx"><\/script>`, ""}


${user.image ? `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
    default: () => {
      return `<img style="${"width: 100%;"}" alt="${"user display _image"}"${add_attribute("src", user.image, 0)}>`;
    }
  })}` : ``}

<p>id: ${escape(user.id)}</p>
<p>username: ${escape(user.username)}</p>

${each(user.tags, (tag) => {
    return `${!tag.hide ? `${validate_component(Tag, "Tag").$$render($$result, {}, {}, {
      default: () => {
        return `${escape(tag.value)}`;
      }
    })}` : ``}`;
  })}`;
});
export { About as default, load };
