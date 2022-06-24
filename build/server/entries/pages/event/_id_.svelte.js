import { c as create_ssr_component, j as subscribe, v as validate_component, g as add_attribute, f as escape } from "../../../chunks/index-706e192e.js";
import { a as api } from "../../../chunks/api-47bb839d.js";
import "../../../chunks/socket-c916af1c.js";
import { L as Link } from "../../../chunks/Link-ac336e41.js";
import "../../../chunks/HeaderSearch.svelte_svelte_type_style_lang-6dd63eaa.js";
import "flatpickr";
import { R as Row } from "../../../chunks/Row-d1968937.js";
import { C as Column } from "../../../chunks/Column-a86887bc.js";
import PrismJS from "prismjs";
import "prism-svelte";
import { marked } from "marked";
import { s as session } from "../../../chunks/stores-f80eb8f4.js";
import "../../../chunks/send-cf4176c0.js";
import "cookie";
import "socket.io-client";
function __extends(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
(function(_super) {
  __extends(ParseError, _super);
  function ParseError(message, pos, loc) {
    var _this = _super.call(this, message) || this;
    _this.pos = pos;
    _this.loc = loc;
    return _this;
  }
  return ParseError;
})(Error);
const langs = {
  bash: "bash",
  html: "markup",
  sv: "svelte",
  js: "javascript",
  css: "css",
  diff: "diff"
};
function link_renderer(href, title, text) {
  let target_attr = "";
  let title_attr = "";
  if (href.startsWith("http")) {
    target_attr = ' target="_blank"';
  }
  if (title !== null) {
    title_attr = ` title="${title}"`;
  }
  return `<a href="${href}"${target_attr}${title_attr} rel="noopener noreferrer">${text}</a>`;
}
const highlight = (source, lang) => {
  const plang = langs[lang] || "";
  const highlighted = plang ? PrismJS.highlight(source, PrismJS.languages[plang], lang) : source.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  return `<pre class='language-${plang}'><code>${highlighted}</code></pre>`;
};
const renderer = new marked.Renderer();
renderer.link = link_renderer;
renderer.code = highlight;
renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
  return `
            <h${level}>
              <Link name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </Link>
              ${text}
            </h${level}>`;
};
renderer.list = (body, ordered, start) => {
  if (!ordered) {
    return `
            <ul style='list-style-type: square; list-style-position: inside;'>
                ${body}
            </ul>
        `;
  }
  if (ordered) {
    return `
            <ol style='list-style-type: decimal; list-style-position: inside;'>
                ${body}
            </ol>
        `;
  }
};
marked.setOptions({
  renderer,
  breaks: true
});
function parseMarkdown(markdown) {
  if (markdown) {
    return marked(markdown.replace(/^\t+/gm, (match) => match.split("	").join("  ")).replace(/^\n+/gm, (match) => match.split("\n").join("<br /> \n")), { renderer });
  } else {
    return "";
  }
}
const load = async ({ params, fetch }) => {
  let { id } = params;
  let event = await api.get(`events/${id}`, fetch);
  if (event.STATUS === 404) {
    return {
      status: 404,
      error: `event ${id} not found`
    };
  }
  if (event.STATUS === 423) {
    return {
      status: 404,
      error: `event ${id} not visible`
    };
  }
  return { event };
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { event } = $$props;
  let itext;
  if (event.itext) {
    itext = parseMarkdown(event.itext);
  }
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$unsubscribe_session();
  return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, { lg: 2, sm: 2, md: 2, xlg: 2 }, {}, {
        default: () => {
          return `<div style="${"width: 111px; height: 111px;"}"><img width="${"100%"}" height="${"100%"}" alt="${"eventImage"}"${add_attribute("src", event.image, 0)}></div>`;
        }
      })}
    ${validate_component(Column, "Column").$$render($$result, { lg: 4, sm: 4, md: 4, xlg: 4 }, {}, {
        default: () => {
          return `${event.name ? `<h2>${escape(event.name)}</h2>` : ``}
        <p>${escape(event.itype)}</p>
        ${event.address ? `<p>${escape(event.address)}</p>` : ``}
        ${event.website ? `${validate_component(Link, "Link").$$render($$result, { href: event.website }, {}, {
            default: () => {
              return `${escape(event.website)}`;
            }
          })}` : ``}
        ${event.email ? `<p>${escape(event.email)}</p>` : ``}
        ${event.phone ? `<p>${escape(event.phone)}</p>` : ``}
        
        ${validate_component(Link, "Link").$$render($$result, { href: event.user }, {}, {
            default: () => {
              return `User`;
            }
          })}
        ${$session.user.username == event.user ? `${validate_component(Link, "Link").$$render($$result, { href: "edit/" + event.id }, {}, {
            default: () => {
              return `Edit`;
            }
          })}` : ``}`;
        }
      })}`;
    }
  })}

${itext ? `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, { lg: 6, sm: 6, md: 6, xlg: 6 }, {}, {
        default: () => {
          return `<p><!-- HTML_TAG_START -->${itext}<!-- HTML_TAG_END --></p>`;
        }
      })}`;
    }
  })}` : ``}`;
});
export { U5Bidu5D as default, load };
