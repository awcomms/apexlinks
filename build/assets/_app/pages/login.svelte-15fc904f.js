import{S as t,i as e,s as n,A as s,aF as r,j as a,m as o,o as $,p as i,q as l,v as c,r as f,w as u,H as m,J as d,ab as p,e as g,c as h,a as v,d as w,b as x,f as y,I as k,a1 as E,k as I,n as b,a5 as j,O as q,K as T,a2 as D,t as L,g as V,a4 as J,aG as P,G as S,E as U,F as A,al as C,B as G,u as N,am as F,af as H,ac as K,h as z,U as B}from"../chunks/vendor-83a11e53.js";import{p as O}from"../chunks/post-5b27026c.js";import{I as M}from"../chunks/Input-a2a62266.js";import{g as Q}from"../chunks/navigation-20968cc5.js";import{s as R}from"../chunks/stores-ac1b97d9.js";import{n as W}from"../chunks/stores-744e0037.js";import{c as X}from"../chunks/checkEmail-33bd547c.js";import"../chunks/singletons-bb9012b7.js";function Y(t){let e,n;const m=[{lowContrast:!0},t[0]];let d={};for(let r=0;r<m.length;r+=1)d=s(d,m[r]);return e=new r({props:d}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p(t,[n]){const s=1&n?i(m,[m[0],l(t[0])]):{};e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function Z(t,e,n){const r=[];let a=m(e,r);return t.$$set=t=>{e=s(s({},e),d(t)),n(0,a=m(e,r))},[a]}class _ extends t{constructor(t){super(),e(this,t,Z,Y,n,{})}}function tt(t){let e,n;const r=[{caption:(new Date).toLocaleString()},t[0]];let m={};for(let a=0;a<r.length;a+=1)m=s(m,r[a]);return e=new _({props:m}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p(t,[n]){const s=1&n?i(r,[0&n&&{caption:(new Date).toLocaleString()},1&n&&l(t[0])]):{};e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function et(t,e,n){const r=[];let a=m(e,r);return t.$$set=t=>{e=s(s({},e),d(t)),n(0,a=m(e,r))},[a]}class nt extends t{constructor(t){super(),e(this,t,et,tt,n,{})}}function st(t){let e,n;return e=new nt({props:{kind:"success",title:"Password reset successful"}}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p:p,i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}class rt extends t{constructor(t){super(),e(this,t,null,st,n,{})}}function at(t){let e,n;return e=new nt({props:{title:"Invalid password reset link"}}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p:p,i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}class ot extends t{constructor(t){super(),e(this,t,null,at,n,{})}}function $t(t){let e,n;return e=new rt({}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function it(t){let e,n;return e=new ot({}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function lt(t){let e,n,s,r;const a=[it,$t],o=[];var $;return~(n="invalid"==($=t)[0]?0:"resetSuccess"==$[0]?1:-1)&&(s=o[n]=a[n](t)),{c(){e=g("div"),s&&s.c(),this.h()},l(t){e=h(t,"DIV",{class:!0});var n=v(e);s&&s.l(n),n.forEach(w),this.h()},h(){x(e,"class","fixed svelte-im6ayo")},m(t,s){y(t,e,s),~n&&o[n].m(e,null),r=!0},p:p,i(t){r||(c(s),r=!0)},o(t){f(s),r=!1},d(t){t&&w(e),~n&&o[n].d()}}}function ct(t,e,n){let s;return k(t,W,(t=>n(1,s=t))),[s]}class ft extends t{constructor(t){super(),e(this,t,ct,lt,n,{})}}function ut(t){let e,n;return{c(){e=g("h1"),n=L("Apexlinks"),this.h()},l(t){e=h(t,"H1",{id:!0,class:!0});var s=v(e);n=V(s,"Apexlinks"),s.forEach(w),this.h()},h(){x(e,"id","head"),x(e,"class","svelte-1qu8hie")},m(t,s){y(t,e,s),J(e,n)},d(t){t&&w(e)}}}function mt(t){let e,n,s,r,i;function l(e){t[21](e)}function m(e){t[22](e)}function d(e){t[23](e)}let p={invalidText:t[12],labelText:"Email",focus:!0};return void 0!==t[11]&&(p.invalid=t[11]),void 0!==t[7]&&(p.ref=t[7]),void 0!==t[13]&&(p.value=t[13]),e=new M({props:p}),U.push((()=>A(e,"invalid",l))),U.push((()=>A(e,"ref",m))),U.push((()=>A(e,"value",d))),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,n){$(e,t,n),i=!0},p(t,a){const o={};4096&a[0]&&(o.invalidText=t[12]),!n&&2048&a[0]&&(n=!0,o.invalid=t[11],S((()=>n=!1))),!s&&128&a[0]&&(s=!0,o.ref=t[7],S((()=>s=!1))),!r&&8192&a[0]&&(r=!0,o.value=t[13],S((()=>r=!1))),e.$set(o)},i(t){i||(c(e.$$.fragment,t),i=!0)},o(t){f(e.$$.fragment,t),i=!1},d(t){u(e,t)}}}function dt(t){let e,n;return e=new F({props:{as:!0,$$slots:{default:[gt,({props:t})=>({38:t}),({props:t})=>[0,t?128:0]]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p(t,n){const s={};16384&n[0]|384&n[1]&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function pt(t){let e,n,s;return n=new B({}),{c(){e=g("div"),a(n.$$.fragment),this.h()},l(t){e=h(t,"DIV",{class:!0});var s=v(e);o(n.$$.fragment,s),s.forEach(w),this.h()},h(){x(e,"class","right svelte-1qu8hie")},m(t,r){y(t,e,r),$(n,e,null),s=!0},i(t){s||(c(n.$$.fragment,t),s=!0)},o(t){f(n.$$.fragment,t),s=!1},d(t){t&&w(e),u(n)}}}function gt(t){let e,n,r,a,o,$,l,u=t[14]&&pt(),m=[t[38]],d={};for(let i=0;i<m.length;i+=1)d=s(d,m[i]);return{c(){e=g("div"),n=g("p"),r=L("Login"),a=I(),u&&u.c(),this.h()},l(t){e=h(t,"DIV",{});var s=v(e);n=h(s,"P",{});var o=v(n);r=V(o,"Login"),o.forEach(w),a=b(s),u&&u.l(s),s.forEach(w),this.h()},h(){H(e,d),K(e,"svelte-1qu8hie",!0)},m(s,i){y(s,e,i),J(e,n),J(n,r),J(e,a),u&&u.m(e,null),o=!0,$||(l=q(e,"click",t[18]),$=!0)},p(t,n){t[14]?u?16384&n[0]&&c(u,1):(u=pt(),u.c(),c(u,1),u.m(e,null)):u&&(G(),f(u,1,1,(()=>{u=null})),N()),H(e,d=i(m,[128&n[1]&&t[38]])),K(e,"svelte-1qu8hie",!0)},i(t){o||(c(u),o=!0)},o(t){f(u),o=!1},d(t){t&&w(e),u&&u.d(),$=!1,l()}}}function ht(t){let e,n;return e=new F({props:{as:!0,$$slots:{default:[wt,({props:t})=>({38:t}),({props:t})=>[0,t?128:0]]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p(t,n){const s={};32768&n[0]|384&n[1]&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function vt(t){let e,n,s;return n=new B({}),{c(){e=g("div"),a(n.$$.fragment),this.h()},l(t){e=h(t,"DIV",{class:!0});var s=v(e);o(n.$$.fragment,s),s.forEach(w),this.h()},h(){x(e,"class","right svelte-1qu8hie")},m(t,r){y(t,e,r),$(n,e,null),s=!0},i(t){s||(c(n.$$.fragment,t),s=!0)},o(t){f(n.$$.fragment,t),s=!1},d(t){t&&w(e),u(n)}}}function wt(t){let e,n,r,a,o,$,l,u=t[15]&&vt(),m=[t[38]],d={};for(let i=0;i<m.length;i+=1)d=s(d,m[i]);return{c(){e=g("div"),n=g("p"),r=L("Join"),a=I(),u&&u.c(),this.h()},l(t){e=h(t,"DIV",{});var s=v(e);n=h(s,"P",{});var o=v(n);r=V(o,"Join"),o.forEach(w),a=b(s),u&&u.l(s),s.forEach(w),this.h()},h(){H(e,d),K(e,"svelte-1qu8hie",!0)},m(s,i){y(s,e,i),J(e,n),J(n,r),J(e,a),u&&u.m(e,null),o=!0,$||(l=q(e,"click",t[19]),$=!0)},p(t,n){t[15]?u?32768&n[0]&&c(u,1):(u=vt(),u.c(),c(u,1),u.m(e,null)):u&&(G(),f(u,1,1,(()=>{u=null})),N()),H(e,d=i(m,[128&n[1]&&t[38]])),K(e,"svelte-1qu8hie",!0)},i(t){o||(c(u),o=!0)},o(t){f(u),o=!1},d(t){t&&w(e),u&&u.d(),$=!1,l()}}}function xt(t){let e;return{c(){e=L(t[1])},l(n){e=V(n,t[1])},m(t,n){y(t,e,n)},p(t,n){2&n[0]&&z(e,t[1])},d(t){t&&w(e)}}}function yt(t){let e,n,s,r,i=!t[0]&&dt(t),l=t[0]&&ht(t);return s=new F({props:{kind:"ghost",size:"small",$$slots:{default:[xt]},$$scope:{ctx:t}}}),s.$on("click",t[17]),{c(){i&&i.c(),e=I(),l&&l.c(),n=I(),a(s.$$.fragment)},l(t){i&&i.l(t),e=b(t),l&&l.l(t),n=b(t),o(s.$$.fragment,t)},m(t,a){i&&i.m(t,a),y(t,e,a),l&&l.m(t,a),y(t,n,a),$(s,t,a),r=!0},p(t,r){t[0]?i&&(G(),f(i,1,1,(()=>{i=null})),N()):i?(i.p(t,r),1&r[0]&&c(i,1)):(i=dt(t),i.c(),c(i,1),i.m(e.parentNode,e)),t[0]?l?(l.p(t,r),1&r[0]&&c(l,1)):(l=ht(t),l.c(),c(l,1),l.m(n.parentNode,n)):l&&(G(),f(l,1,1,(()=>{l=null})),N());const a={};2&r[0]|256&r[1]&&(a.$$scope={dirty:r,ctx:t}),s.$set(a)},i(t){r||(c(i),c(l),c(s.$$.fragment,t),r=!0)},o(t){f(i),f(l),f(s.$$.fragment,t),r=!1},d(t){i&&i.d(t),t&&w(e),l&&l.d(t),t&&w(n),u(s,t)}}}function kt(t){let e,n,s,r,i,l,m,d,p,g,h,v,x,k=t[0]&&mt(t);function E(e){t[24](e)}function j(e){t[25](e)}function q(e){t[26](e)}let T={invalidText:t[4],labelText:"Username"};function D(e){t[27](e)}function L(e){t[28](e)}function V(e){t[29](e)}void 0!==t[2]&&(T.invalid=t[2]),void 0!==t[3]&&(T.value=t[3]),void 0!==t[5]&&(T.ref=t[5]),n=new M({props:T}),U.push((()=>A(n,"invalid",E))),U.push((()=>A(n,"value",j))),U.push((()=>A(n,"ref",q)));let J={invalidText:t[10],labelText:"Password",password:!0};return void 0!==t[8]&&(J.invalid=t[8]),void 0!==t[9]&&(J.value=t[9]),void 0!==t[6]&&(J.ref=t[6]),m=new M({props:J}),U.push((()=>A(m,"invalid",D))),U.push((()=>A(m,"value",L))),U.push((()=>A(m,"ref",V))),v=new C({props:{stacked:!0,$$slots:{default:[yt]},$$scope:{ctx:t}}}),{c(){k&&k.c(),e=I(),a(n.$$.fragment),l=I(),a(m.$$.fragment),h=I(),a(v.$$.fragment)},l(t){k&&k.l(t),e=b(t),o(n.$$.fragment,t),l=b(t),o(m.$$.fragment,t),h=b(t),o(v.$$.fragment,t)},m(t,s){k&&k.m(t,s),y(t,e,s),$(n,t,s),y(t,l,s),$(m,t,s),y(t,h,s),$(v,t,s),x=!0},p(t,a){t[0]?k?(k.p(t,a),1&a[0]&&c(k,1)):(k=mt(t),k.c(),c(k,1),k.m(e.parentNode,e)):k&&(G(),f(k,1,1,(()=>{k=null})),N());const o={};16&a[0]&&(o.invalidText=t[4]),!s&&4&a[0]&&(s=!0,o.invalid=t[2],S((()=>s=!1))),!r&&8&a[0]&&(r=!0,o.value=t[3],S((()=>r=!1))),!i&&32&a[0]&&(i=!0,o.ref=t[5],S((()=>i=!1))),n.$set(o);const $={};1024&a[0]&&($.invalidText=t[10]),!d&&256&a[0]&&(d=!0,$.invalid=t[8],S((()=>d=!1))),!p&&512&a[0]&&(p=!0,$.value=t[9],S((()=>p=!1))),!g&&64&a[0]&&(g=!0,$.ref=t[6],S((()=>g=!1))),m.$set($);const l={};49155&a[0]|256&a[1]&&(l.$$scope={dirty:a,ctx:t}),v.$set(l)},i(t){x||(c(k),c(n.$$.fragment,t),c(m.$$.fragment,t),c(v.$$.fragment,t),x=!0)},o(t){f(k),f(n.$$.fragment,t),f(m.$$.fragment,t),f(v.$$.fragment,t),x=!1},d(t){k&&k.d(t),t&&w(e),u(n,t),t&&w(l),u(m,t),t&&w(h),u(v,t)}}}function Et(t){let e,n;return e=new P({props:{$$slots:{default:[kt]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){o(e.$$.fragment,t)},m(t,s){$(e,t,s),n=!0},p(t,n){const s={};65535&n[0]|256&n[1]&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function It(t){let e,n,s,r,i,l;return e=new D({props:{sm:8,md:8,lg:8,xlg:8,$$slots:{default:[ut]},$$scope:{ctx:t}}}),s=new D({props:{sm:8,md:8,lg:8,xlg:8,$$slots:{default:[Et]},$$scope:{ctx:t}}}),i=new D({}),{c(){a(e.$$.fragment),n=I(),a(s.$$.fragment),r=I(),a(i.$$.fragment)},l(t){o(e.$$.fragment,t),n=b(t),o(s.$$.fragment,t),r=b(t),o(i.$$.fragment,t)},m(t,a){$(e,t,a),y(t,n,a),$(s,t,a),y(t,r,a),$(i,t,a),l=!0},p(t,n){const r={};256&n[1]&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const a={};65535&n[0]|256&n[1]&&(a.$$scope={dirty:n,ctx:t}),s.$set(a)},i(t){l||(c(e.$$.fragment,t),c(s.$$.fragment,t),c(i.$$.fragment,t),l=!0)},o(t){f(e.$$.fragment,t),f(s.$$.fragment,t),f(i.$$.fragment,t),l=!1},d(t){u(e,t),t&&w(n),u(s,t),t&&w(r),u(i,t)}}}function bt(t){let e,n,s,r,i,l,m;return e=new ft({}),r=new E({props:{noGutter:!0,$$slots:{default:[It]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment),n=I(),s=I(),a(r.$$.fragment),this.h()},l(t){o(e.$$.fragment,t),n=b(t);j('[data-svelte="svelte-c77y3o"]',document.head).forEach(w),s=b(t),o(r.$$.fragment,t),this.h()},h(){document.title="Login"},m(a,o){$(e,a,o),y(a,n,o),y(a,s,o),$(r,a,o),i=!0,l||(m=q(window,"keydown",t[16]),l=!0)},p(t,e){const n={};65535&e[0]|256&e[1]&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){i||(c(e.$$.fragment,t),c(r.$$.fragment,t),i=!0)},o(t){f(e.$$.fragment,t),f(r.$$.fragment,t),i=!1},d(t){u(e,t),t&&w(n),t&&w(s),u(r,t),l=!1,m()}}}async function jt({page:t,session:e}){let n=t.query.n;return e.user?{status:302,redirect:"/"}:{props:{n:n}}}function qt(t,e,n){let s,r;k(t,R,(t=>n(32,s=t))),k(t,W,(t=>n(33,r=t)));let a,o,{n:$=""}=e;$&&process.browser&&(T(W,r=$,r),Q("/login"));let i,l,c,f,u,m,d,p,g=!1,h=null,v=!1,w=null,x=!1,y="Invalid Email";const E=async function(){if(n(14,d=!0),!h)return n(2,g=!0),n(4,i="Empty"),void n(14,d=!1);if(!w)return n(8,v=!0),n(10,u="Empty"),void n(14,d=!1);n(2,g=!1),n(8,v=!1);let t=await O("auth/login",{username:h,password:w}).finally((t=>(n(14,d=!1),t)));console.log("login response: ",t),n(4,i=t.usernameError),n(10,u=t.passwordError),n(2,g=t.usernameInvalid),n(8,v=t.passwordInvalid),t.user&&(T(R,s.user=t.user,s),Q("/"))},I=async function(){if(n(15,p=!0),a&&!m)return n(11,x=!0),n(12,y="Empty"),void n(15,p=!1);if(!X(m))return n(11,x=!0),n(12,y="Unaccepted"),void n(15,p=!1);if(!h)return n(2,g=!0),n(4,i="Empty"),void(joinloading=!1);if(X(h))return n(2,g=!0),n(4,i="Unaccepted"),void n(15,p=!1);if(!w)return n(8,v=!0),n(10,u="Empty"),void(joinloading=!1);n(2,g=!1),n(8,v=!1),n(11,x=!1);const t=await O("auth/join",{email:m,username:h,password:w}).finally((t=>(n(15,p=!1),t)));n(2,g=t.usernameInvalid),n(4,i=t.usernameError),n(8,v=t.passwordInvalid),n(10,u=t.passwordError),t.ok&&(t.token?Q("/"):Q("/login"))};return t.$$set=t=>{"n"in t&&n(20,$=t.n)},t.$$.update=()=>{1&t.$$.dirty[0]&&n(1,o=a?"Login instead":"Join instead")},[a,o,g,h,i,l,c,f,v,w,u,x,y,m,d,p,t=>{if(t.ctrlKey)switch(t.keyCode){case 13:I()}else switch(t.keyCode){case 13:E()}},()=>{n(0,a=!a)},E,I,$,function(t){x=t,n(11,x)},function(t){f=t,n(7,f)},function(t){m=t,n(13,m)},function(t){g=t,n(2,g)},function(t){h=t,n(3,h)},function(t){l=t,n(5,l)},function(t){v=t,n(8,v)},function(t){w=t,n(9,w)},function(t){c=t,n(6,c)}]}export default class extends t{constructor(t){super(),e(this,t,qt,bt,n,{n:20},null,[-1,-1])}}export{jt as load};
