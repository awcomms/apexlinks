import{S as t,i as e,s as n,a9 as s,E as o,F as a,j as r,m as $,o as c,G as i,x as m,u,v as f,a5 as l,k as p,n as d,ab as g,d as x,f as h,w as v,I as w,a6 as y,aD as k,r as j,K as E,e as b,t as T,c as D,a as G,g as I,a8 as N,aC as S,aq as B}from"../../chunks/vendor-c7b4d8a9.js";import{g as C,d as q,p as z}from"../../chunks/api-eadfccdc.js";import{c as F}from"../../chunks/stores-fc5807c6.js";import{g as H}from"../../chunks/navigation-51f4a605.js";import{T as K}from"../../chunks/Tag-6c3f4b89.js";import{I as P}from"../../chunks/Input-8c5d8c16.js";import"../../chunks/singletons-12a22614.js";function R(t){let e,n;return{c(){e=b("p"),n=T("Sure you want to delete this room?")},l(t){e=D(t,"P",{});var s=G(e);n=I(s,"Sure you want to delete this room?"),s.forEach(x)},m(t,s){h(t,e,s),N(e,n)},d(t){t&&x(e)}}}function Y(t){let e,n,s;function l(e){t[10](e)}let p={};return void 0!==t[3]&&(p.tags=t[3]),e=new K({props:p}),o.push((()=>a(e,"tags",l))),{c(){r(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,n){c(e,t,n),s=!0},p(t,s){const o={};!n&&8&s&&(n=!0,o.tags=t[3],i((()=>n=!1))),e.$set(o)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){f(e,t)}}}function A(t){let e,n,s,l;function p(e){t[11](e)}function d(e){t[12](e)}let g={labelText:"Name",invalidText:"Name taken"};return void 0!==t[2]&&(g.value=t[2]),void 0!==t[1]&&(g.invalid=t[1]),e=new P({props:g}),o.push((()=>a(e,"value",p))),o.push((()=>a(e,"invalid",d))),{c(){r(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,n){c(e,t,n),l=!0},p(t,o){const a={};!n&&4&o&&(n=!0,a.value=t[2],i((()=>n=!1))),!s&&2&o&&(s=!0,a.invalid=t[1],i((()=>s=!1))),e.$set(a)},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){u(e.$$.fragment,t),l=!1},d(t){f(e,t)}}}function J(t){let e,n;return e=new S({props:{$$slots:{default:[A]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,n){const s={};32774&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){f(e,t)}}}function L(t){let e,n;return e=new y({props:{$$slots:{default:[J]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,n){const s={};32774&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){f(e,t)}}}function M(t){let e;return{c(){e=T("Delete")},l(t){e=I(t,"Delete")},m(t,n){h(t,e,n)},d(t){t&&x(e)}}}function O(t){let e;return{c(){e=T("Edit")},l(t){e=I(t,"Edit")},m(t,n){h(t,e,n)},d(t){t&&x(e)}}}function Q(t){let e,n,s,o;return e=new B({props:{$$slots:{default:[M]},$$scope:{ctx:t}}}),e.$on("click",t[13]),s=new B({props:{$$slots:{default:[O]},$$scope:{ctx:t}}}),s.$on("click",t[6]),{c(){r(e.$$.fragment),n=p(),r(s.$$.fragment)},l(t){$(e.$$.fragment,t),n=d(t),$(s.$$.fragment,t)},m(t,a){c(e,t,a),h(t,n,a),c(s,t,a),o=!0},p(t,n){const o={};32768&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const a={};32768&n&&(a.$$scope={dirty:n,ctx:t}),s.$set(a)},i(t){o||(m(e.$$.fragment,t),m(s.$$.fragment,t),o=!0)},o(t){u(e.$$.fragment,t),u(s.$$.fragment,t),o=!1},d(t){f(e,t),t&&x(n),f(s,t)}}}function U(t){let e,n;return e=new k({props:{stacked:!0,$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,n){const s={};32784&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){f(e,t)}}}function V(t){let e,n,w,y,k,E,b,T,D;function G(e){t[8](e)}let I={modalHeading:"Delete room",primaryButtonText:"Delete",secondaryButtonText:"Cancel",$$slots:{default:[R]},$$scope:{ctx:t}};void 0!==t[4]&&(I.open=t[4]),e=new s({props:I}),o.push((()=>a(e,"open",G))),e.$on("click:button--secondary",t[9]),e.$on("submit",t[5]);let N=t[0].open&&Y(t);return E=new l({props:{noGutter:!0,$$slots:{default:[L]},$$scope:{ctx:t}}}),T=new l({props:{noGutter:!0,$$slots:{default:[U]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment),w=p(),y=p(),N&&N.c(),k=p(),r(E.$$.fragment),b=p(),r(T.$$.fragment),this.h()},l(t){$(e.$$.fragment,t),w=d(t);g('[data-svelte="svelte-xpmx5e"]',document.head).forEach(x),y=d(t),N&&N.l(t),k=d(t),$(E.$$.fragment,t),b=d(t),$(T.$$.fragment,t),this.h()},h(){document.title="Edit Room"},m(t,n){c(e,t,n),h(t,w,n),h(t,y,n),N&&N.m(t,n),h(t,k,n),c(E,t,n),h(t,b,n),c(T,t,n),D=!0},p(t,[s]){const o={};32768&s&&(o.$$scope={dirty:s,ctx:t}),!n&&16&s&&(n=!0,o.open=t[4],i((()=>n=!1))),e.$set(o),t[0].open?N?(N.p(t,s),1&s&&m(N,1)):(N=Y(t),N.c(),m(N,1),N.m(k.parentNode,k)):N&&(j(),u(N,1,1,(()=>{N=null})),v());const a={};32774&s&&(a.$$scope={dirty:s,ctx:t}),E.$set(a);const r={};32784&s&&(r.$$scope={dirty:s,ctx:t}),T.$set(r)},i(t){D||(m(e.$$.fragment,t),m(N),m(E.$$.fragment,t),m(T.$$.fragment,t),D=!0)},o(t){u(e.$$.fragment,t),u(N),u(E.$$.fragment,t),u(T.$$.fragment,t),D=!1},d(t){f(e,t),t&&x(w),t&&x(y),N&&N.d(t),t&&x(k),f(E,t),t&&x(b),f(T,t)}}}async function W({page:t,session:e}){let n=e.token,{id:s}=t.params,o=await C(`rooms/${s}`);if(!n)return{status:302,redirect:"/login"};let a=await C("user",n);return o.user!=a.username?{error:"You're not authorized to edit this room",status:"401"}:{props:{room:o,user:a}}}function X(t,e,n){let s;w(t,F,(t=>n(14,s=t)));let o,a,{room:r,user:$}=e,c=r.name,i=r.tags;return t.$$set=t=>{"room"in t&&n(0,r=t.room),"user"in t&&n(7,$=t.user)},[r,o,c,i,a,async function(){(await q(`rooms/${r.id}`,$.token)).yes&&H(`/rooms/${$.id}`)},async function(){let t={id:r.id,name:c,tags:i},e=await z("rooms",t,$.token);e.nameError&&n(1,o=!0),e.id&&(E(F,s=c,s),H(`/room/${r.id}`))},$,function(t){a=t,n(4,a)},()=>n(4,a=!1),function(t){i=t,n(3,i)},function(t){c=t,n(2,c)},function(t){o=t,n(1,o)},()=>n(4,a=!0)]}class Z extends t{constructor(t){super(),e(this,t,X,V,n,{room:0,user:7})}}export{Z as default,W as load};
