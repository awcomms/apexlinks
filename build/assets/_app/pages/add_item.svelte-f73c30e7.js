import{S as t,i as e,s as n,E as a,F as s,a1 as $,k as r,j as o,a5 as c,d as i,n as m,m as f,f as l,o as u,O as p,G as d,v as g,r as h,w as v,a2 as k,ak as x,al as w,az as y,l as b,B as j,u as T,am as I,an as A,aA as N,t as E,g as G}from"../chunks/vendor-83a11e53.js";import{i as C}from"../chunks/initialCaps-68f7c1e1.js";import{I as D}from"../chunks/Image-7ac14d1b.js";import{T as L}from"../chunks/Tag-875b6479.js";import{I as z}from"../chunks/Input-a2a62266.js";import{g as B}from"../chunks/navigation-20968cc5.js";import{a as F}from"../chunks/api-5c0c9630.js";import"../chunks/singletons-bb9012b7.js";import"../chunks/post-5b27026c.js";function K(t){let e,n,$;function r(e){t[15](e)}let c={labelText:"Link"};return void 0!==t[1]&&(c.value=t[1]),e=new A({props:c}),a.push((()=>s(e,"value",r))),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,n){u(e,t,n),$=!0},p(t,a){const s={};!n&&2&a&&(n=!0,s.value=t[1],d((()=>n=!1))),e.$set(s)},i(t){$||(g(e.$$.fragment,t),$=!0)},o(t){h(e.$$.fragment,t),$=!1},d(t){v(e,t)}}}function M(t){let e,n,$;function r(e){t[16](e)}let c={placeholder:"Description(Markdown)",labelText:"Description(markdown)"};return void 0!==t[3]&&(c.value=t[3]),e=new N({props:c}),a.push((()=>s(e,"value",r))),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,n){u(e,t,n),$=!0},p(t,a){const s={};!n&&8&a&&(n=!0,s.value=t[3],d((()=>n=!1))),e.$set(s)},i(t){$||(g(e.$$.fragment,t),$=!0)},o(t){h(e.$$.fragment,t),$=!1},d(t){v(e,t)}}}function O(t){let e,n,$,c,p,k,x,w,I,A;function N(e){t[12](e)}function E(e){t[13](e)}let G={invalidText:"Name taken",labelText:"Name"};function C(e){t[14](e)}void 0!==t[0]&&(G.invalid=t[0]),void 0!==t[2]&&(G.value=t[2]),e=new z({props:G}),a.push((()=>s(e,"invalid",N))),a.push((()=>s(e,"value",E)));let D={labelText:"Let the item's listing redirect to a link"};void 0!==t[4]&&(D.checked=t[4]),p=new y({props:D}),a.push((()=>s(p,"checked",C)));let L=t[4]&&K(t),B=!t[4]&&M(t);return{c(){o(e.$$.fragment),c=r(),o(p.$$.fragment),x=r(),L&&L.c(),w=r(),B&&B.c(),I=b()},l(t){f(e.$$.fragment,t),c=m(t),f(p.$$.fragment,t),x=m(t),L&&L.l(t),w=m(t),B&&B.l(t),I=b()},m(t,n){u(e,t,n),l(t,c,n),u(p,t,n),l(t,x,n),L&&L.m(t,n),l(t,w,n),B&&B.m(t,n),l(t,I,n),A=!0},p(t,a){const s={};!n&&1&a&&(n=!0,s.invalid=t[0],d((()=>n=!1))),!$&&4&a&&($=!0,s.value=t[2],d((()=>$=!1))),e.$set(s);const r={};!k&&16&a&&(k=!0,r.checked=t[4],d((()=>k=!1))),p.$set(r),t[4]?L?(L.p(t,a),16&a&&g(L,1)):(L=K(t),L.c(),g(L,1),L.m(w.parentNode,w)):L&&(j(),h(L,1,1,(()=>{L=null})),T()),t[4]?B&&(j(),h(B,1,1,(()=>{B=null})),T()):B?(B.p(t,a),16&a&&g(B,1)):(B=M(t),B.c(),g(B,1),B.m(I.parentNode,I))},i(t){A||(g(e.$$.fragment,t),g(p.$$.fragment,t),g(L),g(B),A=!0)},o(t){h(e.$$.fragment,t),h(p.$$.fragment,t),h(L),h(B),A=!1},d(t){v(e,t),t&&i(c),v(p,t),t&&i(x),L&&L.d(t),t&&i(w),B&&B.d(t),t&&i(I)}}}function S(t){let e,n;return e=new x({props:{$$slots:{default:[O]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,a){u(e,t,a),n=!0},p(t,n){const a={};524319&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function q(t){let e,n;return e=new k({props:{$$slots:{default:[S]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,a){u(e,t,a),n=!0},p(t,n){const a={};524319&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function H(t){let e;return{c(){e=E("Add")},l(t){e=G(t,"Add")},m(t,n){l(t,e,n)},d(t){t&&i(e)}}}function J(t){let e,n;return e=new I({props:{$$slots:{default:[H]},$$scope:{ctx:t}}}),e.$on("click",t[8]),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,a){u(e,t,a),n=!0},p(t,n){const a={};524288&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function P(t){let e,n;return e=new w({props:{stacked:!0,$$slots:{default:[J]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,a){u(e,t,a),n=!0},p(t,n){const a={};524288&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function Q(t){let e,n;return e=new k({props:{$$slots:{default:[P]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,a){u(e,t,a),n=!0},p(t,n){const a={};524288&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function R(t){let e,n,k,x,w,y,b,j,T,I,A,N,E;function G(e){t[10](e)}let C={};function z(e){t[11](e)}void 0!==t[6]&&(C.image=t[6]),n=new D({props:C}),a.push((()=>s(n,"image",G)));let B={};return void 0!==t[5]&&(B.tags=t[5]),w=new L({props:B}),a.push((()=>s(w,"tags",z))),j=new $({props:{noGutter:!0,$$slots:{default:[q]},$$scope:{ctx:t}}}),I=new $({props:{noGutter:!0,$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){e=r(),o(n.$$.fragment),x=r(),o(w.$$.fragment),b=r(),o(j.$$.fragment),T=r(),o(I.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-7tntdn"]',document.head).forEach(i),e=m(t),f(n.$$.fragment,t),x=m(t),f(w.$$.fragment,t),b=m(t),f(j.$$.fragment,t),T=m(t),f(I.$$.fragment,t),this.h()},h(){document.title="Add Item"},m(a,s){l(a,e,s),u(n,a,s),l(a,x,s),u(w,a,s),l(a,b,s),u(j,a,s),l(a,T,s),u(I,a,s),A=!0,N||(E=p(window,"keydown",t[7]),N=!0)},p(t,[e]){const a={};!k&&64&e&&(k=!0,a.image=t[6],d((()=>k=!1))),n.$set(a);const s={};!y&&32&e&&(y=!0,s.tags=t[5],d((()=>y=!1))),w.$set(s);const $={};524319&e&&($.$$scope={dirty:e,ctx:t}),j.$set($);const r={};524288&e&&(r.$$scope={dirty:e,ctx:t}),I.$set(r)},i(t){A||(g(n.$$.fragment,t),g(w.$$.fragment,t),g(j.$$.fragment,t),g(I.$$.fragment,t),A=!0)},o(t){h(n.$$.fragment,t),h(w.$$.fragment,t),h(j.$$.fragment,t),h(I.$$.fragment,t),A=!1},d(t){t&&i(e),v(n,t),t&&i(x),v(w,t),t&&i(b),v(j,t),t&&i(T),v(I,t),N=!1,E()}}}async function U({session:t}){if(!t.user)return{status:302,redirect:"login"}}function V(t,e,n){let a,s,$,r,o,c,i,m=[];const f=async()=>{let t={tags:m,name:$,image:i,price:undefined,itype:o,itext:r},e=await F.post("items",t).finally((t=>t));e.nameError&&n(0,a=!0),e.id&&B(`/item/${e.id}`)};return t.$$.update=()=>{512&t.$$.dirty&&n(9,o=C(o))},[a,s,$,r,c,m,i,t=>{switch(t.keyCode){case 13:t.ctrlKey&&f()}},f,o,function(t){i=t,n(6,i)},function(t){m=t,n(5,m)},function(t){a=t,n(0,a)},function(t){$=t,n(2,$)},function(t){c=t,n(4,c)},function(t){s=t,n(1,s)},function(t){r=t,n(3,r)}]}export default class extends t{constructor(t){super(),e(this,t,V,R,n,{})}}export{U as load};
