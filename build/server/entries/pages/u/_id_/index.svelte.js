import { c as create_ssr_component, h as subscribe, g as add_attribute, f as escape, v as validate_component } from "../../../../chunks/index-70dffb27.js";
import { a as api } from "../../../../chunks/api-38343fdb.js";
import { r as routes } from "../../../../chunks/routes-2be82c1b.js";
import "../../../../chunks/parseMarkdown-2f2db9f5.js";
import { T as Tags } from "../../../../chunks/Tags-22bd6bc0.js";
import { L as Link } from "../../../../chunks/Link-3903a16b.js";
import "../../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-f1877013.js";
import "flatpickr";
import { R as Row, C as Column } from "../../../../chunks/Column-9dd4af0c.js";
import { s as session } from "../../../../chunks/stores-1f04fa1d.js";
import "../../../../chunks/send-95f08c33.js";
import "cookie";
import "golden-fleece";
import "prismjs";
import "prism-svelte";
import "marked";
import "../../../../chunks/index-3f4ef6a9.js";
import "../../../../chunks/Button-fa0593f7.js";
const load = async ({ params, fetch }) => {
  let { id } = params;
  const include = JSON.stringify(["username", "tags", "text"]);
  const user = await api.get(`users/${id}?include=${include}`, fetch);
  if (!user.OK) {
    return {
      status: Number(user.STATUS),
      error: user.error
    };
  }
  if (!user.tags)
    user.tags = [];
  return { props: { user } };
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { user } = $$props;
  let tags = user.tags || [];
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$unsubscribe_session();
  return `${$$result.head += `<meta name="${"keywords"}"${add_attribute("content", (() => {
    let stringOfTags = "";
    user.tags.forEach((t, i, a) => {
      let tagString = i === a.length - 1 ? t : `${t}, `;
      stringOfTags = stringOfTags.concat(tagString);
    });
    return stringOfTags;
  })(), 0)} data-svelte="svelte-19aqtsx"><meta name="${"description"}" content="${escape(user.name) + "'s Apexlinks page"}" data-svelte="svelte-19aqtsx">${$$result.title = `<title>/${escape(user.username)}</title>`, ""}<script id="${"ld"}" type="${"application/ld+json"}" data-svelte="svelte-19aqtsx"><\/script>`, ""}

${$session.user ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Link, "Link").$$render($$result, { href: routes.userTxt(user.id) }, {}, {
            default: () => {
              return `send txt`;
            }
          })}`;
        }
      })}`;
    }
  })}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Link, "Link").$$render($$result, { href: routes.txts + "?user=" + user.id }, {}, {
            default: () => {
              return `all txts by this user`;
            }
          })}`;
        }
      })}`;
    }
  })}

${user.image ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
        default: () => {
          return `<img style="${"width: 100%;"}" alt="${"user display _image"}"${add_attribute("src", user.image, 0)}>`;
        }
      })}`;
    }
  })}` : ``}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<p>id: ${escape(user.id)}</p>
    <p>username: ${escape(user.username)}</p>`;
        }
      })}`;
    }
  })}

${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Tags, "Tags").$$render($$result, {
            showHiddenCount: true,
            open: true,
            tags,
            editable: false
          }, {}, {})}`;
        }
      })}`;
    }
  })}`;
});
export { U5Bidu5D as default, load };
