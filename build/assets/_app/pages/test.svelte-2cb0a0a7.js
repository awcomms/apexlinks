import{S as s,i as e,s as a,E as t,F as n,e as c,k as i,j as o,c as r,n as h,m as u,b as d,f as p,o as f,O as l,G as m,v as $,r as k,d as v,w as g}from"../chunks/vendor-221a53e8.js";import{I as x}from"../chunks/Input-cd25684c.js";function j(s){let e,a,j,y,I,T,b;function w(e){s[2](e)}let E={invalidText:"yoooo",helperText:"help"};return void 0!==s[0]&&(E.invalid=s[0]),j=new x({props:E}),t.push((()=>n(j,"invalid",w))),{c(){e=c("input"),a=i(),o(j.$$.fragment),this.h()},l(s){e=r(s,"INPUT",{type:!0}),a=h(s),u(j.$$.fragment,s),this.h()},h(){d(e,"type","checkbox")},m(t,n){p(t,e,n),e.checked=s[0],p(t,a,n),f(j,t,n),I=!0,T||(b=l(e,"change",s[1]),T=!0)},p(s,[a]){1&a&&(e.checked=s[0]);const t={};!y&&1&a&&(y=!0,t.invalid=s[0],m((()=>y=!1))),j.$set(t)},i(s){I||($(j.$$.fragment,s),I=!0)},o(s){k(j.$$.fragment,s),I=!1},d(s){s&&v(e),s&&v(a),g(j,s),T=!1,b()}}}function y(s,e,a){let t;return[t,function(){t=this.checked,a(0,t)},function(s){t=s,a(0,t)}]}export default class extends s{constructor(s){super(),e(this,s,y,j,a,{})}}