(function(e){function n(n){for(var r,a,s=n[0],c=n[1],u=n[2],l=0,p=[];l<s.length;l++)a=s[l],o[a]&&p.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(n);while(p.length)p.shift()();return i.push.apply(i,u||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,s=1;s<t.length;s++){var c=t[s];0!==o[c]&&(r=!1)}r&&(i.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},o={app:0},i=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/sub/home/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var u=0;u<s.length;u++)n(s[u]);var f=c;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"106f":function(e,n,t){},"21bb":function(e,n,t){"use strict";var r=t("8776"),o=t.n(r);o.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("097d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],a=(t("5c0b"),t("2877")),s={},c=Object(a["a"])(s,o,i,!1,null,null,null),u=c.exports,f=t("8c4f"),l=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"page-home"},[t("div",{staticClass:"welcome-box"},[e._v("\n    Welcome.\n  ")])])}],d={name:"home",components:{},mounted:function(){}},b=d,h=(t("21bb"),Object(a["a"])(b,l,p,!1,null,null,null)),v=h.exports;r["a"].use(f["a"]);var g=new f["a"]({mode:"history",base:"/",routes:[{path:"*",name:"home",component:v}]}),m=t("2f62");r["a"].use(m["a"]);var w=new m["a"].Store({state:{},mutations:{},actions:{}}),y=(t("96cf"),t("3040")),x=t("8afe"),j=(t("34ef"),t("a481"),t("14b9"),t("9483"));function O(e){var n="=".repeat((4-e.length%4)%4),t=(e+n).replace(/\-/g,"+").replace(/_/g,"/"),r=window.atob(t);return Uint8Array.from(Object(x["a"])(r).map(function(e){return e.charCodeAt(0)}))}Object(j["a"])("/service-worker.js",{ready:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB");case 1:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),registered:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(n){var t,r,o,i,a,s,c,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("Service-worker registered"),"denied"!==Notification.permission){e.next=3;break}return e.abrupt("return");case 3:if("granted"===Notification.permission){e.next=9;break}return e.next=6,Notification.requestPermission();case 6:if(t=e.sent,"granted"===t){e.next=9;break}return e.abrupt("return");case 9:if(r=n.pushManager.getSubscription(),r&&r.endpoint){e.next=22;break}return e.next=13,fetch("/api/v1/push/vapid/");case 13:return o=e.sent,e.next=16,o.json();case 16:return i=e.sent,a=i.data.publicKey,s=O(a),e.next=21,n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s});case 21:r=e.sent;case 22:return e.next=24,fetch("/api/v1/push/subscription/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({subscription:r})});case 24:return c=e.sent,e.next=27,c.json();case 27:u=e.sent,"success"!==u.status&&console.error("subscript error.");case 29:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),cached:function(e){console.log("Content has been cached for offline use.")},updated:function(e){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({router:g,store:w,render:function(e){return e(u)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("106f"),o=t.n(r);o.a},8776:function(e,n,t){}});
//# sourceMappingURL=app-legacy.5bf25ffa.js.map