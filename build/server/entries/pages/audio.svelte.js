import { c as create_ssr_component, g as add_attribute } from "../../chunks/index-706e192e.js";
const Audio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let audio;
  let value;
  setInterval(() => {
    audio.load();
    audio.play();
  }, value * 1e3);
  return `<input type="${"number"}"${add_attribute("value", value, 0)}>
<input type="${"file"}">
<audio${add_attribute("this", audio, 0)}></audio>`;
});
export { Audio as default };
