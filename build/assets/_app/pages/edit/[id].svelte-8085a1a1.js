import{S as t,i as e,s as n,a7 as $,E as a,F as s,a3 as r,j as o,k as i,m as c,n as m,a9 as f,d as l,o as u,f as p,O as d,G as g,v as h,r as v,w as x,a4 as k,ax as w,e as y,t as b,c as T,a as j,g as E,a6 as I,ay as D,aw as G,an as B,au as F,l as N,B as S,u as C,az as L}from"../../chunks/vendor-221a53e8.js";import{g as z,d as A,p as H}from"../../chunks/api-464cac91.js";import{g as K}from"../../chunks/navigation-20968cc5.js";import{i as M,a as O}from"../../chunks/utils-6d6449a6.js";import{T as P}from"../../chunks/Tag-9a4ea10c.js";import{I as V}from"../../chunks/Image-ffc55824.js";import{F as q}from"../../chunks/Fields-8b2bf89c.js";import{I as J}from"../../chunks/Input-cd25684c.js";import"../../chunks/singletons-bb9012b7.js";function Q(t){let e,n;return{c(){e=y("p"),n=b("Sure you want to delete this item?")},l(t){e=T(t,"P",{});var $=j(e);n=E($,"Sure you want to delete this item?"),$.forEach(l)},m(t,$){p(t,e,$),I(e,n)},d(t){t&&l(e)}}}function R(t){let e,n,$;function r(e){t[20](e)}let i={labelText:"Visible"};return void 0!==t[4]&&(i.checked=t[4]),e=new D({props:i}),a.push((()=>s(e,"checked",r))),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){u(e,t,n),$=!0},p(t,$){const a={};!n&&16&$[0]&&(n=!0,a.checked=t[4],g((()=>n=!1))),e.$set(a)},i(t){$||(h(e.$$.fragment,t),$=!0)},o(t){v(e.$$.fragment,t),$=!1},d(t){x(e,t)}}}function U(t){let e,n;return e=new k({props:{$$slots:{default:[R]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,$){u(e,t,$),n=!0},p(t,n){const $={};16&n[0]|8&n[1]&&($.$$scope={dirty:n,ctx:t}),e.$set($)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function W(t){let e,n,$;function r(e){t[28](e)}let i={placeholder:"Description(Markdown)"};return void 0!==t[3]&&(i.value=t[3]),e=new L({props:i}),a.push((()=>s(e,"value",r))),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){u(e,t,n),$=!0},p(t,$){const a={};!n&&8&$[0]&&(n=!0,a.value=t[3],g((()=>n=!1))),e.$set(a)},i(t){$||(h(e.$$.fragment,t),$=!0)},o(t){v(e.$$.fragment,t),$=!1},d(t){x(e,t)}}}function X(t){let e,n,$;function r(e){t[27](e)}let i={invalid:t[10],invalidText:rt,labelText:"Link",focus:!0};return void 0!==t[0]&&(i.value=t[0]),e=new J({props:i}),a.push((()=>s(e,"value",r))),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){u(e,t,n),$=!0},p(t,$){const a={};1024&$[0]&&(a.invalid=t[10]),!n&&1&$[0]&&(n=!0,a.value=t[0],g((()=>n=!1))),e.$set(a)},i(t){$||(h(e.$$.fragment,t),$=!0)},o(t){v(e.$$.fragment,t),$=!1},d(t){x(e,t)}}}function Y(t){let e,n,$,r,f,d,k,w,y,b,T,j,E,I,G,B,L;function z(e){t[22](e)}function A(e){t[23](e)}let H={labelText:"Name",invalidText:"Name taken"};function K(e){t[24](e)}void 0!==t[8]&&(H.value=t[8]),void 0!==t[2]&&(H.invalid=t[2]),e=new J({props:H}),a.push((()=>s(e,"value",z))),a.push((()=>s(e,"invalid",A)));let M={pin:!0};function O(e){t[25](e)}void 0!==t[7]&&(M.fields=t[7]),f=new q({props:M}),a.push((()=>s(f,"fields",K)));let P={labelText:"Item type"};function V(e){t[26](e)}void 0!==t[1]&&(P.value=t[1]),w=new F({props:P}),a.push((()=>s(w,"value",O)));let Q={labelText:"Let the item's listing redirect to a link"};void 0!==t[5]&&(Q.checked=t[5]),T=new D({props:Q}),a.push((()=>s(T,"checked",V)));const R=[X,W],U=[];function Y(t,e){return t[5]?0:1}return I=Y(t),G=U[I]=R[I](t),{c(){o(e.$$.fragment),r=i(),o(f.$$.fragment),k=i(),o(w.$$.fragment),b=i(),o(T.$$.fragment),E=i(),G.c(),B=N()},l(t){c(e.$$.fragment,t),r=m(t),c(f.$$.fragment,t),k=m(t),c(w.$$.fragment,t),b=m(t),c(T.$$.fragment,t),E=m(t),G.l(t),B=N()},m(t,n){u(e,t,n),p(t,r,n),u(f,t,n),p(t,k,n),u(w,t,n),p(t,b,n),u(T,t,n),p(t,E,n),U[I].m(t,n),p(t,B,n),L=!0},p(t,a){const s={};!n&&256&a[0]&&(n=!0,s.value=t[8],g((()=>n=!1))),!$&&4&a[0]&&($=!0,s.invalid=t[2],g((()=>$=!1))),e.$set(s);const r={};!d&&128&a[0]&&(d=!0,r.fields=t[7],g((()=>d=!1))),f.$set(r);const o={};!y&&2&a[0]&&(y=!0,o.value=t[1],g((()=>y=!1))),w.$set(o);const i={};!j&&32&a[0]&&(j=!0,i.checked=t[5],g((()=>j=!1))),T.$set(i);let c=I;I=Y(t),I===c?U[I].p(t,a):(S(),v(U[c],1,1,(()=>{U[c]=null})),C(),G=U[I],G?G.p(t,a):(G=U[I]=R[I](t),G.c()),h(G,1),G.m(B.parentNode,B))},i(t){L||(h(e.$$.fragment,t),h(f.$$.fragment,t),h(w.$$.fragment,t),h(T.$$.fragment,t),h(G),L=!0)},o(t){v(e.$$.fragment,t),v(f.$$.fragment,t),v(w.$$.fragment,t),v(T.$$.fragment,t),v(G),L=!1},d(t){x(e,t),t&&l(r),x(f,t),t&&l(k),x(w,t),t&&l(b),x(T,t),t&&l(E),U[I].d(t),t&&l(B)}}}function Z(t){let e,n;return e=new G({props:{$$slots:{default:[Y]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,$){u(e,t,$),n=!0},p(t,n){const $={};1455&n[0]|8&n[1]&&($.$$scope={dirty:n,ctx:t}),e.$set($)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function _(t){let e,n;return e=new k({props:{$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,$){u(e,t,$),n=!0},p(t,n){const $={};1455&n[0]|8&n[1]&&($.$$scope={dirty:n,ctx:t}),e.$set($)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function tt(t){let e;return{c(){e=b("Delete Item")},l(t){e=E(t,"Delete Item")},m(t,n){p(t,e,n)},d(t){t&&l(e)}}}function et(t){let e;return{c(){e=b("Edit")},l(t){e=E(t,"Edit")},m(t,n){p(t,e,n)},d(t){t&&l(e)}}}function nt(t){let e,n,$,a;return e=new B({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}}),e.$on("click",t[29]),$=new B({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),$.$on("click",t[14]),{c(){o(e.$$.fragment),n=i(),o($.$$.fragment)},l(t){c(e.$$.fragment,t),n=m(t),c($.$$.fragment,t)},m(t,s){u(e,t,s),p(t,n,s),u($,t,s),a=!0},p(t,n){const a={};8&n[1]&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const s={};8&n[1]&&(s.$$scope={dirty:n,ctx:t}),$.$set(s)},i(t){a||(h(e.$$.fragment,t),h($.$$.fragment,t),a=!0)},o(t){v(e.$$.fragment,t),v($.$$.fragment,t),a=!1},d(t){x(e,t),t&&l(n),x($,t)}}}function $t(t){let e,n;return e=new w({props:{stacked:!0,$$slots:{default:[nt]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,$){u(e,t,$),n=!0},p(t,n){const $={};2048&n[0]|8&n[1]&&($.$$scope={dirty:n,ctx:t}),e.$set($)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function at(t){let e,n,k,w,y,b,T,j,E,I,D,G,B,F,N,S,C,L;function z(e){t[17](e)}let A={modalHeading:"Delete item",primaryButtonText:"Delete",secondaryButtonText:"Cancel",$$slots:{default:[Q]},$$scope:{ctx:t}};function H(e){t[19](e)}void 0!==t[11]&&(A.open=t[11]),e=new $({props:A}),a.push((()=>s(e,"open",z))),e.$on("click:button--secondary",t[18]),e.$on("submit",t[13]);let K={};function M(e){t[21](e)}void 0!==t[6]&&(K.image=t[6]),y=new V({props:K}),a.push((()=>s(y,"image",H))),j=new r({props:{noGutter:!0,$$slots:{default:[U]},$$scope:{ctx:t}}});let O={};return void 0!==t[9]&&(O.tags=t[9]),I=new P({props:O}),a.push((()=>s(I,"tags",M))),B=new r({props:{noGutter:!0,$$slots:{default:[_]},$$scope:{ctx:t}}}),N=new r({props:{noGutter:!0,$$slots:{default:[$t]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment),k=i(),w=i(),o(y.$$.fragment),T=i(),o(j.$$.fragment),E=i(),o(I.$$.fragment),G=i(),o(B.$$.fragment),F=i(),o(N.$$.fragment),this.h()},l(t){c(e.$$.fragment,t),k=m(t);f('[data-svelte="svelte-m9ymwm"]',document.head).forEach(l),w=m(t),c(y.$$.fragment,t),T=m(t),c(j.$$.fragment,t),E=m(t),c(I.$$.fragment,t),G=m(t),c(B.$$.fragment,t),F=m(t),c(N.$$.fragment,t),this.h()},h(){document.title="Edit Item"},m(n,$){u(e,n,$),p(n,k,$),p(n,w,$),u(y,n,$),p(n,T,$),u(j,n,$),p(n,E,$),u(I,n,$),p(n,G,$),u(B,n,$),p(n,F,$),u(N,n,$),S=!0,C||(L=d(window,"keydown",t[12]),C=!0)},p(t,$){const a={};8&$[1]&&(a.$$scope={dirty:$,ctx:t}),!n&&2048&$[0]&&(n=!0,a.open=t[11],g((()=>n=!1))),e.$set(a);const s={};!b&&64&$[0]&&(b=!0,s.image=t[6],g((()=>b=!1))),y.$set(s);const r={};16&$[0]|8&$[1]&&(r.$$scope={dirty:$,ctx:t}),j.$set(r);const o={};!D&&512&$[0]&&(D=!0,o.tags=t[9],g((()=>D=!1))),I.$set(o);const i={};1455&$[0]|8&$[1]&&(i.$$scope={dirty:$,ctx:t}),B.$set(i);const c={};2048&$[0]|8&$[1]&&(c.$$scope={dirty:$,ctx:t}),N.$set(c)},i(t){S||(h(e.$$.fragment,t),h(y.$$.fragment,t),h(j.$$.fragment,t),h(I.$$.fragment,t),h(B.$$.fragment,t),h(N.$$.fragment,t),S=!0)},o(t){v(e.$$.fragment,t),v(y.$$.fragment,t),v(j.$$.fragment,t),v(I.$$.fragment,t),v(B.$$.fragment,t),v(N.$$.fragment,t),S=!1},d(t){x(e,t),t&&l(k),t&&l(w),x(y,t),t&&l(T),x(j,t),t&&l(E),x(I,t),t&&l(G),x(B,t),t&&l(F),x(N,t),C=!1,L()}}}async function st({page:t,session:e}){let n=e.token;if(!n)return{status:302,redirect:"/login"};let{id:$}=t.params;return{props:{item:await z(`items/${$}`),user:await z("user",n)}}}let rt='Add a url scheme to the link, something like "http://, at the beginning';function ot(t,e,n){let $,a,s,{item:r}=e,{user:o}=e,i=r.itext,c=r.visible,m=r.redirect,f=r.price,l=r.link,u=r.itype,p=r.image,d=r.fields||[],g=r.name,h=r.tags;const v=async()=>{if(m&&!O.test(l))return void n(10,a=!0);let t={itext:i,id:r.id,image:p,link:l,redirect:m,visible:c,fields:d,price:f,itype:u,name:g,tags:h},e=await H("items",t,o.token).finally((t=>t));e.nameError&&(n(2,$=!0),nameError=e.nameError),e.id&&K(`/item/${e.id}`)};return t.$$set=t=>{"item"in t&&n(15,r=t.item),"user"in t&&n(16,o=t.user)},t.$$.update=()=>{1&t.$$.dirty[0]&&n(10,a=!1),2&t.$$.dirty[0]&&n(1,u=M(u))},[l,u,$,i,c,m,p,d,g,h,a,s,t=>{switch(t.keyCode){case 13:t.ctrlKey&&v()}},async()=>{(await A(`items/${r.id}`,o.token).finally((t=>t))).yes&&K(`/items/${o.id}`)},v,r,o,function(t){s=t,n(11,s)},()=>n(11,s=!1),function(t){p=t,n(6,p)},function(t){c=t,n(4,c)},function(t){h=t,n(9,h)},function(t){g=t,n(8,g)},function(t){$=t,n(2,$)},function(t){d=t,n(7,d)},function(t){u=t,n(1,u)},function(t){m=t,n(5,m)},function(t){l=t,n(0,l)},function(t){i=t,n(3,i)},()=>n(11,s=!0)]}export default class extends t{constructor(t){super(),e(this,t,ot,at,n,{item:15,user:16},[-1,-1])}}export{st as load};
