import{S as t,i as e,s as n,E as s,F as a,a3 as $,k as r,j as o,a9 as c,d as i,n as f,m,f as u,o as l,O as p,G as d,v as g,r as h,w as v,I as k,a4 as x,aw as w,ax as y,ay as j,l as b,B as T,u as I,an as N,au as A,az as E,t as G,g as D}from"../chunks/vendor-221a53e8.js";import{i as L}from"../chunks/utils-6d6449a6.js";import{I as z}from"../chunks/Image-ffc55824.js";import{T as B}from"../chunks/Tag-9a4ea10c.js";import{I as C}from"../chunks/Input-cd25684c.js";import{g as F}from"../chunks/navigation-20968cc5.js";import{s as K}from"../chunks/stores-84c57af6.js";import{g as M,a as O}from"../chunks/api-464cac91.js";import"../chunks/singletons-bb9012b7.js";function S(t){let e,n,$;function r(e){t[16](e)}let c={labelText:"Link"};return void 0!==t[1]&&(c.value=t[1]),e=new A({props:c}),s.push((()=>a(e,"value",r))),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,n){l(e,t,n),$=!0},p(t,s){const a={};!n&&2&s&&(n=!0,a.value=t[1],d((()=>n=!1))),e.$set(a)},i(t){$||(g(e.$$.fragment,t),$=!0)},o(t){h(e.$$.fragment,t),$=!1},d(t){v(e,t)}}}function q(t){let e,n,$;function r(e){t[17](e)}let c={placeholder:"Description(Markdown)",labelText:"Description(markdown)"};return void 0!==t[3]&&(c.value=t[3]),e=new E({props:c}),s.push((()=>a(e,"value",r))),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,n){l(e,t,n),$=!0},p(t,s){const a={};!n&&8&s&&(n=!0,a.value=t[3],d((()=>n=!1))),e.$set(a)},i(t){$||(g(e.$$.fragment,t),$=!0)},o(t){h(e.$$.fragment,t),$=!1},d(t){v(e,t)}}}function H(t){let e,n,$,c,p,k,x,w,y,N;function A(e){t[13](e)}function E(e){t[14](e)}let G={invalidText:"Name taken",labelText:"Name"};function D(e){t[15](e)}void 0!==t[0]&&(G.invalid=t[0]),void 0!==t[2]&&(G.value=t[2]),e=new C({props:G}),s.push((()=>a(e,"invalid",A))),s.push((()=>a(e,"value",E)));let L={labelText:"Let the item's listing redirect to a link"};void 0!==t[4]&&(L.checked=t[4]),p=new j({props:L}),s.push((()=>a(p,"checked",D)));let z=t[4]&&S(t),B=!t[4]&&q(t);return{c(){o(e.$$.fragment),c=r(),o(p.$$.fragment),x=r(),z&&z.c(),w=r(),B&&B.c(),y=b()},l(t){m(e.$$.fragment,t),c=f(t),m(p.$$.fragment,t),x=f(t),z&&z.l(t),w=f(t),B&&B.l(t),y=b()},m(t,n){l(e,t,n),u(t,c,n),l(p,t,n),u(t,x,n),z&&z.m(t,n),u(t,w,n),B&&B.m(t,n),u(t,y,n),N=!0},p(t,s){const a={};!n&&1&s&&(n=!0,a.invalid=t[0],d((()=>n=!1))),!$&&4&s&&($=!0,a.value=t[2],d((()=>$=!1))),e.$set(a);const r={};!k&&16&s&&(k=!0,r.checked=t[4],d((()=>k=!1))),p.$set(r),t[4]?z?(z.p(t,s),16&s&&g(z,1)):(z=S(t),z.c(),g(z,1),z.m(w.parentNode,w)):z&&(T(),h(z,1,1,(()=>{z=null})),I()),t[4]?B&&(T(),h(B,1,1,(()=>{B=null})),I()):B?(B.p(t,s),16&s&&g(B,1)):(B=q(t),B.c(),g(B,1),B.m(y.parentNode,y))},i(t){N||(g(e.$$.fragment,t),g(p.$$.fragment,t),g(z),g(B),N=!0)},o(t){h(e.$$.fragment,t),h(p.$$.fragment,t),h(z),h(B),N=!1},d(t){v(e,t),t&&i(c),v(p,t),t&&i(x),z&&z.d(t),t&&i(w),B&&B.d(t),t&&i(y)}}}function J(t){let e,n;return e=new w({props:{$$slots:{default:[H]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,s){l(e,t,s),n=!0},p(t,n){const s={};2097183&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function P(t){let e,n;return e=new x({props:{$$slots:{default:[J]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,s){l(e,t,s),n=!0},p(t,n){const s={};2097183&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function Q(t){let e;return{c(){e=G("Add")},l(t){e=D(t,"Add")},m(t,n){u(t,e,n)},d(t){t&&i(e)}}}function R(t){let e,n;return e=new N({props:{$$slots:{default:[Q]},$$scope:{ctx:t}}}),e.$on("click",t[8]),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,s){l(e,t,s),n=!0},p(t,n){const s={};2097152&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function U(t){let e,n;return e=new y({props:{stacked:!0,$$slots:{default:[R]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,s){l(e,t,s),n=!0},p(t,n){const s={};2097152&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function V(t){let e,n;return e=new x({props:{$$slots:{default:[U]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,s){l(e,t,s),n=!0},p(t,n){const s={};2097152&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function W(t){let e,n,k,x,w,y,j,b,T,I,N,A,E;function G(e){t[11](e)}let D={};function L(e){t[12](e)}void 0!==t[6]&&(D.image=t[6]),n=new z({props:D}),s.push((()=>a(n,"image",G)));let C={};return void 0!==t[5]&&(C.tags=t[5]),w=new B({props:C}),s.push((()=>a(w,"tags",L))),b=new $({props:{noGutter:!0,$$slots:{default:[P]},$$scope:{ctx:t}}}),I=new $({props:{noGutter:!0,$$slots:{default:[V]},$$scope:{ctx:t}}}),{c(){e=r(),o(n.$$.fragment),x=r(),o(w.$$.fragment),j=r(),o(b.$$.fragment),T=r(),o(I.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-7tntdn"]',document.head).forEach(i),e=f(t),m(n.$$.fragment,t),x=f(t),m(w.$$.fragment,t),j=f(t),m(b.$$.fragment,t),T=f(t),m(I.$$.fragment,t),this.h()},h(){document.title="Add Item"},m(s,a){u(s,e,a),l(n,s,a),u(s,x,a),l(w,s,a),u(s,j,a),l(b,s,a),u(s,T,a),l(I,s,a),N=!0,A||(E=p(window,"keydown",t[7]),A=!0)},p(t,[e]){const s={};!k&&64&e&&(k=!0,s.image=t[6],d((()=>k=!1))),n.$set(s);const a={};!y&&32&e&&(y=!0,a.tags=t[5],d((()=>y=!1))),w.$set(a);const $={};2097183&e&&($.$$scope={dirty:e,ctx:t}),b.$set($);const r={};2097152&e&&(r.$$scope={dirty:e,ctx:t}),I.$set(r)},i(t){N||(g(n.$$.fragment,t),g(w.$$.fragment,t),g(b.$$.fragment,t),g(I.$$.fragment,t),N=!0)},o(t){h(n.$$.fragment,t),h(w.$$.fragment,t),h(b.$$.fragment,t),h(I.$$.fragment,t),N=!1},d(t){t&&i(e),v(n,t),t&&i(x),v(w,t),t&&i(j),v(b,t),t&&i(T),v(I,t),A=!1,E()}}}async function X({session:t}){let e=await M("user",t.token);return console.log(e),e?{props:{user:e}}:{status:302,redirect:"login"}}function Y(t,e,n){let s;k(t,K,(t=>n(19,s=t)));let a,$,r,o,c,i,f,{user:m={}}=e,u=[];const l=async()=>{let t={tags:u,name:r,image:f,price:undefined,itype:c,itext:o},e=await O("items",t,s.token).finally((t=>t));e.nameError&&n(0,a=!0),e.id&&F(`/item/${e.id}`)};return t.$$set=t=>{"user"in t&&n(9,m=t.user)},t.$$.update=()=>{1024&t.$$.dirty&&n(10,c=L(c))},[a,$,r,o,i,u,f,t=>{switch(t.keyCode){case 13:t.ctrlKey&&l()}},l,m,c,function(t){f=t,n(6,f)},function(t){u=t,n(5,u)},function(t){a=t,n(0,a)},function(t){r=t,n(2,r)},function(t){i=t,n(4,i)},function(t){$=t,n(1,$)},function(t){o=t,n(3,o)}]}export default class extends t{constructor(t){super(),e(this,t,Y,W,n,{user:9})}}export{X as load};
