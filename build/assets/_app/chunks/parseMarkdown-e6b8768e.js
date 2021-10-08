import{aC as l,aD as r,aE as o}from"./vendor-cce9f310.js";function p(s,e){const t=l[e]||"",a=s.replace(/[&<>]/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[i]);return`<pre class='language-${t}'><code>${a}</code></pre>`}const n=new r.Renderer;n.link=o;n.code=p;n.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^\w]+/g,"-");return`
            <h${e}>
              <a name="${t}" class="anchor" href="#${t}">
                <span class="header-link"></span>
              </a>
              ${s}
            </h${e}>`};n.list=(s,e,t)=>{if(!e)return`
            <ul style='list-style-type: square; list-style-position: inside;'>
                ${s}
            </ul>
        `;if(e)return`
            <ol style='list-style-type: decimal; list-style-position: inside;'>
                ${s}
            </ol>
        `};r.setOptions({renderer:n});function g(s){return s?r(s.replace(/^\t+/gm,e=>e.split("	").join("  ")).replace(/^\n+/gm,e=>e.split(`
`).join(`<br /> 
`)),{renderer:n}):{}}export{g as p};
