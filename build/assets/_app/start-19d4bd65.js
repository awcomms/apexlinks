var ae=Object.defineProperty,le=Object.defineProperties;var ue=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var F=(r,e,t)=>e in r?ae(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,$=(r,e)=>{for(var t in e||(e={}))Y.call(e,t)&&F(r,t,e[t]);if(C)for(var t of C(e))X.call(e,t)&&F(r,t,e[t]);return r},H=(r,e)=>le(r,ue(e));var Q=(r,e)=>{var t={};for(var s in r)Y.call(r,s)&&e.indexOf(s)<0&&(t[s]=r[s]);if(r!=null&&C)for(var s of C(r))e.indexOf(s)<0&&X.call(r,s)&&(t[s]=r[s]);return t};import{S as ce,i as fe,s as de,e as he,c as _e,a as pe,d as E,b as N,f as R,t as me,g as ge,h as we,j as T,k as ve,l as b,m as B,n as be,o as I,p as K,q as z,r as V,u as y,v as P,w as q,x as w,y as ye,z as Ee,A as $e,B as J,C as W}from"./chunks/vendor-cce9f310.js";import{i as Re}from"./chunks/singletons-12a22614.js";function Z(r){let e,t,s;const i=[r[2]||{}];var o=r[0][1];function n(a){let l={$$slots:{default:[Le]},$$scope:{ctx:a}};for(let u=0;u<i.length;u+=1)l=J(l,i[u]);return{props:l}}return o&&(e=new o(n(r))),{c(){e&&T(e.$$.fragment),t=b()},l(a){e&&B(e.$$.fragment,a),t=b()},m(a,l){e&&I(e,a,l),R(a,t,l),s=!0},p(a,l){const u=l&4?K(i,[z(a[2]||{})]):{};if(l&521&&(u.$$scope={dirty:l,ctx:a}),o!==(o=a[0][1])){if(e){V();const f=e;y(f.$$.fragment,1,0,()=>{P(f,1)}),q()}o?(e=new o(n(a)),T(e.$$.fragment),w(e.$$.fragment,1),I(e,t.parentNode,t)):e=null}else o&&e.$set(u)},i(a){s||(e&&w(e.$$.fragment,a),s=!0)},o(a){e&&y(e.$$.fragment,a),s=!1},d(a){a&&E(t),e&&P(e,a)}}}function x(r){let e,t,s;const i=[r[3]||{}];var o=r[0][2];function n(a){let l={};for(let u=0;u<i.length;u+=1)l=J(l,i[u]);return{props:l}}return o&&(e=new o(n())),{c(){e&&T(e.$$.fragment),t=b()},l(a){e&&B(e.$$.fragment,a),t=b()},m(a,l){e&&I(e,a,l),R(a,t,l),s=!0},p(a,l){const u=l&8?K(i,[z(a[3]||{})]):{};if(o!==(o=a[0][2])){if(e){V();const f=e;y(f.$$.fragment,1,0,()=>{P(f,1)}),q()}o?(e=new o(n()),T(e.$$.fragment),w(e.$$.fragment,1),I(e,t.parentNode,t)):e=null}else o&&e.$set(u)},i(a){s||(e&&w(e.$$.fragment,a),s=!0)},o(a){e&&y(e.$$.fragment,a),s=!1},d(a){a&&E(t),e&&P(e,a)}}}function Le(r){let e,t,s=r[0][2]&&x(r);return{c(){s&&s.c(),e=b()},l(i){s&&s.l(i),e=b()},m(i,o){s&&s.m(i,o),R(i,e,o),t=!0},p(i,o){i[0][2]?s?(s.p(i,o),o&1&&w(s,1)):(s=x(i),s.c(),w(s,1),s.m(e.parentNode,e)):s&&(V(),y(s,1,1,()=>{s=null}),q())},i(i){t||(w(s),t=!0)},o(i){y(s),t=!1},d(i){s&&s.d(i),i&&E(e)}}}function ke(r){let e,t,s=r[0][1]&&Z(r);return{c(){s&&s.c(),e=b()},l(i){s&&s.l(i),e=b()},m(i,o){s&&s.m(i,o),R(i,e,o),t=!0},p(i,o){i[0][1]?s?(s.p(i,o),o&1&&w(s,1)):(s=Z(i),s.c(),w(s,1),s.m(e.parentNode,e)):s&&(V(),y(s,1,1,()=>{s=null}),q())},i(i){t||(w(s),t=!0)},o(i){y(s),t=!1},d(i){s&&s.d(i),i&&E(e)}}}function ee(r){let e,t=r[5]&&te(r);return{c(){e=he("div"),t&&t.c(),this.h()},l(s){e=_e(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,class:!0});var i=pe(e);t&&t.l(i),i.forEach(E),this.h()},h(){N(e,"id","svelte-announcer"),N(e,"aria-live","assertive"),N(e,"aria-atomic","true"),N(e,"class","svelte-1j55zn5")},m(s,i){R(s,e,i),t&&t.m(e,null)},p(s,i){s[5]?t?t.p(s,i):(t=te(s),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(s){s&&E(e),t&&t.d()}}}function te(r){let e;return{c(){e=me(r[6])},l(t){e=ge(t,r[6])},m(t,s){R(t,e,s)},p(t,s){s&64&&we(e,t[6])},d(t){t&&E(e)}}}function Ae(r){let e,t,s,i;const o=[r[1]||{}];var n=r[0][0];function a(u){let f={$$slots:{default:[ke]},$$scope:{ctx:u}};for(let d=0;d<o.length;d+=1)f=J(f,o[d]);return{props:f}}n&&(e=new n(a(r)));let l=r[4]&&ee(r);return{c(){e&&T(e.$$.fragment),t=ve(),l&&l.c(),s=b()},l(u){e&&B(e.$$.fragment,u),t=be(u),l&&l.l(u),s=b()},m(u,f){e&&I(e,u,f),R(u,t,f),l&&l.m(u,f),R(u,s,f),i=!0},p(u,[f]){const d=f&2?K(o,[z(u[1]||{})]):{};if(f&525&&(d.$$scope={dirty:f,ctx:u}),n!==(n=u[0][0])){if(e){V();const h=e;y(h.$$.fragment,1,0,()=>{P(h,1)}),q()}n?(e=new n(a(u)),T(e.$$.fragment),w(e.$$.fragment,1),I(e,t.parentNode,t)):e=null}else n&&e.$set(d);u[4]?l?l.p(u,f):(l=ee(u),l.c(),l.m(s.parentNode,s)):l&&(l.d(1),l=null)},i(u){i||(e&&w(e.$$.fragment,u),i=!0)},o(u){e&&y(e.$$.fragment,u),i=!1},d(u){e&&P(e,u),u&&E(t),l&&l.d(u),u&&E(s)}}}function je(r,e,t){let{stores:s}=e,{page:i}=e,{components:o}=e,{props_0:n=null}=e,{props_1:a=null}=e,{props_2:l=null}=e;ye("__svelte__",s),Ee(s.page.notify);let u=!1,f=!1,d=null;return $e(()=>{const h=s.page.subscribe(()=>{u&&(t(5,f=!0),t(6,d=document.title||"untitled page"))});return t(4,u=!0),h}),r.$$set=h=>{"stores"in h&&t(7,s=h.stores),"page"in h&&t(8,i=h.page),"components"in h&&t(0,o=h.components),"props_0"in h&&t(1,n=h.props_0),"props_1"in h&&t(2,a=h.props_1),"props_2"in h&&t(3,l=h.props_2)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(i)},[o,n,a,l,u,f,d,s,i]}class Te extends ce{constructor(e){super();fe(this,e,je,Ae,de,{stores:7,page:8,components:0,props_0:1,props_1:2,props_2:3})}}const Ie="modulepreload",se={},Pe="/_app/",_=function(e,t){return!t||t.length===0?e():Promise.all(t.map(s=>{if(s=`${Pe}${s}`,s in se)return;se[s]=!0;const i=s.endsWith(".css"),o=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${o}`))return;const n=document.createElement("link");if(n.rel=i?"stylesheet":Ie,i||(n.as="script",n.crossOrigin=""),n.href=s,document.head.appendChild(n),i)return new Promise((a,l)=>{n.addEventListener("load",a),n.addEventListener("error",l)})})).then(()=>e())},c=[()=>_(()=>import("./pages/__layout.svelte-4cdca4a1.js"),["pages/__layout.svelte-4cdca4a1.js","assets/pages/__layout.svelte-5347e0db.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/stores-befe408a.js","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-83bcb05a.js"]),()=>_(()=>import("./pages/__error.svelte-1482ca79.js"),["pages/__error.svelte-1482ca79.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css"]),()=>_(()=>import("./pages/index.svelte-9e9e357a.js"),["pages/index.svelte-9e9e357a.js","assets/pages/index.svelte-2915abeb.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/stores-befe408a.js","chunks/Tag-6147c832.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"]),()=>_(()=>import("./pages/reset_password.svelte-617d0723.js"),["pages/reset_password.svelte-617d0723.js","assets/pages/reset_password.svelte-0fddace4.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/Input-93bd4be1.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-befe408a.js"]),()=>_(()=>import("./pages/how_it_works.svelte-dfe19f08.js"),["pages/how_it_works.svelte-dfe19f08.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css"]),()=>_(()=>import("./pages/item_search.svelte-aafe37f3.js"),["pages/item_search.svelte-aafe37f3.js","assets/pages/items/[id].svelte-68186132.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/stores-befe408a.js","chunks/Tag-6147c832.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/Fields-e6f6d5c0.js","chunks/Input-93bd4be1.js"]),()=>_(()=>import("./pages/edit_room/[id].svelte-bce86f33.js"),["pages/edit_room/[id].svelte-bce86f33.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/stores-befe408a.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/Tag-6147c832.js","chunks/Input-93bd4be1.js"]),()=>_(()=>import("./pages/add_item.svelte-77731fb4.js"),["pages/add_item.svelte-77731fb4.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/initialCaps-68f7c1e1.js","chunks/Image-3c710c51.js","chunks/Tag-6147c832.js","chunks/Input-93bd4be1.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/api-5c0c9630.js","chunks/post-5b27026c.js"]),()=>_(()=>import("./pages/add_room.svelte-9895c60c.js"),["pages/add_room.svelte-9895c60c.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/Input-93bd4be1.js","chunks/Tag-6147c832.js","chunks/stores-befe408a.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/api-5c0c9630.js","chunks/post-5b27026c.js"]),()=>_(()=>import("./pages/my_rooms.svelte-22a4f7a7.js"),["pages/my_rooms.svelte-22a4f7a7.js","assets/pages/my_rooms.svelte-1f8dd424.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/Tag-6147c832.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"]),()=>_(()=>import("./pages/event/[id].svelte-8b3d6dad.js"),["pages/event/[id].svelte-8b3d6dad.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/parseMarkdown-e6b8768e.js","chunks/stores-83bcb05a.js"]),()=>_(()=>import("./pages/items/[id].svelte-6691e8a5.js"),["pages/items/[id].svelte-6691e8a5.js","assets/pages/items/[id].svelte-68186132.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/Tag-6147c832.js","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"]),()=>_(()=>import("./pages/login.svelte-f11a2cad.js"),["pages/login.svelte-f11a2cad.js","assets/pages/login.svelte-599f309d.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/post-5b27026c.js","chunks/Input-93bd4be1.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-83bcb05a.js","chunks/stores-befe408a.js","chunks/checkEmail-33bd547c.js"]),()=>_(()=>import("./pages/rooms/[id].svelte-8db81cd6.js"),["pages/rooms/[id].svelte-8db81cd6.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-befe408a.js","chunks/api-5c0c9630.js","chunks/post-5b27026c.js"]),()=>_(()=>import("./pages/rooms.svelte-24776e7f.js"),["pages/rooms.svelte-24776e7f.js","assets/pages/rooms.svelte-0215511b.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/Tag-6147c832.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-befe408a.js"]),()=>_(()=>import("./pages/beee.svelte-857660c6.js"),["pages/beee.svelte-857660c6.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css"]),()=>_(()=>import("./pages/edit/[id].svelte-a2b5a698.js"),["pages/edit/[id].svelte-a2b5a698.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/initialCaps-68f7c1e1.js","chunks/Tag-6147c832.js","chunks/Image-3c710c51.js","chunks/Fields-e6f6d5c0.js","chunks/Input-93bd4be1.js","chunks/abslink-3768d0d8.js"]),()=>_(()=>import("./pages/edit.svelte-b994efa7.js"),["pages/edit.svelte-b994efa7.js","assets/pages/reset_password.svelte-0fddace4.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/Fields-e6f6d5c0.js","chunks/Input-93bd4be1.js","chunks/Image-3c710c51.js","chunks/Tag-6147c832.js","chunks/checkEmail-33bd547c.js","chunks/abslink-3768d0d8.js"]),()=>_(()=>import("./pages/item/[id].svelte-e16fd6b7.js"),["pages/item/[id].svelte-e16fd6b7.js","assets/pages/item/[id].svelte-82848076.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/parseMarkdown-e6b8768e.js"]),()=>_(()=>import("./pages/room/[id].svelte-2600f19c.js"),["pages/room/[id].svelte-2600f19c.js","assets/pages/room/[id].svelte-0f6b7c1a.css","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/api-5c0c9630.js","chunks/post-5b27026c.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/stores-befe408a.js"]),()=>_(()=>import("./pages/[username].svelte-9caf1e7b.js"),["pages/[username].svelte-9caf1e7b.js","chunks/vendor-cce9f310.js","assets/vendor-30b899a4.css","chunks/parseMarkdown-e6b8768e.js"])],L=decodeURIComponent,Se=[[/^\/$/,[c[0],c[2]],[c[1]]],[/^\/reset_password\/?$/,[c[0],c[3]],[c[1]]],[/^\/how_it_works\/?$/,[c[0],c[4]],[c[1]]],[/^\/item_search\/?$/,[c[0],c[5]],[c[1]]],[/^\/edit_room\/([^/]+?)\/?$/,[c[0],c[6]],[c[1]],r=>({id:L(r[1])})],[/^\/add_item\/?$/,[c[0],c[7]],[c[1]]],[/^\/add_room\/?$/,[c[0],c[8]],[c[1]]],[/^\/my_rooms\/?$/,[c[0],c[9]],[c[1]]],[/^\/event\/([^/]+?)\/?$/,[c[0],c[10]],[c[1]],r=>({id:L(r[1])})],[/^\/items\/([^/]+?)\/?$/,[c[0],c[11]],[c[1]],r=>({id:L(r[1])})],[/^\/login\/?$/,[c[0],c[12]],[c[1]]],[/^\/rooms\/([^/]+?)\/?$/,[c[0],c[13]],[c[1]],r=>({id:L(r[1])})],[/^\/rooms\/?$/,[c[0],c[14]],[c[1]]],[/^\/auth\/login\/?$/],[/^\/auth\/exit\/?$/],[/^\/auth\/join\/?$/],[/^\/beee\/?$/,[c[0],c[15]],[c[1]]],[/^\/edit\/([^/]+?)\/?$/,[c[0],c[16]],[c[1]],r=>({id:L(r[1])})],[/^\/edit\/?$/,[c[0],c[17]],[c[1]]],[/^\/item\/([^/]+?)\/?$/,[c[0],c[18]],[c[1]],r=>({id:L(r[1])})],[/^\/room\/([^/]+?)\/?$/,[c[0],c[19]],[c[1]],r=>({id:L(r[1])})],[/^\/send\/?$/],[/^\/([^/]+?)\/?$/,[c[0],c[20]],[c[1]],r=>({username:L(r[1])})]],Oe=[c[0](),c[1]()];function Ve(r){let e=r.baseURI;if(!e){const t=r.getElementsByTagName("base");e=t.length?t[0].href:r.URL}return e}let re="";function qe(r){re=r.base,r.assets}function G(){return{x:pageXOffset,y:pageYOffset}}function ie(r){for(;r&&r.nodeName.toUpperCase()!=="A";)r=r.parentNode;return r}function ne(r){return r instanceof SVGAElement?new URL(r.href.baseVal,document.baseURI):new URL(r.href)}class De{constructor({base:e,routes:t,trailing_slash:s,renderer:i}){this.base=e,this.routes=t,this.trailing_slash=s,this.renderer=i,i.router=this,this.enabled=!0,document.body.setAttribute("tabindex","-1"),history.replaceState(history.state||{},"",location.href)}init_listeners(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),addEventListener("beforeunload",()=>{history.scrollRestoration="auto"}),addEventListener("load",()=>{history.scrollRestoration="manual"});let e;addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(()=>{const o=H($({},history.state||{}),{"sveltekit:scroll":G()});history.replaceState(o,document.title,window.location.href)},50)});const t=o=>{const n=ie(o.target);n&&n.href&&n.hasAttribute("sveltekit:prefetch")&&this.prefetch(ne(n))};let s;const i=o=>{clearTimeout(s),s=setTimeout(()=>{t(o)},20)};addEventListener("touchstart",t),addEventListener("mousemove",i),addEventListener("click",o=>{if(!this.enabled||o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const n=ie(o.target);if(!n||!n.href)return;const a=ne(n);if(a.toString()===location.href){location.hash||o.preventDefault();return}const l=(n.getAttribute("rel")||"").split(/\s+/);if(n.hasAttribute("download")||l&&l.includes("external")||(n instanceof SVGAElement?n.target.baseVal:n.target)||!this.owns(a))return;const u=n.hasAttribute("sveltekit:noscroll");history.pushState({},"",a.href),this._navigate(a,u?G():null,!1,[],a.hash),o.preventDefault()}),addEventListener("popstate",o=>{if(o.state&&this.enabled){const n=new URL(location.href);this._navigate(n,o.state["sveltekit:scroll"],!1,[])}})}owns(e){return e.origin===location.origin&&e.pathname.startsWith(this.base)}parse(e){if(this.owns(e)){const t=e.pathname.slice(this.base.length)||"/",s=decodeURI(t),i=this.routes.filter(([a])=>a.test(s)),o=new URLSearchParams(e.search);return{id:`${t}?${o}`,routes:i,path:t,decoded_path:s,query:o}}}async goto(e,{noscroll:t=!1,replaceState:s=!1,keepfocus:i=!1,state:o={}}={},n){const a=new URL(e,Ve(document));return this.enabled&&this.owns(a)?(history[s?"replaceState":"pushState"](o,"",e),this._navigate(a,t?G():null,i,n,a.hash)):(location.href=a.href,new Promise(()=>{}))}enable(){this.enabled=!0}disable(){this.enabled=!1}async prefetch(e){const t=this.parse(e);if(!t)throw new Error("Attempted to prefetch a URL that does not belong to this app");return this.renderer.load(t)}async _navigate(e,t,s,i,o){const n=this.parse(e);if(!n)throw new Error("Attempted to navigate to a URL that does not belong to this app");if(n.path!=="/"){const a=n.path.endsWith("/");(a&&this.trailing_slash==="never"||!a&&this.trailing_slash==="always"&&!(n.path.split("/").pop()||"").includes("."))&&(n.path=a?n.path.slice(0,-1):n.path+"/",history.replaceState({},"",`${this.base}${n.path}${location.search}`))}this.renderer.notify({path:n.path,query:n.query}),await this.renderer.update(n,i,!1,{hash:o,scroll:t,keepfocus:s})}}function oe(r){return r instanceof Error||r&&r.name&&r.message?r:new Error(JSON.stringify(r))}function Ue(r){let e=5381,t=r.length;if(typeof r=="string")for(;t;)e=e*33^r.charCodeAt(--t);else for(;t;)e=e*33^r[--t];return(e>>>0).toString(36)}function Ce(r){const e=r.status&&r.status>=400&&r.status<=599&&!r.redirect;if(r.error||e){const t=r.status;if(!r.error&&e)return{status:t||500,error:new Error};const s=typeof r.error=="string"?new Error(r.error):r.error;return s instanceof Error?!t||t<400||t>599?(console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500'),{status:500,error:s}):{status:t,error:s}:{status:500,error:new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof s}"`)}}if(r.redirect){if(!r.status||Math.floor(r.status/100)!==3)return{status:500,error:new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')};if(typeof r.redirect!="string")return{status:500,error:new Error('"redirect" property returned from load() must be a string')}}if(r.context)throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');return r}function Ne(r){const e=W(r);let t=!0;function s(){t=!0,e.update(n=>n)}function i(n){t=!1,e.set(n)}function o(n){let a;return e.subscribe(l=>{(a===void 0||t&&l!==a)&&n(a=l)})}return{notify:s,set:i,subscribe:o}}function Be(r,e){const t=typeof r=="string"?r:r.url;let s=`script[data-type="svelte-data"][data-url=${JSON.stringify(t)}]`;e&&typeof e.body=="string"&&(s+=`[data-body="${Ue(e.body)}"]`);const i=document.querySelector(s);if(i&&i.textContent){const o=JSON.parse(i.textContent),{body:n}=o,a=Q(o,["body"]);return Promise.resolve(new Response(n,a))}return fetch(r,e)}class Ke{constructor({Root:e,fallback:t,target:s,session:i,host:o}){this.Root=e,this.fallback=t,this.host=o,this.router,this.target=s,this.started=!1,this.session_id=1,this.invalid=new Set,this.invalidating=null,this.current={page:null,session_id:0,branch:[]},this.cache=new Map,this.loading={id:null,promise:null},this.stores={page:Ne({}),navigating:W(null),session:W(i)},this.$session=null,this.root=null;let n=!1;this.stores.session.subscribe(async a=>{if(this.$session=a,!n||!this.router)return;this.session_id+=1;const l=this.router.parse(new URL(location.href));l&&this.update(l,[],!0)}),n=!0}async start({status:e,error:t,nodes:s,page:i}){const o=[];let n={},a,l;try{for(let u=0;u<s.length;u+=1){const f=u===s.length-1,d=await this._load_node({module:await s[u],page:i,stuff:n,status:f?e:void 0,error:f?t:void 0});if(o.push(d),d&&d.loaded)if(d.loaded.error){if(t)throw d.loaded.error;l={status:d.loaded.status,error:d.loaded.error,path:i.path,query:i.query}}else d.loaded.stuff&&(n=$($({},n),d.loaded.stuff))}a=l?await this._load_error(l):await this._get_navigation_result_from_branch({page:i,branch:o})}catch(u){if(t)throw u;a=await this._load_error({status:500,error:oe(u),path:i.path,query:i.query})}if(a.redirect){location.href=new URL(a.redirect,location.href).href;return}this._init(a)}notify({path:e,query:t}){dispatchEvent(new CustomEvent("sveltekit:navigation-start")),this.started&&this.stores.navigating.set({from:{path:this.current.page.path,query:this.current.page.query},to:{path:e,query:t}})}async update(e,t,s,i){const o=this.token={};let n=await this._get_navigation_result(e,s);if(o!==this.token)return;if(this.invalid.clear(),n.redirect)if(t.length>10||t.includes(e.path))n=await this._load_error({status:500,error:new Error("Redirect loop"),path:e.path,query:e.query});else{this.router?this.router.goto(n.redirect,{replaceState:!0},[...t,e.path]):location.href=new URL(n.redirect,location.href).href;return}if(n.reload?location.reload():this.started?(this.current=n.state,this.root.$set(n.props),this.stores.navigating.set(null)):this._init(n),i){const{hash:l,scroll:u,keepfocus:f}=i;f||document.body.focus();const d=l&&document.getElementById(l.slice(1));u?scrollTo(u.x,u.y):d?d.scrollIntoView():scrollTo(0,0)}if(await 0,dispatchEvent(new CustomEvent("sveltekit:navigation-end")),this.loading.promise=null,this.loading.id=null,!this.router)return;const a=n.state.branch[n.state.branch.length-1];a&&a.module.router===!1?this.router.disable():this.router.enable()}load(e){return this.loading.promise=this._get_navigation_result(e,!1),this.loading.id=e.id,this.loading.promise}invalidate(e){return this.invalid.add(e),this.invalidating||(this.invalidating=Promise.resolve().then(async()=>{const t=this.router&&this.router.parse(new URL(location.href));t&&await this.update(t,[],!0),this.invalidating=null})),this.invalidating}_init(e){this.current=e.state;const t=document.querySelector("style[data-svelte]");t&&t.remove(),this.root=new this.Root({target:this.target,props:$({stores:this.stores},e.props),hydrate:!0}),this.started=!0}async _get_navigation_result(e,t){if(this.loading.id===e.id&&this.loading.promise)return this.loading.promise;for(let s=0;s<e.routes.length;s+=1){const i=e.routes[s];if(i.length===1)return{reload:!0,props:{},state:this.current};let o=s+1;for(;o<e.routes.length;){const a=e.routes[o];if(a[0].toString()===i[0].toString())a.length!==1&&a[1].forEach(l=>l()),o+=1;else break}const n=await this._load({route:i,info:e},t);if(n)return n}return await this._load_error({status:404,error:new Error(`Not found: ${e.path}`),path:e.path,query:e.query})}async _get_navigation_result_from_branch({page:e,branch:t}){const s=t.filter(Boolean),i=s.find(l=>l.loaded&&l.loaded.redirect),o={redirect:i&&i.loaded?i.loaded.redirect:void 0,state:{page:e,branch:t,session_id:this.session_id},props:{components:s.map(l=>l.module.default)}};for(let l=0;l<s.length;l+=1){const u=s[l].loaded;o.props[`props_${l}`]=u?await u.props:null}(!this.current.page||e.path!==this.current.page.path||e.query.toString()!==this.current.page.query.toString())&&(o.props.page=e);const n=s[s.length-1],a=n.loaded&&n.loaded.maxage;if(a){const l=`${e.path}?${e.query}`;let u=!1;const f=()=>{this.cache.get(l)===o&&this.cache.delete(l),h(),clearTimeout(d)},d=setTimeout(f,a*1e3),h=this.stores.session.subscribe(()=>{u&&f()});u=!0,this.cache.set(l,o)}return o}async _load_node({status:e,error:t,module:s,page:i,stuff:o}){const n={module:s,uses:{params:new Set,path:!1,query:!1,session:!1,stuff:!1,dependencies:[]},loaded:null,stuff:o},a={};for(const u in i.params)Object.defineProperty(a,u,{get(){return n.uses.params.add(u),i.params[u]},enumerable:!0});const l=this.$session;if(s.load){const{started:u}=this,f={page:{host:i.host,params:a,get path(){return n.uses.path=!0,i.path},get query(){return n.uses.query=!0,i.query}},get session(){return n.uses.session=!0,l},get stuff(){return n.uses.stuff=!0,$({},o)},fetch(h,A){const k=typeof h=="string"?h:h.url,{href:S}=new URL(k,new URL(i.path,document.baseURI));return n.uses.dependencies.push(S),u?fetch(h,A):Be(h,A)}};t&&(f.status=e,f.error=t);const d=await s.load.call(null,f);if(!d)return;n.loaded=Ce(d),n.loaded.stuff&&(n.stuff=n.loaded.stuff)}return n}async _load({route:e,info:{path:t,decoded_path:s,query:i}},o){const n=`${s}?${i}`;if(!o){const p=this.cache.get(n);if(p)return p}const[a,l,u,f]=e,d=f?f(a.exec(s)):{},h=this.current.page&&{path:t!==this.current.page.path,params:Object.keys(d).filter(p=>this.current.page.params[p]!==d[p]),query:i.toString()!==this.current.page.query.toString(),session:this.session_id!==this.current.session_id},A={host:this.host,path:t,query:i,params:d};let k=[],S={},M=!1,D=200,O;l.forEach(p=>p());e:for(let p=0;p<l.length;p+=1){let m;try{if(!l[p])continue;const v=await l[p](),g=this.current.branch[p];if(!g||v!==g.module||h.path&&g.uses.path||h.params.some(j=>g.uses.params.has(j))||h.query&&g.uses.query||h.session&&g.uses.session||g.uses.dependencies.some(j=>this.invalid.has(j))||M&&g.uses.stuff){m=await this._load_node({module:v,page:A,stuff:S});const j=p===l.length-1;if(m&&m.loaded){if(m.loaded.error&&(D=m.loaded.status,O=m.loaded.error),m.loaded.redirect)return{redirect:m.loaded.redirect,props:{},state:this.current};m.loaded.stuff&&(M=!0)}else if(j&&v.load)return}else m=g}catch(v){D=500,O=oe(v)}if(O){for(;p--;)if(u[p]){let v,g,U=p;for(;!(g=k[U]);)U-=1;try{if(v=await this._load_node({status:D,error:O,module:await u[p](),page:A,stuff:g.stuff}),v&&v.loaded&&v.loaded.error)continue;k=k.slice(0,U+1).concat(v);break e}catch(j){continue}}return await this._load_error({status:D,error:O,path:t,query:i})}else m&&m.loaded&&m.loaded.stuff&&(S=$($({},S),m.loaded.stuff)),k.push(m)}return await this._get_navigation_result_from_branch({page:A,branch:k})}async _load_error({status:e,error:t,path:s,query:i}){const o={host:this.host,path:s,query:i,params:{}},n=await this._load_node({module:await this.fallback[0],page:o,stuff:{}}),a=[n,await this._load_node({status:e,error:t,module:await this.fallback[1],page:o,stuff:n&&n.loaded&&n.loaded.stuff||{}})];return await this._get_navigation_result_from_branch({page:o,branch:a})}}async function Ge({paths:r,target:e,session:t,host:s,route:i,spa:o,trailing_slash:n,hydrate:a}){const l=new Ke({Root:Te,fallback:Oe,target:e,session:t,host:s}),u=i?new De({base:r.base,routes:Se,trailing_slash:n,renderer:l}):null;Re(u),qe(r),a&&await l.start(a),u&&(o&&u.goto(location.href,{replaceState:!0},[]),u.init_listeners()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Ge as start};