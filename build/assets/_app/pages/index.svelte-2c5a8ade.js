import{S as t,i as e,s,E as n,F as a,e as r,k as o,j as l,c,n as $,m as i,f as p,o as m,v as f,r as u,d as g,w as h,l as d,a5 as x,G as v,u as y,a6 as w,I as b,a1 as k,a2 as j,B as E,t as G,a as I,g as N,a4 as T,a7 as A,b as B,h as S,O as D,a8 as M,a9 as O,aa as P,ab as V}from"../chunks/vendor-83a11e53.js";import{a as q}from"../chunks/api-5c0c9630.js";import{u as F}from"../chunks/stores-744e0037.js";import{T as H}from"../chunks/Tag-875b6479.js";import{g as J}from"../chunks/navigation-20968cc5.js";import"../chunks/post-5b27026c.js";import"../chunks/singletons-bb9012b7.js";function R(t,e,s){const n=t.slice();return n[10]=e[s],n}function z(t){let e,s;return{c(){e=r("img"),this.h()},l(t){e=c(t,"IMG",{style:!0,height:!0,width:!0,alt:!0,src:!0}),this.h()},h(){O(e,"vertical-align","top"),B(e,"height","52px"),B(e,"width","52px"),B(e,"alt","profile pic"),P(e.src,s="/placeholder.png")||B(e,"src","/placeholder.png")},m(t,s){p(t,e,s)},p:V,d(t){t&&g(e)}}}function C(t){let e,s;return{c(){e=r("img"),this.h()},l(t){e=c(t,"IMG",{style:!0,height:!0,width:!0,alt:!0,src:!0}),this.h()},h(){O(e,"vertical-align","top"),B(e,"height","52px"),B(e,"width","52px"),B(e,"alt","profile pic"),P(e.src,s=t[10].image)||B(e,"src",s)},m(t,s){p(t,e,s)},p(t,n){4&n&&!P(e.src,s=t[10].image)&&B(e,"src",s)},d(t){t&&g(e)}}}function K(t){let e,s,n=t[10].username+"";return{c(){e=r("p"),s=G(n),this.h()},l(t){e=c(t,"P",{class:!0});var a=I(e);s=N(a,n),a.forEach(g),this.h()},h(){B(e,"class","bx--link--sm")},m(t,n){p(t,e,n),T(e,s)},p(t,e){4&e&&n!==(n=t[10].username+"")&&S(s,n)},d(t){t&&g(e)}}}function L(t){let e,s,n,a,l,i,m,f,u=t[10].name+"";function h(t,e){return t[10].image?C:z}let d=h(t),x=d(t),v=t[10].username&&K(t);return{c(){e=r("div"),x.c(),s=o(),n=r("div"),a=r("h4"),l=G(u),i=o(),v&&v.c(),this.h()},l(t){e=c(t,"DIV",{class:!0});var r=I(e);x.l(r),s=$(r),n=c(r,"DIV",{class:!0});var o=I(n);a=c(o,"H4",{});var p=I(a);l=N(p,u),p.forEach(g),i=$(o),v&&v.l(o),o.forEach(g),r.forEach(g),this.h()},h(){B(n,"class","label svelte-1ltp0mp"),B(e,"class","pointer user svelte-1ltp0mp")},m(r,o){p(r,e,o),x.m(e,null),T(e,s),T(e,n),T(n,a),T(a,l),T(n,i),v&&v.m(n,null),m||(f=D(e,"click",(function(){M(J(`/${t[10].username}`))&&J(`/${t[10].username}`).apply(this,arguments)})),m=!0)},p(a,r){d===(d=h(t=a))&&x?x.p(t,r):(x.d(1),x=d(t),x&&(x.c(),x.m(e,s))),4&r&&u!==(u=t[10].name+"")&&S(l,u),t[10].username?v?v.p(t,r):(v=K(t),v.c(),v.m(n,null)):v&&(v.d(1),v=null)},d(t){t&&g(e),x.d(),v&&v.d(),m=!1,f()}}}function Q(t){let e,s;return e=new j({props:{lg:4,sm:4,md:4,xlg:4,$$slots:{default:[L]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){m(e,t,n),s=!0},p(t,s){const n={};8196&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function U(t){let e,s,n,a;return n=new k({props:{noGutter:!0,$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){e=r("br"),s=o(),l(n.$$.fragment)},l(t){e=c(t,"BR",{}),s=$(t),i(n.$$.fragment,t)},m(t,r){p(t,e,r),p(t,s,r),m(n,t,r),a=!0},p(t,e){const s={};8196&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){a||(f(n.$$.fragment,t),a=!0)},o(t){u(n.$$.fragment,t),a=!1},d(t){t&&g(e),t&&g(s),h(n,t)}}}function W(t){let e,s;return e=new k({props:{noGutter:!0,$$slots:{default:[Y]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){m(e,t,n),s=!0},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function X(t){let e,s;return{c(){e=r("p"),s=G("There doesn't seem to be any results")},l(t){e=c(t,"P",{});var n=I(e);s=N(n,"There doesn't seem to be any results"),n.forEach(g)},m(t,n){p(t,e,n),T(e,s)},d(t){t&&g(e)}}}function Y(t){let e,s;return e=new j({props:{$$slots:{default:[X]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){m(e,t,n),s=!0},p(t,s){const n={};8192&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function Z(t){let e,s;return e=new k({props:{noGutter:!0,$$slots:{default:[tt]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){m(e,t,n),s=!0},p(t,s){const n={};8209&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function _(t){let e,s,r,o;function c(e){t[8](e)}function $(e){t[9](e)}let p={loop:!0};return void 0!==t[0]&&(p.page=t[0]),void 0!==t[4]&&(p.total=t[4]),e=new A({props:p}),n.push((()=>a(e,"page",c))),n.push((()=>a(e,"total",$))),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){m(e,t,s),o=!0},p(t,n){const a={};!s&&1&n&&(s=!0,a.page=t[0],v((()=>s=!1))),!r&&16&n&&(r=!0,a.total=t[4],v((()=>r=!1))),e.$set(a)},i(t){o||(f(e.$$.fragment,t),o=!0)},o(t){u(e.$$.fragment,t),o=!1},d(t){h(e,t)}}}function tt(t){let e,s;return e=new j({props:{$$slots:{default:[_]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,n){m(e,t,n),s=!0},p(t,s){const n={};8209&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){h(e,t)}}}function et(t){let e,s,r,c,b,k,j,G;function I(e){t[7](e)}let N={placeholder:"Search"};void 0!==t[5]&&(N.tags=t[5]),s=new H({props:N}),n.push((()=>a(s,"tags",I))),s.$on("change",t[6]);let T=t[2],A=[];for(let n=0;n<T.length;n+=1)A[n]=U(R(t,T,n));const B=t=>u(A[t],1,1,(()=>{A[t]=null}));let S=t[1]&&t[3]<1&&W(t),D=t[3]>10&&Z(t);return{c(){e=o(),l(s.$$.fragment),c=o();for(let t=0;t<A.length;t+=1)A[t].c();b=o(),S&&S.c(),k=o(),D&&D.c(),j=d(),this.h()},l(t){x('[data-svelte="svelte-fq7das"]',document.head).forEach(g),e=$(t),i(s.$$.fragment,t),c=$(t);for(let e=0;e<A.length;e+=1)A[e].l(t);b=$(t),S&&S.l(t),k=$(t),D&&D.l(t),j=d(),this.h()},h(){document.title="Apexlinks"},m(t,n){p(t,e,n),m(s,t,n),p(t,c,n);for(let e=0;e<A.length;e+=1)A[e].m(t,n);p(t,b,n),S&&S.m(t,n),p(t,k,n),D&&D.m(t,n),p(t,j,n),G=!0},p(t,[e]){const n={};if(!r&&32&e&&(r=!0,n.tags=t[5],v((()=>r=!1))),s.$set(n),4&e){let s;for(T=t[2],s=0;s<T.length;s+=1){const n=R(t,T,s);A[s]?(A[s].p(n,e),f(A[s],1)):(A[s]=U(n),A[s].c(),f(A[s],1),A[s].m(b.parentNode,b))}for(E(),s=T.length;s<A.length;s+=1)B(s);y()}t[1]&&t[3]<1?S?10&e&&f(S,1):(S=W(t),S.c(),f(S,1),S.m(k.parentNode,k)):S&&(E(),u(S,1,1,(()=>{S=null})),y()),t[3]>10?D?(D.p(t,e),8&e&&f(D,1)):(D=Z(t),D.c(),f(D,1),D.m(j.parentNode,j)):D&&(E(),u(D,1,1,(()=>{D=null})),y())},i(t){if(!G){f(s.$$.fragment,t);for(let t=0;t<T.length;t+=1)f(A[t]);f(S),f(D),G=!0}},o(t){u(s.$$.fragment,t),A=A.filter(Boolean);for(let e=0;e<A.length;e+=1)u(A[e]);u(S),u(D),G=!1},d(t){t&&g(e),h(s,t),t&&g(c),w(A,t),t&&g(b),S&&S.d(t),t&&g(k),D&&D.d(t),t&&g(j)}}}async function st({session:t}){let e=t.user;return e?{props:{user:e}}:{status:302,redirect:"/login"}}function nt(t,e,s){let n;b(t,F,(t=>s(5,n=t)));let a,r=[],o=0,l=0,c=0;const $=async function(){let t=`users?tags=${JSON.stringify(n)}&page=${o+1}`,e=await q.get(t);console.log("r.i",e.items),Array.isArray(e.items)&&(s(2,r=e.items),s(3,l=e.total),s(4,c=e.pages),s(1,a=!0))};return t.$$.update=()=>{3&t.$$.dirty&&a&&$()},[o,a,r,l,c,n,$,function(t){n=t,F.set(n)},function(t){o=t,s(0,o)},function(t){c=t,s(4,c)}]}export default class extends t{constructor(t){super(),e(this,t,nt,et,s,{})}}export{st as load};
