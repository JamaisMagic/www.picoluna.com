(function(e){function t(t){for(var r,s,a=t[0],c=t[1],u=t[2],p=0,f=[];p<a.length;p++)s=a[p],o[s]&&f.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},i=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/sub/home/dist/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"106f":function(e,t,n){},"21bb":function(e,t,n){"use strict";var r=n("8776"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("d1e7"),n("bf40");var r=n("2b0e"),o=n("ce5b"),i=n.n(o),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-toolbar",{staticClass:"blue",attrs:{app:"",light:"",fixed:!0}},[n("v-toolbar-side-icon",{attrs:{light:""}}),n("v-toolbar-title",{staticClass:"white--text"},[e._v("www.picoluna.com")]),n("v-spacer"),n("v-toolbar-items")],1),n("v-content",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1)],1)},a=[],c=(n("5c0b"),n("2877")),u={},l=Object(c["a"])(u,s,a,!1,null,null,null),p=l.exports,f=n("8c4f"),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-home"},[e.permission&&"granted"!==e.permission?n("v-btn",{attrs:{color:"info"},nativeOn:{click:function(t){return e.requestPermission(t)}}},[e._v("Subscript notifications\n  ")]):e._e(),"granted"===e.permission?n("v-btn",{attrs:{color:"info"},nativeOn:{click:function(t){return e.unsubscribe(t)}}},[e._v("Unsubscribe notifications\n  ")]):e._e()],1)},d=[],v=(n("a481"),{name:"home",components:{},data(){return{permission:""}},mounted(){this.checkPermission()},methods:{checkPermission(){"Notification"in window&&(this.permission=window.Notification.permission)},async requestPermission(){if(!("Notification"in window&&"serviceWorker"in navigator))return;const e=await window.Notification.requestPermission();if(this.permission=e,console.log(`Permission: ${e}`),"granted"!==e)return;const t=await navigator.serviceWorker.ready;let n=await t.pushManager.getSubscription();if(!n||!n.endpoint){const e=await fetch("/api/v1/web_push/vapid/"),r=await e.json(),o=r.data.publicKey,i=this.urlBase64ToUint8Array(o);n=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:i})}const r=await fetch("/api/v1/web_push/subscription/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({subscription:n})}),o=await r.json();"success"!==o.status&&console.error("subscribe error.")},async unsubscribe(){if(!("serviceWorker"in navigator))return;const e=await navigator.serviceWorker.ready,t=await e.pushManager.getSubscription();if(!t)return;const n=await t.unsubscribe();if(!n)return void console.log("Failed");const r=await fetch("/api/v1/web_push/subscription/",{headers:{"Content-Type":"application/json"},method:"DELETE",body:JSON.stringify({subscription:t})}),o=await r.json();"success"!==o.status&&console.error("unsubscribe error.")},urlBase64ToUint8Array(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=window.atob(n);return Uint8Array.from([...r].map(e=>e.charCodeAt(0)))}}}),h=v,w=(n("21bb"),Object(c["a"])(h,b,d,!1,null,null,null)),g=w.exports;r["default"].use(f["a"]);var m=new f["a"]({mode:"history",base:"/",routes:[{path:"*",name:"home",component:g}]}),y=n("2f62");r["default"].use(y["a"]);var _=new y["a"].Store({state:{},mutations:{},actions:{}}),O=n("9483");Object(O["a"])("/service-worker.js",{ready(e){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(e){console.log("Content has been cached for offline use.")},updated(e){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["default"].config.productionTip=!1,r["default"].use(i.a),new r["default"]({router:m,store:_,render:e=>e(p)}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("106f"),o=n.n(r);o.a},8776:function(e,t,n){}});
//# sourceMappingURL=app.951b5b0f.js.map