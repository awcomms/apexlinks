import{S as t,i as e,s,A as n,D as r,E as $,F as o,j as a,m as c,o as i,p as m,q as l,G as p,v as f,r as u,w as d,H as g,I as h,J as x,K as w,L as y,M as S,N as k,k as v,n as b,f as _,O as N,d as j,P as O,Q as A,l as E,B as I,u as K,R as C,e as M,c as D,a as H,b as T,T as V,U as F,V as J,W as L,X as P,C as R,Y as q,x as z,z as B,y as G,Z as Q,_ as U}from"../chunks/vendor-221a53e8.js";import"../chunks/api-464cac91.js";import{p as W}from"../chunks/utils-6d6449a6.js";import{g as X}from"../chunks/navigation-20968cc5.js";import{n as Y,p as Z}from"../chunks/stores-84c57af6.js";import{i as tt}from"../chunks/stores-132b7e55.js";import"../chunks/singletons-bb9012b7.js";function et(t){let e,s,g,h;const x=[t[3]];function w(e){t[4](e)}function y(e){t[5](e)}let S={};for(let r=0;r<x.length;r+=1)S=n(S,x[r]);return void 0!==t[0]&&(S.href=t[0]),void 0!==t[1]&&(S.text=t[1]),e=new r({props:S}),$.push((()=>o(e,"href",w))),$.push((()=>o(e,"text",y))),e.$on("click",t[6]),e.$on("click",t[2]),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){i(e,t,s),h=!0},p(t,[n]){const r=8&n?m(x,[l(t[3])]):{};!s&&1&n&&(s=!0,r.href=t[0],p((()=>s=!1))),!g&&2&n&&(g=!0,r.text=t[1],p((()=>g=!1))),e.$set(r)},i(t){h||(f(e.$$.fragment,t),h=!0)},o(t){u(e.$$.fragment,t),h=!1},d(t){d(e,t)}}}function st(t,e,s){const r=["href","text"];let $,o=g(e,r);h(t,tt,(t=>s(7,$=t)));let{href:a=""}=e,{text:c=""}=e;return t.$$set=t=>{e=n(n({},e),x(t)),s(3,o=g(e,r)),"href"in t&&s(0,a=t.href),"text"in t&&s(1,c=t.text)},[a,c,()=>{w(tt,$=!1,$)},o,function(t){a=t,s(0,a)},function(t){c=t,s(1,c)},function(e){y(t,e)}]}class nt extends t{constructor(t){super(),e(this,t,st,et,s,{href:0,text:1})}}const{window:rt}=A;function $t(t){let e,s;return e=new F({}),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){i(e,t,n),s=!0},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function ot(t){let e,s,n=t[4]&&$t();return{c(){n&&n.c(),e=E()},l(t){n&&n.l(t),e=E()},m(t,r){n&&n.m(t,r),_(t,e,r),s=!0},p(t,s){t[4]?n?16&s&&f(n,1):(n=$t(),n.c(),f(n,1),n.m(e.parentNode,e)):n&&(I(),u(n,1,1,(()=>{n=null})),K())},i(t){s||(f(n),s=!0)},o(t){u(n),s=!1},d(t){n&&n.d(t),t&&j(e)}}}function at(t){let e,s,n;return s=new C({}),{c(){e=M("div"),a(s.$$.fragment),this.h()},l(t){e=D(t,"DIV",{slot:!0});var n=H(e);c(s.$$.fragment,n),n.forEach(j),this.h()},h(){T(e,"slot","skip-to-content")},m(t,r){_(t,e,r),i(s,e,null),n=!0},i(t){n||(f(s.$$.fragment,t),n=!0)},o(t){u(s.$$.fragment,t),n=!1},d(t){t&&j(e),d(s)}}}function ct(t){let e,s,n,r=t[1]&&it(t);return s=new nt({props:{isSelected:"login"==t[5].path.split("/")[1],text:"Login",href:"/login"}}),{c(){r&&r.c(),e=v(),a(s.$$.fragment)},l(t){r&&r.l(t),e=b(t),c(s.$$.fragment,t)},m(t,$){r&&r.m(t,$),_(t,e,$),i(s,t,$),n=!0},p(t,n){t[1]?r?(r.p(t,n),2&n&&f(r,1)):(r=it(t),r.c(),f(r,1),r.m(e.parentNode,e)):r&&(I(),u(r,1,1,(()=>{r=null})),K());const $={};32&n&&($.isSelected="login"==t[5].path.split("/")[1]),s.$set($)},i(t){n||(f(r),f(s.$$.fragment,t),n=!0)},o(t){u(r),u(s.$$.fragment,t),n=!1},d(t){r&&r.d(t),t&&j(e),d(s,t)}}}function it(t){let e,s,n;function r(e){t[11](e)}let m={href:"",text:"Add To Homescreen"};return void 0!==t[2]&&(m.ref=t[2]),e=new nt({props:m}),$.push((()=>o(e,"ref",r))),e.$on("click",t[8]),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){i(e,t,s),n=!0},p(t,n){const r={};!s&&4&n&&(s=!0,r.ref=t[2],p((()=>s=!1))),e.$set(r)},i(t){n||(f(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){d(e,t)}}}function mt(t){let e,s,n,r,$,o,m,l,p,g;return e=new J({props:{text:"Rooms",$$slots:{default:[lt]},$$scope:{ctx:t}}}),n=new nt({props:{isSelected:"add_item"==t[5].path.split("/")[1],href:"/add_item",text:"Add Item"}}),$=new nt({props:{isSelected:"items"==t[5].path.split("/")[1],href:"/items/"+t[0].id,text:"My Items"}}),m=new nt({props:{isSelected:"edit"==t[5].path.split("/")[1],href:"/edit",text:"Edit"}}),p=new nt({props:{text:"Exit",href:""}}),p.$on("click",t[9]),{c(){a(e.$$.fragment),s=v(),a(n.$$.fragment),r=v(),a($.$$.fragment),o=v(),a(m.$$.fragment),l=v(),a(p.$$.fragment)},l(t){c(e.$$.fragment,t),s=b(t),c(n.$$.fragment,t),r=b(t),c($.$$.fragment,t),o=b(t),c(m.$$.fragment,t),l=b(t),c(p.$$.fragment,t)},m(t,a){i(e,t,a),_(t,s,a),i(n,t,a),_(t,r,a),i($,t,a),_(t,o,a),i(m,t,a),_(t,l,a),i(p,t,a),g=!0},p(t,s){const r={};65568&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r);const o={};32&s&&(o.isSelected="add_item"==t[5].path.split("/")[1]),n.$set(o);const a={};32&s&&(a.isSelected="items"==t[5].path.split("/")[1]),1&s&&(a.href="/items/"+t[0].id),$.$set(a);const c={};32&s&&(c.isSelected="edit"==t[5].path.split("/")[1]),m.$set(c)},i(t){g||(f(e.$$.fragment,t),f(n.$$.fragment,t),f($.$$.fragment,t),f(m.$$.fragment,t),f(p.$$.fragment,t),g=!0)},o(t){u(e.$$.fragment,t),u(n.$$.fragment,t),u($.$$.fragment,t),u(m.$$.fragment,t),u(p.$$.fragment,t),g=!1},d(t){d(e,t),t&&j(s),d(n,t),t&&j(r),d($,t),t&&j(o),d(m,t),t&&j(l),d(p,t)}}}function lt(t){let e,s,n,r,$,o;return e=new nt({props:{isSelected:"rooms"==t[5].path.split("/")[1],href:"/rooms",text:"All rooms"}}),n=new nt({props:{isSelected:"my_rooms"==t[5].path.split("/")[1],href:"/my_rooms",text:"My rooms"}}),$=new nt({props:{isSelected:"add_room"==t[5].path.split("/")[1],href:"/add_room",text:"Add room"}}),{c(){a(e.$$.fragment),s=v(),a(n.$$.fragment),r=v(),a($.$$.fragment)},l(t){c(e.$$.fragment,t),s=b(t),c(n.$$.fragment,t),r=b(t),c($.$$.fragment,t)},m(t,a){i(e,t,a),_(t,s,a),i(n,t,a),_(t,r,a),i($,t,a),o=!0},p(t,s){const r={};32&s&&(r.isSelected="rooms"==t[5].path.split("/")[1]),e.$set(r);const o={};32&s&&(o.isSelected="my_rooms"==t[5].path.split("/")[1]),n.$set(o);const a={};32&s&&(a.isSelected="add_room"==t[5].path.split("/")[1]),$.$set(a)},i(t){o||(f(e.$$.fragment,t),f(n.$$.fragment,t),f($.$$.fragment,t),o=!0)},o(t){u(e.$$.fragment,t),u(n.$$.fragment,t),u($.$$.fragment,t),o=!1},d(t){d(e,t),t&&j(s),d(n,t),t&&j(r),d($,t)}}}function pt(t){let e,s,n,r=!t[0]&&ct(t),$=t[0]&&mt(t);return{c(){r&&r.c(),e=v(),$&&$.c(),s=E()},l(t){r&&r.l(t),e=b(t),$&&$.l(t),s=E()},m(t,o){r&&r.m(t,o),_(t,e,o),$&&$.m(t,o),_(t,s,o),n=!0},p(t,n){t[0]?r&&(I(),u(r,1,1,(()=>{r=null})),K()):r?(r.p(t,n),1&n&&f(r,1)):(r=ct(t),r.c(),f(r,1),r.m(e.parentNode,e)),t[0]?$?($.p(t,n),1&n&&f($,1)):($=mt(t),$.c(),f($,1),$.m(s.parentNode,s)):$&&(I(),u($,1,1,(()=>{$=null})),K())},i(t){n||(f(r),f($),n=!0)},o(t){u(r),u($),n=!1},d(t){r&&r.d(t),t&&j(e),$&&$.d(t),t&&j(s)}}}function ft(t){let e,s;return e=new V({props:{$$slots:{default:[pt]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){i(e,t,n),s=!0},p(t,s){const n={};65575&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function ut(t){let e,s,n,r,m,l,g,h;function x(e){t[10](e)}let w={persistentHamburgerMenu:!0,company:"Apexlinks",platFormName:"",href:"/",$$slots:{"skip-to-content":[at],default:[ot]},$$scope:{ctx:t}};function y(e){t[12](e)}void 0!==t[3]&&(w.isSideNavOpen=t[3]),e=new S({props:w}),$.push((()=>o(e,"isSideNavOpen",x)));let A={$$slots:{default:[ft]},$$scope:{ctx:t}};return void 0!==t[3]&&(A.isOpen=t[3]),r=new k({props:A}),$.push((()=>o(r,"isOpen",y))),{c(){a(e.$$.fragment),n=v(),a(r.$$.fragment)},l(t){c(e.$$.fragment,t),n=b(t),c(r.$$.fragment,t)},m(s,$){i(e,s,$),_(s,n,$),i(r,s,$),l=!0,g||(h=[N(rt,"appinstalled",t[6]),N(rt,"beforeinstallprompt",t[7])],g=!0)},p(t,[n]){const $={};65552&n&&($.$$scope={dirty:n,ctx:t}),!s&&8&n&&(s=!0,$.isSideNavOpen=t[3],p((()=>s=!1))),e.$set($);const o={};65575&n&&(o.$$scope={dirty:n,ctx:t}),!m&&8&n&&(m=!0,o.isOpen=t[3],p((()=>m=!1))),r.$set(o)},i(t){l||(f(e.$$.fragment,t),f(r.$$.fragment,t),l=!0)},o(t){u(e.$$.fragment,t),u(r.$$.fragment,t),l=!1},d(t){d(e,t),t&&j(n),d(r,t),g=!1,O(h)}}}function dt(t,e,s){let n,r,$;h(t,tt,(t=>s(3,n=t))),h(t,Y,(t=>s(4,r=t))),h(t,Z,(t=>s(5,$=t)));let o,a,c,{user:i=null}=e;console.log("us",i),w(tt,n=!1,n);return t.$$set=t=>{"user"in t&&s(0,i=t.user)},[i,o,a,n,r,$,()=>{s(1,o=!1)},t=>{s(1,o=!0),t.preventDefault(),c=t},()=>{c.prompt(),c.userChoice.then((t=>{"accepted"===t.outcome&&s(1,o=!1)}))},async()=>{await W("/auth/exit"),X("/login")},function(t){n=t,tt.set(n)},function(t){a=t,s(2,a)},function(t){n=t,tt.set(n)}]}class gt extends t{constructor(t){super(),e(this,t,dt,ut,s,{user:0})}}function ht(t){let e;const s=t[5].default,n=L(s,t,t[4],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,[r]){n&&n.p&&(!e||16&r)&&P(n,s,t,t[4],r,null,null)},i(t){e||(f(n,t),e=!0)},o(t){u(n,t),e=!1},d(t){n&&n.d(t)}}}function xt(t,e,s){let{$$slots:n={},$$scope:r}=e,{persist:$=!1}=e,{persistKey:o="theme"}=e,{theme:a="white"}=e;const c=["white","g10","g90","g100"],i=t=>c.includes(t),m=t=>i(t)&&("g90"===t||"g100"===t),l=R(a),p=R(m(a)),f=q(p,(t=>!t)),u=l.subscribe((t=>{s(0,a=t)}));let d=null;return z("Theme",{updateVar:(t,e)=>{null!=d&&d.documentElement.style.setProperty(t,e)},carbon_theme:l,dark:p,light:f}),B((()=>{d=window.document;try{const t=localStorage.getItem(o);i(t)&&l.set(t)}catch(t){console.error(t)}return()=>{u()}})),G((()=>{i(a)?(null!=d&&d.documentElement.setAttribute("theme",a),$&&localStorage.setItem(o,a)):console.warn(`"${a}" is not a valid Carbon theme. Choose from available themes: ${JSON.stringify(c)}`)})),t.$$set=t=>{"persist"in t&&s(1,$=t.persist),"persistKey"in t&&s(2,o=t.persistKey),"theme"in t&&s(0,a=t.theme),"$$scope"in t&&s(4,r=t.$$scope)},t.$$.update=()=>{1&t.$$.dirty&&p.set(m(a))},[a,$,o,c,r,n]}class wt extends t{constructor(t){super(),e(this,t,xt,ht,s,{persist:1,persistKey:2,theme:0,themes:3})}get themes(){return this.$$.ctx[3]}}function yt(t){let e;const s=t[0].default,n=L(s,t,t[1],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,r){n&&n.p&&(!e||2&r)&&P(n,s,t,t[1],r,null,null)},i(t){e||(f(n,t),e=!0)},o(t){u(n,t),e=!1},d(t){n&&n.d(t)}}}function St(t){let e,s;return e=new U({props:{$$slots:{default:[yt]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){i(e,t,n),s=!0},p(t,s){const n={};2&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function kt(t){let e,s,n,r;return e=new gt({}),n=new Q({props:{style:"background: none; padding: 1rem",$$slots:{default:[St]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment),s=v(),a(n.$$.fragment)},l(t){c(e.$$.fragment,t),s=b(t),c(n.$$.fragment,t)},m(t,$){i(e,t,$),_(t,s,$),i(n,t,$),r=!0},p(t,e){const s={};2&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){r||(f(e.$$.fragment,t),f(n.$$.fragment,t),r=!0)},o(t){u(e.$$.fragment,t),u(n.$$.fragment,t),r=!1},d(t){d(e,t),t&&j(s),d(n,t)}}}function vt(t){let e,s;return e=new wt({props:{persist:!0,theme:"g10",$$slots:{default:[kt]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,n){i(e,t,n),s=!0},p(t,[s]){const n={};2&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function bt(t,e,s){let{$$slots:n={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&s(1,r=t.$$scope)},[n,r]}export default class extends t{constructor(t){super(),e(this,t,bt,vt,s,{})}}