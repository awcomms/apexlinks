import"./api-eadfccdc.js";import{a1 as e,a2 as n,a3 as t}from"./vendor-c7b4d8a9.js";const s=new n.Renderer;s.link=t,s.code=function(n,t){return`<pre class='language-${e[t]||""}'><code>${n.replace(/[&<>]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[e])))}</code></pre>`},s.heading=(e,n)=>{const t=e.toLowerCase().replace(/[^\w]+/g,"-");return`\n            <h${n}>\n              <a name="${t}" class="anchor" href="#${t}">\n                <span class="header-link"></span>\n              </a>\n              ${e}\n            </h${n}>`},s.list=(e,n,t)=>n?n?`\n            <ol style='list-style-type: decimal; list-style-position: inside;'>\n                ${e}\n            </ol>\n        `:void 0:`\n            <ul style='list-style-type: square; list-style-position: inside;'>\n                ${e}\n            </ul>\n        `,n.setOptions({renderer:s});let a=/\S+:\/\/\S+/;function r(e){return e?n(e.replace(/^\t+/gm,(e=>e.split("\t").join("  "))).replace(/^\n+/gm,(e=>e.split("\n").join("<br /> \n"))),{renderer:s}):""}function i(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}function o(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function l(e,n){return fetch(e,{method:"POST",credentials:"include",body:JSON.stringify(n||{}),headers:{"Content-Type":"application/json"}}).then((e=>e.json()))}export{r as a,a as b,i as c,o as i,l as p};
