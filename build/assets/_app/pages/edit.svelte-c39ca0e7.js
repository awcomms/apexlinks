import{S as e,i as t,s as n,e as s,a5 as a,c as $,a as r,d as o,aa as c,b as i,a4 as l,ab as f,z as m,E as u,F as p,a1 as g,j as d,k as h,m as v,n as w,o as x,f as b,O as k,G as y,v as T,r as j,w as E,a2 as A,l as I,B as z,u as P,az as S,ak as _,am as C,an as G,aA as R,A as K,t as N,g as U,af as B,ac as F,p as L,U as V}from"../chunks/vendor-83a11e53.js";import{a as Y}from"../chunks/api-5c0c9630.js";import{g as D}from"../chunks/navigation-20968cc5.js";import{F as H}from"../chunks/Fields-5e165ace.js";import{I as M}from"../chunks/Input-a2a62266.js";import{I as O}from"../chunks/Image-7ac14d1b.js";import{T as q}from"../chunks/Tag-875b6479.js";import{c as J}from"../chunks/checkEmail-33bd547c.js";import{a as Q}from"../chunks/abslink-3768d0d8.js";import"../chunks/post-5b27026c.js";import"../chunks/singletons-bb9012b7.js";function W(e){let t,n;return{c(){t=s("script"),this.h()},l(e){const n=a('[data-svelte="svelte-1eu2i5p"]',document.head);t=$(n,"SCRIPT",{src:!0}),r(t).forEach(o),n.forEach(o),this.h()},h(){c(t.src,n="https://js.paystack.co/v1/inline.js")||i(t,"src","https://js.paystack.co/v1/inline.js")},m(e,n){l(document.head,t)},p:f,i:f,o:f,d(e){o(t)}}}function X(e,t,n){let{config:s={}}=t,a=!1;return m((()=>{n(1,a=!0)})),e.$$set=e=>{"config"in e&&n(0,s=e.config)},e.$$.update=()=>{3&e.$$.dirty&&a&&s.open&&PaystackPop.setup(s).openIframe()},[s,a]}class Z extends e{constructor(e){super(),t(this,e,X,W,n,{config:0})}}function ee(e){let t,n;return t=new C({props:{size:"small",$$slots:{default:[ne]},$$scope:{ctx:e}}}),t.$on("click",e[22]),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function te(e){let t,n,s,a;return t=new C({props:{size:"small",$$slots:{default:[se]},$$scope:{ctx:e}}}),t.$on("click",e[20]),s=new C({props:{size:"small",$$slots:{default:[ae]},$$scope:{ctx:e}}}),s.$on("click",e[21]),{c(){d(t.$$.fragment),n=h(),d(s.$$.fragment)},l(e){v(t.$$.fragment,e),n=w(e),v(s.$$.fragment,e)},m(e,$){x(t,e,$),b(e,n,$),x(s,e,$),a=!0},p(e,n){const a={};1024&n[1]&&(a.$$scope={dirty:n,ctx:e}),t.$set(a);const $={};1024&n[1]&&($.$$scope={dirty:n,ctx:e}),s.$set($)},i(e){a||(T(t.$$.fragment,e),T(s.$$.fragment,e),a=!0)},o(e){j(t.$$.fragment,e),j(s.$$.fragment,e),a=!1},d(e){E(t,e),e&&o(n),E(s,e)}}}function ne(e){let t;return{c(){t=N("Subscribe")},l(e){t=U(e,"Subscribe")},m(e,n){b(e,t,n)},d(e){e&&o(t)}}}function se(e){let t;return{c(){t=N("Renew subscription")},l(e){t=U(e,"Renew subscription")},m(e,n){b(e,t,n)},d(e){e&&o(t)}}}function ae(e){let t;return{c(){t=N("Change card")},l(e){t=U(e,"Change card")},m(e,n){b(e,t,n)},d(e){e&&o(t)}}}function $e(e){let t,n,s,a;const $=[te,ee],r=[];function c(e,t){return e[0].paid?0:1}return t=c(e),n=r[t]=$[t](e),{c(){n.c(),s=I()},l(e){n.l(e),s=I()},m(e,n){r[t].m(e,n),b(e,s,n),a=!0},p(e,a){let o=t;t=c(e),t===o?r[t].p(e,a):(z(),j(r[o],1,1,(()=>{r[o]=null})),P(),n=r[t],n?n.p(e,a):(n=r[t]=$[t](e),n.c()),T(n,1),n.m(s.parentNode,s))},i(e){a||(T(n),a=!0)},o(e){j(n),a=!1},d(e){r[t].d(e),e&&o(s)}}}function re(e){let t,n,s;function a(t){e[24](t)}let $={labelText:"Hide profile from public"};return void 0!==e[4]&&($.checked=e[4]),t=new S({props:$}),u.push((()=>p(t,"checked",a))),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){x(t,e,n),s=!0},p(e,s){const a={};!n&&16&s[0]&&(n=!0,a.checked=e[4],y((()=>n=!1))),t.$set(a)},i(e){s||(T(t.$$.fragment,e),s=!0)},o(e){j(t.$$.fragment,e),s=!1},d(e){E(t,e)}}}function oe(e){let t,n;return t=new A({props:{$$slots:{default:[re]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};16&n[0]|1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function ce(e){let t,n,s;function a(t){e[26](t)}let $={pin:!0};return void 0!==e[12]&&($.fields=e[12]),t=new H({props:$}),u.push((()=>p(t,"fields",a))),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){x(t,e,n),s=!0},p(e,s){const a={};!n&&4096&s[0]&&(n=!0,a.fields=e[12],y((()=>n=!1))),t.$set(a)},i(e){s||(T(t.$$.fragment,e),s=!0)},o(e){j(t.$$.fragment,e),s=!1},d(e){E(t,e)}}}function ie(e){let t,n;return t=new A({props:{$$slots:{default:[ce]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};4096&n[0]|1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function le(e){let t,n,s,a,$,r,c,i,l,f,m,g,k,A,I,z,P,_,C,K,N,U,B,F,L,V;function Y(t){e[27](t)}function D(t){e[28](t)}function H(t){e[29](t)}let O={labelText:"Username"};function q(t){e[30](t)}void 0!==e[15]&&(O.invalidText=e[15]),void 0!==e[14]&&(O.invalid=e[14]),void 0!==e[3]&&(O.value=e[3]),t=new M({props:O}),u.push((()=>p(t,"invalidText",Y))),u.push((()=>p(t,"invalid",D))),u.push((()=>p(t,"value",H)));let J={labelText:"Show email in profile"};function Q(t){e[31](t)}void 0!==e[2]&&(J.checked=e[2]),r=new S({props:J}),u.push((()=>p(r,"checked",q)));let W={labelText:"Email"};function X(t){e[32](t)}void 0!==e[8]&&(W.value=e[8]),l=new G({props:W}),u.push((()=>p(l,"value",Q)));let Z={labelText:"Name"};function ee(t){e[33](t)}void 0!==e[11]&&(Z.value=e[11]),g=new G({props:Z}),u.push((()=>p(g,"value",X)));let te={labelText:"Phone"};function ne(t){e[34](t)}void 0!==e[9]&&(te.value=e[9]),I=new G({props:te}),u.push((()=>p(I,"value",ee)));let se={labelText:"Address"};function ae(t){e[35](t)}void 0!==e[5]&&(se.value=e[5]),_=new G({props:se}),u.push((()=>p(_,"value",ne)));let $e={invalid:e[16],invalidText:we,labelText:"Link"};function re(t){e[36](t)}void 0!==e[6]&&($e.value=e[6]),N=new M({props:$e}),u.push((()=>p(N,"value",ae)));let oe={rows:11,placeholder:"About (Markdown)"};return void 0!==e[10]&&(oe.value=e[10]),F=new R({props:oe}),u.push((()=>p(F,"value",re))),{c(){d(t.$$.fragment),$=h(),d(r.$$.fragment),i=h(),d(l.$$.fragment),m=h(),d(g.$$.fragment),A=h(),d(I.$$.fragment),P=h(),d(_.$$.fragment),K=h(),d(N.$$.fragment),B=h(),d(F.$$.fragment)},l(e){v(t.$$.fragment,e),$=w(e),v(r.$$.fragment,e),i=w(e),v(l.$$.fragment,e),m=w(e),v(g.$$.fragment,e),A=w(e),v(I.$$.fragment,e),P=w(e),v(_.$$.fragment,e),K=w(e),v(N.$$.fragment,e),B=w(e),v(F.$$.fragment,e)},m(e,n){x(t,e,n),b(e,$,n),x(r,e,n),b(e,i,n),x(l,e,n),b(e,m,n),x(g,e,n),b(e,A,n),x(I,e,n),b(e,P,n),x(_,e,n),b(e,K,n),x(N,e,n),b(e,B,n),x(F,e,n),V=!0},p(e,$){const o={};!n&&32768&$[0]&&(n=!0,o.invalidText=e[15],y((()=>n=!1))),!s&&16384&$[0]&&(s=!0,o.invalid=e[14],y((()=>s=!1))),!a&&8&$[0]&&(a=!0,o.value=e[3],y((()=>a=!1))),t.$set(o);const i={};!c&&4&$[0]&&(c=!0,i.checked=e[2],y((()=>c=!1))),r.$set(i);const m={};!f&&256&$[0]&&(f=!0,m.value=e[8],y((()=>f=!1))),l.$set(m);const u={};!k&&2048&$[0]&&(k=!0,u.value=e[11],y((()=>k=!1))),g.$set(u);const p={};!z&&512&$[0]&&(z=!0,p.value=e[9],y((()=>z=!1))),I.$set(p);const d={};!C&&32&$[0]&&(C=!0,d.value=e[5],y((()=>C=!1))),_.$set(d);const h={};65536&$[0]&&(h.invalid=e[16]),!U&&64&$[0]&&(U=!0,h.value=e[6],y((()=>U=!1))),N.$set(h);const v={};!L&&1024&$[0]&&(L=!0,v.value=e[10],y((()=>L=!1))),F.$set(v)},i(e){V||(T(t.$$.fragment,e),T(r.$$.fragment,e),T(l.$$.fragment,e),T(g.$$.fragment,e),T(I.$$.fragment,e),T(_.$$.fragment,e),T(N.$$.fragment,e),T(F.$$.fragment,e),V=!0)},o(e){j(t.$$.fragment,e),j(r.$$.fragment,e),j(l.$$.fragment,e),j(g.$$.fragment,e),j(I.$$.fragment,e),j(_.$$.fragment,e),j(N.$$.fragment,e),j(F.$$.fragment,e),V=!1},d(e){E(t,e),e&&o($),E(r,e),e&&o(i),E(l,e),e&&o(m),E(g,e),e&&o(A),E(I,e),e&&o(P),E(_,e),e&&o(K),E(N,e),e&&o(B),E(F,e)}}}function fe(e){let t,n;return t=new _({props:{$$slots:{default:[le]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};118636&n[0]|1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function me(e){let t,n;return t=new A({props:{$$slots:{default:[fe]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};118636&n[0]|1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function ue(e){let t,n,a;return n=new V({}),{c(){t=s("div"),d(n.$$.fragment),this.h()},l(e){t=$(e,"DIV",{class:!0});var s=r(t);v(n.$$.fragment,s),s.forEach(o),this.h()},h(){i(t,"class","right svelte-pb9zr2")},m(e,s){b(e,t,s),x(n,t,null),a=!0},i(e){a||(T(n.$$.fragment,e),a=!0)},o(e){j(n.$$.fragment,e),a=!1},d(e){e&&o(t),E(n)}}}function pe(e){let t,n,a,c,i,f,m,u=e[17]&&ue(),p=[e[40]],g={};for(let s=0;s<p.length;s+=1)g=K(g,p[s]);return{c(){t=s("div"),n=s("p"),a=N("Edit"),c=h(),u&&u.c(),this.h()},l(e){t=$(e,"DIV",{});var s=r(t);n=$(s,"P",{});var i=r(n);a=U(i,"Edit"),i.forEach(o),c=w(s),u&&u.l(s),s.forEach(o),this.h()},h(){B(t,g),F(t,"svelte-pb9zr2",!0)},m(s,$){b(s,t,$),l(t,n),l(n,a),l(t,c),u&&u.m(t,null),i=!0,f||(m=k(t,"click",e[19]),f=!0)},p(e,n){e[17]?u?131072&n[0]&&T(u,1):(u=ue(),u.c(),T(u,1),u.m(t,null)):u&&(z(),j(u,1,1,(()=>{u=null})),P()),B(t,g=L(p,[512&n[1]&&e[40]])),F(t,"svelte-pb9zr2",!0)},i(e){i||(T(u),i=!0)},o(e){j(u),i=!1},d(e){e&&o(t),u&&u.d(),f=!1,m()}}}function ge(e){let t,n;return t=new C({props:{as:!0,$$slots:{default:[pe,({props:e})=>({40:e}),({props:e})=>[0,e?512:0]]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};131072&n[0]|1536&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function de(e){let t,n;return t=new A({props:{$$slots:{default:[ge]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,s){x(t,e,s),n=!0},p(e,n){const s={};131072&n[0]|1024&n[1]&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(T(t.$$.fragment,e),n=!0)},o(e){j(t.$$.fragment,e),n=!1},d(e){E(t,e)}}}function he(e){let t,n,a,r,c,i,l,f,m,A,I,z,P,S,_,C,G,R,K,N,U,B;function F(t){e[23](t)}t=new Z({props:{config:e[1]}});let L={$$slots:{default:[$e]},$$scope:{ctx:e}};function V(t){e[25](t)}void 0!==e[7]&&(L.image=e[7]),a=new O({props:L}),u.push((()=>p(a,"image",F))),i=new g({props:{noGutter:!0,$$slots:{default:[oe]},$$scope:{ctx:e}}});let Y={};return void 0!==e[13]&&(Y.tags=e[13]),f=new q({props:Y}),u.push((()=>p(f,"tags",V))),P=new g({props:{noGutter:!0,$$slots:{default:[ie]},$$scope:{ctx:e}}}),G=new g({props:{noGutter:!0,$$slots:{default:[me]},$$scope:{ctx:e}}}),K=new g({props:{noGutter:!0,$$slots:{default:[de]},$$scope:{ctx:e}}}),{c(){d(t.$$.fragment),n=h(),d(a.$$.fragment),c=h(),d(i.$$.fragment),l=h(),d(f.$$.fragment),A=h(),I=s("br"),z=h(),d(P.$$.fragment),S=h(),_=s("br"),C=h(),d(G.$$.fragment),R=h(),d(K.$$.fragment)},l(e){v(t.$$.fragment,e),n=w(e),v(a.$$.fragment,e),c=w(e),v(i.$$.fragment,e),l=w(e),v(f.$$.fragment,e),A=w(e),I=$(e,"BR",{}),z=w(e),v(P.$$.fragment,e),S=w(e),_=$(e,"BR",{}),C=w(e),v(G.$$.fragment,e),R=w(e),v(K.$$.fragment,e)},m(s,$){x(t,s,$),b(s,n,$),x(a,s,$),b(s,c,$),x(i,s,$),b(s,l,$),x(f,s,$),b(s,A,$),b(s,I,$),b(s,z,$),x(P,s,$),b(s,S,$),b(s,_,$),b(s,C,$),x(G,s,$),b(s,R,$),x(K,s,$),N=!0,U||(B=k(window,"keydown",e[18]),U=!0)},p(e,n){const s={};2&n[0]&&(s.config=e[1]),t.$set(s);const $={};3&n[0]|1024&n[1]&&($.$$scope={dirty:n,ctx:e}),!r&&128&n[0]&&(r=!0,$.image=e[7],y((()=>r=!1))),a.$set($);const o={};16&n[0]|1024&n[1]&&(o.$$scope={dirty:n,ctx:e}),i.$set(o);const c={};!m&&8192&n[0]&&(m=!0,c.tags=e[13],y((()=>m=!1))),f.$set(c);const l={};4096&n[0]|1024&n[1]&&(l.$$scope={dirty:n,ctx:e}),P.$set(l);const u={};118636&n[0]|1024&n[1]&&(u.$$scope={dirty:n,ctx:e}),G.$set(u);const p={};131072&n[0]|1024&n[1]&&(p.$$scope={dirty:n,ctx:e}),K.$set(p)},i(e){N||(T(t.$$.fragment,e),T(a.$$.fragment,e),T(i.$$.fragment,e),T(f.$$.fragment,e),T(P.$$.fragment,e),T(G.$$.fragment,e),T(K.$$.fragment,e),N=!0)},o(e){j(t.$$.fragment,e),j(a.$$.fragment,e),j(i.$$.fragment,e),j(f.$$.fragment,e),j(P.$$.fragment,e),j(G.$$.fragment,e),j(K.$$.fragment,e),N=!1},d(e){E(t,e),e&&o(n),E(a,e),e&&o(c),E(i,e),e&&o(l),E(f,e),e&&o(A),e&&o(I),e&&o(z),E(P,e),e&&o(S),e&&o(_),e&&o(C),E(G,e),e&&o(R),E(K,e),U=!1,B()}}}async function ve({session:e}){let t=e.user;return t?{props:{user:t}}:{status:302,redirect:"/login"}}let we='Add a url scheme to the link, something like "http://, at the beginning';function xe(e,t,n){console.log(typeof{}.PAYSTACK_TEST);let{user:s={}}=t,a={key:{}.PAYSTACK_LIVE_KEY,email:s.email,metadata:{id:s.id},amount:190233,currency:"NGN",embed:!1,value:"Pay"},$=s.show_email,r=s.username,o=s.hidden,c=s.address,i=s.website,l=s.image,f=s.email,m=s.phone,u=s.about,p=s.data,g=s.name,d=s.fields||[];console.log("after user.fields",d);let h,v,w,x,b=s.tags||[];const k=async()=>{let e=d.map((e=>({label:e.label,value:e.value})));if(n(17,x=!0),i&&!Q.test(i))return console.log("website err"),n(16,w=!0),void(editLoading=!1);if(!f)return console.log("not email err"),void n(17,x=!1);if(!J(f))return console.log("check email err"),void n(17,x=!1);if(!r)return console.log("username err"),n(14,h=!0),n(15,v="Empty"),void n(17,x=!1);if(r!==s.username&&await Y.get(`check_username/${r}`).then((e=>!e.res)))return console.log("api check_username err"),n(14,h=!0),n(15,v="Username taken"),void n(17,x=!1);if(J(r))return console.log("check email username err"),n(14,h=!0),n(15,v="Unaccepted"),void n(17,x=!1);let t={show_email:$,username:r,hidden:o,website:i,address:c,email:f,phone:m,about:u,fields:e,image:l,data:p,tags:b,name:g},a=await Y.put("users",t).finally((e=>(console.log("edit res: ",e),n(17,x=!1),e)));a.id&&D(`/${a.username}`)};return e.$$set=e=>{"user"in e&&n(0,s=e.user)},[s,a,$,r,o,c,i,l,f,m,u,g,d,b,h,v,w,x,e=>{switch(e.keyCode){case 13:e.ctrlKey&&k()}},k,()=>{n(1,a.open=!0,a)},()=>{n(1,a.open=!0,a),n(1,a.amount=3e3,a),n(1,a.metadata.purpose="change_card",a)},()=>{n(1,a.open=!0,a)},function(e){l=e,n(7,l)},function(e){o=e,n(4,o)},function(e){b=e,n(13,b)},function(e){d=e,n(12,d)},function(e){v=e,n(15,v)},function(e){h=e,n(14,h)},function(e){r=e,n(3,r)},function(e){$=e,n(2,$)},function(e){f=e,n(8,f)},function(e){g=e,n(11,g)},function(e){m=e,n(9,m)},function(e){c=e,n(5,c)},function(e){i=e,n(6,i)},function(e){u=e,n(10,u)}]}export default class extends e{constructor(e){super(),t(this,e,xe,he,n,{user:0},null,[-1,-1])}}export{ve as load};
