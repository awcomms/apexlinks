import{S as O,i as R,s as q,E as F,F as H,e as T,k as b,j as y,c as A,n as k,m as w,f as h,o as j,x as d,u as $,d as _,v,l as B,G as J,w as M,a6 as P,a1 as z,r as D,a2 as I,t as K,a as L,g as Q,b as U,ac as C,a4 as V,O as W,a8 as X,h as Y}from"../chunks/vendor-cce9f310.js";import{a as E}from"../chunks/api-5c0c9630.js";import{T as Z}from"../chunks/Tag-6147c832.js";import{g as x}from"../chunks/navigation-51f4a605.js";import"../chunks/post-5b27026c.js";import"../chunks/singletons-12a22614.js";function G(l,e,n){const o=l.slice();return o[7]=e[n],o}function ee(l){let e,n=l[7].name+"",o,a,t;return{c(){e=T("p"),o=K(n),this.h()},l(i){e=A(i,"P",{class:!0});var u=L(e);o=Q(u,n),u.forEach(_),this.h()},h(){U(e,"class","item svelte-11iupaf"),C(e,"unseen",l[7].unseen)},m(i,u){h(i,e,u),V(e,o),a||(t=W(e,"click",function(){X(l[2](l[7]))&&l[2](l[7]).apply(this,arguments)}),a=!0)},p(i,u){l=i,u&1&&n!==(n=l[7].name+"")&&Y(o,n),u&1&&C(e,"unseen",l[7].unseen)},d(i){i&&_(e),a=!1,t()}}}function te(l){let e,n,o;return e=new I({props:{$$slots:{default:[ee]},$$scope:{ctx:l}}}),{c(){y(e.$$.fragment),n=b()},l(a){w(e.$$.fragment,a),n=k(a)},m(a,t){j(e,a,t),h(a,n,t),o=!0},p(a,t){const i={};t&1025&&(i.$$scope={dirty:t,ctx:a}),e.$set(i)},i(a){o||(d(e.$$.fragment,a),o=!0)},o(a){$(e.$$.fragment,a),o=!1},d(a){v(e,a),a&&_(n)}}}function N(l){let e,n,o,a;return o=new z({props:{noGutter:!0,$$slots:{default:[te]},$$scope:{ctx:l}}}),{c(){e=T("br"),n=b(),y(o.$$.fragment)},l(t){e=A(t,"BR",{}),n=k(t),w(o.$$.fragment,t)},m(t,i){h(t,e,i),h(t,n,i),j(o,t,i),a=!0},p(t,i){const u={};i&1025&&(u.$$scope={dirty:i,ctx:t}),o.$set(u)},i(t){a||(d(o.$$.fragment,t),a=!0)},o(t){$(o.$$.fragment,t),a=!1},d(t){t&&_(e),t&&_(n),v(o,t)}}}function se(l){let e,n,o,a,t;function i(s){l[6](s)}let u={};l[1]!==void 0&&(u.tags=l[1]),e=new Z({props:u}),F.push(()=>H(e,"tags",i)),e.$on("change",l[3]);let g=l[0],r=[];for(let s=0;s<g.length;s+=1)r[s]=N(G(l,g,s));const m=s=>$(r[s],1,1,()=>{r[s]=null});return{c(){y(e.$$.fragment),o=b();for(let s=0;s<r.length;s+=1)r[s].c();a=B()},l(s){w(e.$$.fragment,s),o=k(s);for(let f=0;f<r.length;f+=1)r[f].l(s);a=B()},m(s,f){j(e,s,f),h(s,o,f);for(let p=0;p<r.length;p+=1)r[p].m(s,f);h(s,a,f),t=!0},p(s,[f]){const p={};if(!n&&f&2&&(n=!0,p.tags=s[1],J(()=>n=!1)),e.$set(p),f&5){g=s[0];let c;for(c=0;c<g.length;c+=1){const S=G(s,g,c);r[c]?(r[c].p(S,f),d(r[c],1)):(r[c]=N(S),r[c].c(),d(r[c],1),r[c].m(a.parentNode,a))}for(D(),c=g.length;c<r.length;c+=1)m(c);M()}},i(s){if(!t){d(e.$$.fragment,s);for(let f=0;f<g.length;f+=1)d(r[f]);t=!0}},o(s){$(e.$$.fragment,s),r=r.filter(Boolean);for(let f=0;f<r.length;f+=1)$(r[f]);t=!1},d(s){v(e,s),s&&_(o),P(r,s),s&&_(a)}}}async function ue({session:l}){let e=l.user;if(!e)return{status:302,redirect:"/login"};let n,{items:o,total:a,page:t}=await E.get("xrooms")||{};return Array.isArray(o)?n=o:n=[],{props:{rooms:n,total:a,page:t,user:e}}}function ae(l,e,n){let{rooms:o}=e,{total:a}=e,{page:t}=e,i,u=m=>{x(`/room/${m.id}`)},g=async()=>{let m=JSON.stringify(i),s=await E.get(`xrooms?tags=${m}&page=${t}`);n(0,o=s.items),n(4,a=s.total)};function r(m){i=m,n(1,i)}return l.$$set=m=>{"rooms"in m&&n(0,o=m.rooms),"total"in m&&n(4,a=m.total),"page"in m&&n(5,t=m.page)},l.$$.update=()=>{l.$$.dirty&48&&typeof document!="undefined"&&a>100&&document.body.scrollTop==document.body.scrollHeight&&(n(5,t++,t),g())},[o,i,u,g,a,t,r]}class ce extends O{constructor(e){super();R(this,e,ae,se,q,{rooms:0,total:4,page:5})}}export{ce as default,ue as load};