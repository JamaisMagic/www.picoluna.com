(function(e){function t(t){for(var r,a,c=t[0],s=t[1],l=t[2],u=0,p=[];u<c.length;u++)a=c[u],n[a]&&p.push(n[a][0]),n[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),o()}function o(){for(var e,t=0;t<i.length;t++){for(var o=i[t],r=!0,a=1;a<o.length;a++){var s=o[a];0!==n[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=o[0]))}return e}var r={},n={app:0},i=[];function a(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"5d688836","chunk-ec8f":"b50e2f05"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(e){var t=[],o=n[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise(function(t,r){o=n[e]=[t,r]});t.push(o[2]=r);var i,s=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e),i=function(t){l.onerror=l.onload=null,clearTimeout(u);var o=n[e];if(0!==o){if(o){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");a.type=r,a.request=i,o[1](a)}n[e]=void 0}};var u=setTimeout(function(){i({type:"timeout",target:l})},12e4);l.onerror=l.onload=i,s.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(o,r,function(t){return e[t]}.bind(null,r));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/sub/features/live_video/dist/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var f=l;i.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},2856:function(e,t,o){},3:function(e,t){},5007:function(e,t,o){"use strict";var r=o("c391"),n=o.n(r);n.a},"56d7":function(e,t,o){"use strict";o.r(t);var r=o("2b0e"),n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},i=[],a=(o("5c0b"),o("2877")),c={},s=Object(a["a"])(c,n,i,!1,null,null,null);s.options.__file="App.vue";var l=s.exports,u=o("8c4f"),f=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("div",{staticClass:"video-wrapper"},[o("div",[e._v("Video")]),o("video",{staticClass:"video-js vjs-default-skin",attrs:{id:"my_video",controls:""}})])])}],d=o("d3ec"),v=o.n(d),h=o("f0e2");const m="http://8461.liveplay.myqcloud.com/live/8461_6aec5f775926fcf27a01c71d17500af9.m3u8",b="http://8461.liveplay.myqcloud.com/live/8461_6aec5f775926fcf27a01c71d17500af9.flv",g={techOrder:["flash","html5"],autoplay:!1,sources:[{type:"video/flv",src:b},{type:"application/x-mpegurl",src:m},{type:"application/vnd.apple.mpegurl",src:m}]};var y={name:"home",data(){return{video:null}},components:{},created(){},async mounted(){await this.initVideo()},methods:{async initVideo(){let e=v.a.desktop()&&!(v.a.mac()&&v.a.safari())&&!this.isProtocolEqualOrHttps(m);e&&await o.e("chunk-ec8f").then(o.bind(null,"b5c1")),console.log("useFlv",e),console.log("mOptions",g),this.video=Object(h["a"])(document.querySelector("#my_video"),g)},getUrlProtocol(e){let t=document.createElement("a");return t.href=e,t.protocol},isProtocolEqual(e){return(location.protocol||"https:")===this.getUrlProtocol(e)},isProtocolEqualOrHttps(e){return"https:"===this.getUrlProtocol(e)||this.isProtocolEqual(e)}}},_=y,w=(o("5007"),Object(a["a"])(_,f,p,!1,null,"160a17d8",null));w.options.__file="Home.vue";var j=w.exports;r["a"].use(u["a"]);var O=new u["a"]({mode:"history",base:"/sub/features/live_video/",routes:[{path:"/",name:"home",component:j},{path:"/about",name:"about",component:()=>o.e("about").then(o.bind(null,"f820"))}]}),P=o("2f62");r["a"].use(P["a"]);var k=new P["a"].Store({state:{},mutations:{},actions:{}}),E=o("9483");Object(E["a"])("/sub/features/live_video/dist/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({router:O,store:k,render:e=>e(l)}).$mount("#app")},"5c0b":function(e,t,o){"use strict";var r=o("2856"),n=o.n(r);n.a},c391:function(e,t,o){}});
//# sourceMappingURL=app.2a61bd78.js.map