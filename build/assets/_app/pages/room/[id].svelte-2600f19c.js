import{S as te,i as se,s as ae,a1 as R,j as y,m as E,o as A,x as w,u as v,v as P,k as G,a5 as ne,d as h,n as S,f as k,O as H,w as oe,a6 as re,I as le,K as ue,aI as fe,A as ie,Q as ce,a2 as U,r as me,e as T,t as L,c as B,a as C,g as N,b as q,ac as Q,a4 as b,h as F,P as _e,aA as pe,E as V,F as Y,G as z,a8 as ge}from"../../chunks/vendor-cce9f310.js";import{a as I}from"../../chunks/api-5c0c9630.js";import{g as K}from"../../chunks/navigation-51f4a605.js";import{c as J}from"../../chunks/stores-befe408a.js";import"../../chunks/post-5b27026c.js";import"../../chunks/singletons-12a22614.js";const{document:M,window:de}=ce;function W(n,t,s){const e=n.slice();return e[20]=t[s],e}function $e(n){let t,s,e=n[1].name+"",o,r,i,m,c,g,f,l,$,a;return{c(){t=T("span"),s=T("p"),o=L(e),r=G(),i=T("p"),m=L("Leave"),c=G(),g=T("br"),f=G(),l=T("div"),this.h()},l(u){t=B(u,"SPAN",{});var p=C(t);s=B(p,"P",{class:!0});var j=C(s);o=N(j,e),j.forEach(h),r=S(p),i=B(p,"P",{class:!0});var d=C(i);m=N(d,"Leave"),d.forEach(h),c=S(p),g=B(p,"BR",{}),p.forEach(h),f=S(u),l=B(u,"DIV",{class:!0}),C(l).forEach(h),this.h()},h(){q(s,"class","head svelte-18f507d"),Q(s,"head-link",n[1].user==n[2].username),q(i,"class","pointer svelte-18f507d"),q(l,"class","head-space svelte-18f507d")},m(u,p){k(u,t,p),b(t,s),b(s,o),b(t,r),b(t,i),b(i,m),b(t,c),b(t,g),k(u,f,p),k(u,l,p),$||(a=[H(s,"click",n[7]),H(i,"click",n[6])],$=!0)},p(u,p){p&2&&e!==(e=u[1].name+"")&&F(o,e),p&6&&Q(s,"head-link",u[1].user==u[2].username)},d(u){u&&h(t),u&&h(f),u&&h(l),$=!1,_e(a)}}}function he(n){let t,s;return t=new U({props:{$$slots:{default:[$e]},$$scope:{ctx:n}}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,o){A(t,e,o),s=!0},p(e,o){const r={};o&8388614&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){s||(w(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function we(n){let t,s=n[20].user+"",e,o,r,i=n[20].value+"",m,c,g;return{c(){t=T("p"),e=L(s),o=G(),r=T("p"),m=L(i),this.h()},l(f){t=B(f,"P",{class:!0});var l=C(t);e=N(l,s),l.forEach(h),o=S(f),r=B(f,"P",{class:!0});var $=C(r);m=N($,i),$.forEach(h),this.h()},h(){q(t,"class","small pointer svelte-18f507d"),q(r,"class","message svelte-18f507d")},m(f,l){k(f,t,l),b(t,e),k(f,o,l),k(f,r,l),b(r,m),c||(g=H(t,"click",function(){ge(n[8](n[20].user))&&n[8](n[20].user).apply(this,arguments)}),c=!0)},p(f,l){n=f,l&1&&s!==(s=n[20].user+"")&&F(e,s),l&1&&i!==(i=n[20].value+"")&&F(m,i)},d(f){f&&h(t),f&&h(o),f&&h(r),c=!1,g()}}}function ve(n){let t,s;return t=new U({props:{$$slots:{default:[we]},$$scope:{ctx:n}}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,o){A(t,e,o),s=!0},p(e,o){const r={};o&8388609&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){s||(w(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function X(n){let t,s;return t=new R({props:{noGutter:!0,$$slots:{default:[ve]},$$scope:{ctx:n}}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,o){A(t,e,o),s=!0},p(e,o){const r={};o&8388609&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){s||(w(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function ke(n){let t,s,e,o;function r(c){n[13](c)}function i(c){n[14](c)}let m={rows:1};return n[4]!==void 0&&(m.ref=n[4]),n[3]!==void 0&&(m.value=n[3]),t=new pe({props:m}),V.push(()=>Y(t,"ref",r)),V.push(()=>Y(t,"value",i)),{c(){y(t.$$.fragment)},l(c){E(t.$$.fragment,c)},m(c,g){A(t,c,g),o=!0},p(c,g){const f={};!s&&g&16&&(s=!0,f.ref=c[4],z(()=>s=!1)),!e&&g&8&&(e=!0,f.value=c[3],z(()=>e=!1)),t.$set(f)},i(c){o||(w(t.$$.fragment,c),o=!0)},o(c){v(t.$$.fragment,c),o=!1},d(c){P(t,c)}}}function be(n){let t,s;return t=new U({props:{$$slots:{default:[ke]},$$scope:{ctx:n}}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,o){A(t,e,o),s=!0},p(e,o){const r={};o&8388632&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){s||(w(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function je(n){let t,s,e,o,r,i,m,c,g;M.title=t=n[1].name,e=new R({props:{noGutter:!0,$$slots:{default:[he]},$$scope:{ctx:n}}});let f=n[0],l=[];for(let a=0;a<f.length;a+=1)l[a]=X(W(n,f,a));const $=a=>v(l[a],1,1,()=>{l[a]=null});return i=new R({props:{noGutter:!0,$$slots:{default:[be]},$$scope:{ctx:n}}}),{c(){s=G(),y(e.$$.fragment),o=G();for(let a=0;a<l.length;a+=1)l[a].c();r=G(),y(i.$$.fragment)},l(a){ne('[data-svelte="svelte-skv7af"]',M.head).forEach(h),s=S(a),E(e.$$.fragment,a),o=S(a);for(let p=0;p<l.length;p+=1)l[p].l(a);r=S(a),E(i.$$.fragment,a)},m(a,u){k(a,s,u),A(e,a,u),k(a,o,u);for(let p=0;p<l.length;p+=1)l[p].m(a,u);k(a,r,u),A(i,a,u),m=!0,c||(g=H(de,"keydown",n[5]),c=!0)},p(a,[u]){(!m||u&2)&&t!==(t=a[1].name)&&(M.title=t);const p={};if(u&8388614&&(p.$$scope={dirty:u,ctx:a}),e.$set(p),u&257){f=a[0];let d;for(d=0;d<f.length;d+=1){const D=W(a,f,d);l[d]?(l[d].p(D,u),w(l[d],1)):(l[d]=X(D),l[d].c(),w(l[d],1),l[d].m(r.parentNode,r))}for(me(),d=f.length;d<l.length;d+=1)$(d);oe()}const j={};u&8388632&&(j.$$scope={dirty:u,ctx:a}),i.$set(j)},i(a){if(!m){w(e.$$.fragment,a);for(let u=0;u<f.length;u+=1)w(l[u]);w(i.$$.fragment,a),m=!0}},o(a){v(e.$$.fragment,a),l=l.filter(Boolean);for(let u=0;u<l.length;u+=1)v(l[u]);v(i.$$.fragment,a),m=!1},d(a){a&&h(s),P(e,a),a&&h(o),re(l,a),a&&h(r),P(i,a),c=!1,g()}}}async function Be({page:n,session:t}){let s=t.user;const{id:e}=n.params;if(!s)return{status:302,redirect:"login"};const o=await I.get(`rooms/${e}`);let r,i,m=await I.get(`messages?id=${e}`);return r=m.items,n=m.page,i=m.total,Array.isArray(r)||(r=[]),{props:{room:o,items:r,page:n,total:i,user:s,id:e}}}function ye(n,t,s){let e;le(n,J,_=>s(15,e=_));let{room:o,items:r,page:i,total:m,user:c,id:g}=t;ue(J,e=o.name,e);const f=fe();let l,$,a;ie(()=>{window.scrollTo({left:0,top:document.body.scrollHeight}),s(12,l=!0),a.focus()}),f.on("connect",()=>{f.emit("join",g)}),f.on("msg",async _=>{await I.put(`seen?id=${g}`,{}),s(0,r=[...r,_]),O()});const u=_=>{switch(_.keyCode){case 13:Z()}},p=async()=>{res=await I.get(`messages?id=${g}&page=${i+1}`),s(0,r=res.items),s(9,m=res.total),s(10,i++,i)},j=async()=>{f.emit("leave",o.id),await I.put("leave",{id:o.id}),K("/")},d=()=>{o.user==c.username&&K(`/edit/${o.id}`)},D=_=>{K(_)},Z=async()=>{if(!$)return;s(3,$=$.trim());let _={user:c.username,id:g,value:$};s(0,r=[...r,_]),f.emit("msg",_),await I.post("messages",{id:g,value:$}),O(),s(3,$="")},O=()=>{setTimeout(()=>{window.scrollTo({left:0,top:document.body.scrollHeight})},0)};function x(_){a=_,s(4,a)}function ee(_){$=_,s(3,$)}return n.$$set=_=>{"room"in _&&s(1,o=_.room),"items"in _&&s(0,r=_.items),"page"in _&&s(10,i=_.page),"total"in _&&s(9,m=_.total),"user"in _&&s(2,c=_.user),"id"in _&&s(11,g=_.id)},n.$$.update=()=>{n.$$.dirty&4608&&l&&m>100&&window.scrollY==0&&p()},[r,o,c,$,a,u,j,d,D,m,i,g,l,x,ee]}class Ce extends te{constructor(t){super();se(this,t,ye,je,ae,{room:1,items:0,page:10,total:9,user:2,id:11})}}export{Ce as default,Be as load};