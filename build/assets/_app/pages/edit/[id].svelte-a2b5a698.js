import{S as pe,i as _e,s as ce,ap as ge,E as G,F as S,a1 as X,j as k,k as N,m as h,n as q,a5 as de,d as D,o as v,f as B,O as be,G as A,x as c,u as g,v as w,a2 as y,al as ke,e as he,t as x,c as ve,a as we,g as ee,a4 as Te,az as ne,ak as se,am as ie,an as Ie,l as re,r as je,w as Ee,aA as Ce}from"../../chunks/vendor-cce9f310.js";import{a as te}from"../../chunks/api-5c0c9630.js";import{g as ue}from"../../chunks/navigation-51f4a605.js";import{i as De}from"../../chunks/initialCaps-68f7c1e1.js";import{T as Fe}from"../../chunks/Tag-6147c832.js";import{I as Be}from"../../chunks/Image-3c710c51.js";import{F as Ge}from"../../chunks/Fields-e6f6d5c0.js";import{I as fe}from"../../chunks/Input-93bd4be1.js";import{a as Se}from"../../chunks/abslink-3768d0d8.js";import"../../chunks/post-5b27026c.js";import"../../chunks/singletons-12a22614.js";function Ae(i){let e,n;return{c(){e=he("p"),n=x("Sure you want to delete this item?")},l(t){e=ve(t,"P",{});var f=we(e);n=ee(f,"Sure you want to delete this item?"),f.forEach(D)},m(t,f){B(t,e,f),Te(e,n)},d(t){t&&D(e)}}}function Ne(i){let e,n,t;function f(r){i[22](r)}let s={labelText:"Hidden"};return i[3]!==void 0&&(s.checked=i[3]),e=new ne({props:s}),G.push(()=>S(e,"checked",f)),{c(){k(e.$$.fragment)},l(r){h(e.$$.fragment,r)},m(r,o){v(e,r,o),t=!0},p(r,o){const a={};!n&&o[0]&8&&(n=!0,a.checked=r[3],A(()=>n=!1)),e.$set(a)},i(r){t||(c(e.$$.fragment,r),t=!0)},o(r){g(e.$$.fragment,r),t=!1},d(r){w(e,r)}}}function qe(i){let e,n;return e=new y({props:{$$slots:{default:[Ne]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,f){v(e,t,f),n=!0},p(t,f){const s={};f[0]&8|f[1]&256&&(s.$$scope={dirty:f,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function He(i){let e,n,t;function f(r){i[24](r)}let s={pin:!0};return i[7]!==void 0&&(s.fields=i[7]),e=new Ge({props:s}),G.push(()=>S(e,"fields",f)),{c(){k(e.$$.fragment)},l(r){h(e.$$.fragment,r)},m(r,o){v(e,r,o),t=!0},p(r,o){const a={};!n&&o[0]&128&&(n=!0,a.fields=r[7],A(()=>n=!1)),e.$set(a)},i(r){t||(c(e.$$.fragment,r),t=!0)},o(r){g(e.$$.fragment,r),t=!1},d(r){w(e,r)}}}function Le(i){let e,n;return e=new y({props:{$$slots:{default:[He]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,f){v(e,t,f),n=!0},p(t,f){const s={};f[0]&128|f[1]&256&&(s.$$scope={dirty:f,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function Me(i){let e,n,t,f;function s(a){i[25](a)}function r(a){i[26](a)}let o={labelText:"Name",invalidText:"Name taken"};return i[8]!==void 0&&(o.value=i[8]),i[1]!==void 0&&(o.invalid=i[1]),e=new fe({props:o}),G.push(()=>S(e,"value",s)),G.push(()=>S(e,"invalid",r)),{c(){k(e.$$.fragment)},l(a){h(e.$$.fragment,a)},m(a,T){v(e,a,T),f=!0},p(a,T){const _={};!n&&T[0]&256&&(n=!0,_.value=a[8],A(()=>n=!1)),!t&&T[0]&2&&(t=!0,_.invalid=a[1],A(()=>t=!1)),e.$set(_)},i(a){f||(c(e.$$.fragment,a),f=!0)},o(a){g(e.$$.fragment,a),f=!1},d(a){w(e,a)}}}function Oe(i){let e,n,t;function f(r){i[34](r)}let s={placeholder:"Description(Markdown)"};return i[2]!==void 0&&(s.value=i[2]),e=new Ce({props:s}),G.push(()=>S(e,"value",f)),{c(){k(e.$$.fragment)},l(r){h(e.$$.fragment,r)},m(r,o){v(e,r,o),t=!0},p(r,o){const a={};!n&&o[0]&4&&(n=!0,a.value=r[2],A(()=>n=!1)),e.$set(a)},i(r){t||(c(e.$$.fragment,r),t=!0)},o(r){g(e.$$.fragment,r),t=!1},d(r){w(e,r)}}}function Re(i){let e,n,t,f,s,r;function o(m){i[29](m)}function a(m){i[30](m)}function T(m){i[31](m)}function _(m){i[32](m)}let I={labelText:"Link"};return i[11]!==void 0&&(I.invalid=i[11]),i[12]!==void 0&&(I.invalidText=i[12]),i[5]!==void 0&&(I.value=i[5]),i[10]!==void 0&&(I.ref=i[10]),e=new fe({props:I}),G.push(()=>S(e,"invalid",o)),G.push(()=>S(e,"invalidText",a)),G.push(()=>S(e,"value",T)),G.push(()=>S(e,"ref",_)),e.$on("input",i[33]),{c(){k(e.$$.fragment)},l(m){h(e.$$.fragment,m)},m(m,d){v(e,m,d),r=!0},p(m,d){const j={};!n&&d[0]&2048&&(n=!0,j.invalid=m[11],A(()=>n=!1)),!t&&d[0]&4096&&(t=!0,j.invalidText=m[12],A(()=>t=!1)),!f&&d[0]&32&&(f=!0,j.value=m[5],A(()=>f=!1)),!s&&d[0]&1024&&(s=!0,j.ref=m[10],A(()=>s=!1)),e.$set(j)},i(m){r||(c(e.$$.fragment,m),r=!0)},o(m){g(e.$$.fragment,m),r=!1},d(m){w(e,m)}}}function ze(i){let e,n,t,f,s,r,o,a,T,_;function I(l){i[27](l)}let m={labelText:"Item type"};i[0]!==void 0&&(m.value=i[0]),e=new Ie({props:m}),G.push(()=>S(e,"value",I));function d(l){i[28](l)}let j={labelText:"Let the item's listing redirect to a link"};i[4]!==void 0&&(j.checked=i[4]),f=new ne({props:j}),G.push(()=>S(f,"checked",d));const F=[Re,Oe],E=[];function C(l,b){return l[4]?0:1}return o=C(i),a=E[o]=F[o](i),{c(){k(e.$$.fragment),t=N(),k(f.$$.fragment),r=N(),a.c(),T=re()},l(l){h(e.$$.fragment,l),t=q(l),h(f.$$.fragment,l),r=q(l),a.l(l),T=re()},m(l,b){v(e,l,b),B(l,t,b),v(f,l,b),B(l,r,b),E[o].m(l,b),B(l,T,b),_=!0},p(l,b){const L={};!n&&b[0]&1&&(n=!0,L.value=l[0],A(()=>n=!1)),e.$set(L);const M={};!s&&b[0]&16&&(s=!0,M.checked=l[4],A(()=>s=!1)),f.$set(M);let H=o;o=C(l),o===H?E[o].p(l,b):(je(),g(E[H],1,1,()=>{E[H]=null}),Ee(),a=E[o],a?a.p(l,b):(a=E[o]=F[o](l),a.c()),c(a,1),a.m(T.parentNode,T))},i(l){_||(c(e.$$.fragment,l),c(f.$$.fragment,l),c(a),_=!0)},o(l){g(e.$$.fragment,l),g(f.$$.fragment,l),g(a),_=!1},d(l){w(e,l),l&&D(t),w(f,l),l&&D(r),E[o].d(l),l&&D(T)}}}function Ke(i){let e,n,t,f;return e=new se({props:{$$slots:{default:[Me]},$$scope:{ctx:i}}}),t=new se({props:{$$slots:{default:[ze]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment),n=N(),k(t.$$.fragment)},l(s){h(e.$$.fragment,s),n=q(s),h(t.$$.fragment,s)},m(s,r){v(e,s,r),B(s,n,r),v(t,s,r),f=!0},p(s,r){const o={};r[0]&258|r[1]&256&&(o.$$scope={dirty:r,ctx:s}),e.$set(o);const a={};r[0]&7221|r[1]&256&&(a.$$scope={dirty:r,ctx:s}),t.$set(a)},i(s){f||(c(e.$$.fragment,s),c(t.$$.fragment,s),f=!0)},o(s){g(e.$$.fragment,s),g(t.$$.fragment,s),f=!1},d(s){w(e,s),s&&D(n),w(t,s)}}}function Pe(i){let e,n;return e=new y({props:{$$slots:{default:[Ke]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,f){v(e,t,f),n=!0},p(t,f){const s={};f[0]&7479|f[1]&256&&(s.$$scope={dirty:f,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function Ue(i){let e;return{c(){e=x("Delete Item")},l(n){e=ee(n,"Delete Item")},m(n,t){B(n,e,t)},d(n){n&&D(e)}}}function Je(i){let e;return{c(){e=x("Edit")},l(n){e=ee(n,"Edit")},m(n,t){B(n,e,t)},d(n){n&&D(e)}}}function Qe(i){let e,n,t,f;return e=new ie({props:{$$slots:{default:[Ue]},$$scope:{ctx:i}}}),e.$on("click",i[35]),t=new ie({props:{$$slots:{default:[Je]},$$scope:{ctx:i}}}),t.$on("click",i[16]),{c(){k(e.$$.fragment),n=N(),k(t.$$.fragment)},l(s){h(e.$$.fragment,s),n=q(s),h(t.$$.fragment,s)},m(s,r){v(e,s,r),B(s,n,r),v(t,s,r),f=!0},p(s,r){const o={};r[1]&256&&(o.$$scope={dirty:r,ctx:s}),e.$set(o);const a={};r[1]&256&&(a.$$scope={dirty:r,ctx:s}),t.$set(a)},i(s){f||(c(e.$$.fragment,s),c(t.$$.fragment,s),f=!0)},o(s){g(e.$$.fragment,s),g(t.$$.fragment,s),f=!1},d(s){w(e,s),s&&D(n),w(t,s)}}}function Ve(i){let e,n;return e=new ke({props:{stacked:!0,$$slots:{default:[Qe]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,f){v(e,t,f),n=!0},p(t,f){const s={};f[0]&8192|f[1]&256&&(s.$$scope={dirty:f,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function We(i){let e,n,t,f,s,r,o,a,T,_,I,m,d,j,F,E,C,l,b,L;function M(u){i[19](u)}let H={modalHeading:"Delete item",primaryButtonText:"Delete",secondaryButtonText:"Cancel",$$slots:{default:[Ae]},$$scope:{ctx:i}};i[13]!==void 0&&(H.open=i[13]),e=new ge({props:H}),G.push(()=>S(e,"open",M)),e.$on("click:button--secondary",i[20]),e.$on("submit",i[15]);function Y(u){i[21](u)}let z={};i[6]!==void 0&&(z.image=i[6]),s=new Be({props:z}),G.push(()=>S(s,"image",Y)),a=new X({props:{noGutter:!0,$$slots:{default:[qe]},$$scope:{ctx:i}}});function Z(u){i[23](u)}let K={};return i[9]!==void 0&&(K.tags=i[9]),_=new Fe({props:K}),G.push(()=>S(_,"tags",Z)),d=new X({props:{noGutter:!0,$$slots:{default:[Le]},$$scope:{ctx:i}}}),F=new X({props:{noGutter:!0,$$slots:{default:[Pe]},$$scope:{ctx:i}}}),C=new X({props:{noGutter:!0,$$slots:{default:[Ve]},$$scope:{ctx:i}}}),{c(){k(e.$$.fragment),t=N(),f=N(),k(s.$$.fragment),o=N(),k(a.$$.fragment),T=N(),k(_.$$.fragment),m=N(),k(d.$$.fragment),j=N(),k(F.$$.fragment),E=N(),k(C.$$.fragment),this.h()},l(u){h(e.$$.fragment,u),t=q(u),de('[data-svelte="svelte-m9ymwm"]',document.head).forEach(D),f=q(u),h(s.$$.fragment,u),o=q(u),h(a.$$.fragment,u),T=q(u),h(_.$$.fragment,u),m=q(u),h(d.$$.fragment,u),j=q(u),h(F.$$.fragment,u),E=q(u),h(C.$$.fragment,u),this.h()},h(){document.title="Edit Item"},m(u,p){v(e,u,p),B(u,t,p),B(u,f,p),v(s,u,p),B(u,o,p),v(a,u,p),B(u,T,p),v(_,u,p),B(u,m,p),v(d,u,p),B(u,j,p),v(F,u,p),B(u,E,p),v(C,u,p),l=!0,b||(L=be(window,"keydown",i[14]),b=!0)},p(u,p){const R={};p[1]&256&&(R.$$scope={dirty:p,ctx:u}),!n&&p[0]&8192&&(n=!0,R.open=u[13],A(()=>n=!1)),e.$set(R);const P={};!r&&p[0]&64&&(r=!0,P.image=u[6],A(()=>r=!1)),s.$set(P);const U={};p[0]&8|p[1]&256&&(U.$$scope={dirty:p,ctx:u}),a.$set(U);const J={};!I&&p[0]&512&&(I=!0,J.tags=u[9],A(()=>I=!1)),_.$set(J);const Q={};p[0]&128|p[1]&256&&(Q.$$scope={dirty:p,ctx:u}),d.$set(Q);const V={};p[0]&7479|p[1]&256&&(V.$$scope={dirty:p,ctx:u}),F.$set(V);const W={};p[0]&8192|p[1]&256&&(W.$$scope={dirty:p,ctx:u}),C.$set(W)},i(u){l||(c(e.$$.fragment,u),c(s.$$.fragment,u),c(a.$$.fragment,u),c(_.$$.fragment,u),c(d.$$.fragment,u),c(F.$$.fragment,u),c(C.$$.fragment,u),l=!0)},o(u){g(e.$$.fragment,u),g(s.$$.fragment,u),g(a.$$.fragment,u),g(_.$$.fragment,u),g(d.$$.fragment,u),g(F.$$.fragment,u),g(C.$$.fragment,u),l=!1},d(u){w(e,u),u&&D(t),u&&D(f),w(s,u),u&&D(o),w(a,u),u&&D(T),w(_,u),u&&D(m),w(d,u),u&&D(j),w(F,u),u&&D(E),w(C,u),b=!1,L()}}}async function ft({page:i,session:e}){let n=e.user;if(!n)return{status:302,redirect:"/login"};let{id:t}=i.params,f=await te.get(`items/${t}`);return f.user!==n.username?{status:302,redirect:"/items/{user.id}"}:{props:{item:f,user:n}}}function Xe(i,e,n){let{item:t}=e,{user:f}=e,s,r=t.itext,o=t.hidden,a=t.redirect,T=t.price,_=t.link,I=t.itype,m=t.image,d=t.fields||[],j=t.name,F=t.tags,E,C,l='Add a url scheme to the link, something like "http://, at the beginning',b;const L=$=>{switch($.keyCode){case 13:$.ctrlKey&&H()}},M=async()=>{(await te.del(`items/${t.id}`).finally(O=>O)).yes&&ue(`/items/${f.id}`)},H=async()=>{if(a&&!Se.test(_)){n(11,C=!0);return}let $={itext:r,image:m,link:_,redirect:a,hidden:o,fields:d,price:T,itype:I,name:j,tags:F},O=await te.put(`items/${t.id}`,$).finally(me=>me);O.nameError&&(n(1,s=!0),nameError=O.nameError),O.id&&ue(`/item/${O.id}`)};function Y($){b=$,n(13,b)}const z=()=>n(13,b=!1);function Z($){m=$,n(6,m)}function K($){o=$,n(3,o)}function u($){F=$,n(9,F)}function p($){d=$,n(7,d)}function R($){j=$,n(8,j)}function P($){s=$,n(1,s)}function U($){I=$,n(0,I)}function J($){a=$,n(4,a)}function Q($){C=$,n(11,C)}function V($){l=$,n(12,l)}function W($){_=$,n(5,_)}function ae($){E=$,n(10,E)}const le=()=>{n(11,C=!1),E.focus()};function oe($){r=$,n(2,r)}const $e=()=>n(13,b=!0);return i.$$set=$=>{"item"in $&&n(17,t=$.item),"user"in $&&n(18,f=$.user)},i.$$.update=()=>{i.$$.dirty[0]&1&&n(0,I=De(I))},[I,s,r,o,a,_,m,d,j,F,E,C,l,b,L,M,H,t,f,Y,z,Z,K,u,p,R,P,U,J,Q,V,W,ae,le,oe,$e]}class at extends pe{constructor(e){super();_e(this,e,Xe,We,ce,{item:17,user:18},null,[-1,-1])}}export{at as default,ft as load};
