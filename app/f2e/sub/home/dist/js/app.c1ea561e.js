(function(e){function n(n){for(var r,a,s=n[0],u=n[1],c=n[2],f=0,p=[];f<s.length;f++)a=s[f],o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(n);while(p.length)p.shift()();return i.push.apply(i,c||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,s=1;s<t.length;s++){var u=t[s];0!==o[u]&&(r=!1)}r&&(i.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},o={app:0},i=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/sub/home/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=n,s=s.slice();for(var c=0;c<s.length;c++)n(s[c]);var l=u;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"106f":function(e,n,t){},"21bb":function(e,n,t){"use strict";var r=t("8776"),o=t.n(r);o.a},"56d7":function(e,n,t){"use strict";t.r(n);var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],a=(t("5c0b"),t("2877")),s={},u=Object(a["a"])(s,o,i,!1,null,null,null),c=u.exports,l=t("8c4f"),f=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"page-home"},[t("div",{staticClass:"welcome-box"},[e._v("\n    Welcome.\n  ")])])}],d={name:"home",components:{},mounted(){}},b=d,v=(t("21bb"),Object(a["a"])(b,f,p,!1,null,null,null)),h=v.exports;r["a"].use(l["a"]);var m=new l["a"]({mode:"history",base:"/",routes:[{path:"*",name:"home",component:h}]}),g=t("2f62");r["a"].use(g["a"]);var w=new g["a"].Store({state:{},mutations:{},actions:{}}),y=t("9483");Object(y["a"])("/sub/home/dist/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({router:m,store:w,render:e=>e(c)}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("106f"),o=t.n(r);o.a},8776:function(e,n,t){}});
//# sourceMappingURL=app.c1ea561e.js.map