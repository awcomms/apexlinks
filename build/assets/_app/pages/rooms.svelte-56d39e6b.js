import{S as t,i as e,s,E as n,F as a,e as r,k as o,j as c,c as l,n as $,m as i,f,o as u,v as m,r as p,d as g,w as h,l as d,a9 as k,G as y,u as v,aa as x,I as b,a3 as w,a4 as j,B as E,t as T,a as A,g as B,a6 as G,b as N,ah as O,O as P,ad as S,h as q}from"../chunks/vendor-221a53e8.js";import{g as F,p as I}from"../chunks/api-464cac91.js";import{T as J}from"../chunks/Tag-9a4ea10c.js";import{g as R}from"../chunks/navigation-20968cc5.js";import{r as z}from"../chunks/stores-132b7e55.js";import"../chunks/singletons-bb9012b7.js";function C(t,e,s){const n=t.slice();return n[8]=e[s],n}function D(t){let e,s,n,a,o=t[8].name+"";return{c(){e=r("p"),s=T(o),this.h()},l(t){e=l(t,"P",{class:!0,href:!0});var n=A(e);s=B(n,o),n.forEach(g),this.h()},h(){N(e,"class","item svelte-dveft3"),N(e,"href",""),O(e,"unseen",t[8].unseen)},m(r,o){f(r,e,o),G(e,s),n||(a=P(e,"click",(function(){S(t[4](t[8]))&&t[4](t[8]).apply(this,arguments)})),n=!0)},p(n,a){t=n,1&a&&o!==(o=t[8].name+"")&&q(s,o),1&a&&O(e,"unseen",t[8].unseen)},d(t){t&&g(e),n=!1,a()}}}function H(t){let e,s;return e=new j({props:{$$slots:{default:[D]},$$scope:{ctx:t}}}),{c(){c(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){u(e,t,n),s=!0},p(t,s){const n={};2049&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){p(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function K(t){let e,s,n,a;return n=new w({props:{noGutter:!0,$$slots:{default:[H]},$$scope:{ctx:t}}}),{c(){e=r("br"),s=o(),c(n.$$.fragment)},l(t){e=l(t,"BR",{}),s=$(t),i(n.$$.fragment,t)},m(t,r){f(t,e,r),f(t,s,r),u(n,t,r),a=!0},p(t,e){const s={};2049&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){a||(m(n.$$.fragment,t),a=!0)},o(t){p(n.$$.fragment,t),a=!1},d(t){t&&g(e),t&&g(s),h(n,t)}}}function L(t){let e,s;return e=new w({props:{noGutter:!0,$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){c(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){u(e,t,n),s=!0},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){p(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function M(t){let e,s;return{c(){e=r("p"),s=T("There don't seem to be any results")},l(t){e=l(t,"P",{});var n=A(e);s=B(n,"There don't seem to be any results"),n.forEach(g)},m(t,n){f(t,e,n),G(e,s)},d(t){t&&g(e)}}}function Q(t){let e,s;return e=new j({props:{$$slots:{default:[M]},$$scope:{ctx:t}}}),{c(){c(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){u(e,t,n),s=!0},p(t,s){const n={};2048&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){p(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function U(t){let e,s,r,l,b,w,j;function T(e){t[7](e)}let A={};void 0!==t[3]&&(A.tags=t[3]),s=new J({props:A}),n.push((()=>a(s,"tags",T))),s.$on("change",t[5]);let B=t[0],G=[];for(let n=0;n<B.length;n+=1)G[n]=K(C(t,B,n));const N=t=>p(G[t],1,1,(()=>{G[t]=null}));let O=t[2]&&t[1]<1&&L(t);return{c(){e=o(),c(s.$$.fragment),l=o();for(let t=0;t<G.length;t+=1)G[t].c();b=o(),O&&O.c(),w=d(),this.h()},l(t){k('[data-svelte="svelte-fq7das"]',document.head).forEach(g),e=$(t),i(s.$$.fragment,t),l=$(t);for(let e=0;e<G.length;e+=1)G[e].l(t);b=$(t),O&&O.l(t),w=d(),this.h()},h(){document.title="Apexlinks"},m(t,n){f(t,e,n),u(s,t,n),f(t,l,n);for(let e=0;e<G.length;e+=1)G[e].m(t,n);f(t,b,n),O&&O.m(t,n),f(t,w,n),j=!0},p(t,[e]){const n={};if(!r&&8&e&&(r=!0,n.tags=t[3],y((()=>r=!1))),s.$set(n),17&e){let s;for(B=t[0],s=0;s<B.length;s+=1){const n=C(t,B,s);G[s]?(G[s].p(n,e),m(G[s],1)):(G[s]=K(n),G[s].c(),m(G[s],1),G[s].m(b.parentNode,b))}for(E(),s=B.length;s<G.length;s+=1)N(s);v()}t[2]&&t[1]<1?O?6&e&&m(O,1):(O=L(t),O.c(),m(O,1),O.m(w.parentNode,w)):O&&(E(),p(O,1,1,(()=>{O=null})),v())},i(t){if(!j){m(s.$$.fragment,t);for(let t=0;t<B.length;t+=1)m(G[t]);m(O),j=!0}},o(t){p(s.$$.fragment,t),G=G.filter(Boolean);for(let e=0;e<G.length;e+=1)p(G[e]);p(O),j=!1},d(t){t&&g(e),h(s,t),t&&g(l),x(G,t),t&&g(b),O&&O.d(t),t&&g(w)}}}async function V({session:t}){let e=t.token;return e?{status:302,redirect:"/login"}:{props:{user:await F("user",e)}}}function W(t,e,s){let n;b(t,z,(t=>s(3,n=t)));let a,{user:r}=e,o=[],c=0;return t.$$set=t=>{"user"in t&&s(6,r=t.user)},[o,c,a,n,async t=>{await I("join",{id:t.id},r.token),R(`/room/${t.id}`)},async function(){let t=`rooms?tags=${JSON.stringify(n)}&visible=1&page=1`,e=await F(t,r.token);Array.isArray(e.items)&&s(0,o=e.items),s(1,c=e.total),s(2,a=!0)},r,function(t){n=t,z.set(n)}]}export default class extends t{constructor(t){super(),e(this,t,W,U,s,{user:6})}}export{V as load};