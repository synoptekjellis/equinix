"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/Equinix-DataViz/README.md","3143cd8af0e84f697a9e44bbe3245d50"],["/Equinix-DataViz/agents.js","a8289033da56d8e14e065bb9ac144faa"],["/Equinix-DataViz/config.js","060acb17314c0527621c9c28baf96f7f"],["/Equinix-DataViz/datacenter-locations.js","6b1aff5eb570d92741215b94a334d43f"],["/Equinix-DataViz/index.html","6c97c915686bab48b7e71cfb40227e56"],["/Equinix-DataViz/static/css/bundle.56dde80d.css","571792c20e95263fc55b0de9ee4b8303"],["/Equinix-DataViz/static/js/bundle.504233d8.js","9483bf54bfba96e555e8df71d5db7983"],["/Equinix-DataViz/static/media/AWS-Logo.befca32e.png","befca32e19c154ba28cde8a8399dbc3a"],["/Equinix-DataViz/static/media/Azure-Logo.86f277c5.png","86f277c54ffa7bf20247e3b91e56223b"],["/Equinix-DataViz/static/media/Equinix-Logo.ef961610.png","ef961610d90c00a47c87acc393b2779b"],["/Equinix-DataViz/static/media/Google-Logo.d584f2c6.png","d584f2c633ca60fc1172acc1b514cab6"],["/Equinix-DataViz/static/media/flags.9c74e172.png","9c74e172f87984c48ddf5c8108cabe67"],["/Equinix-DataViz/static/media/icons.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/Equinix-DataViz/static/media/icons.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/Equinix-DataViz/static/media/icons.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/Equinix-DataViz/static/media/icons.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/Equinix-DataViz/static/media/icons.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var i=new URL(e);return n&&i.pathname.match(n)||(i.search+=(i.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),i.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),i=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),i]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/Equinix-DataViz/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});