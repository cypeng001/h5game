(function(L,p){function q(a){if(a)return G(a)}function G(a){for(var c in q.prototype)a[c]=q.prototype[c];return a}function A(a,c){if(!c)return!1;for(var b in c){var d=c[b];switch(d.option){case "required":if("undefined"===typeof a[b])return!1;break;case "optional":"undefined"!==typeof a[b]&&c.__messages[d.type]&&A(a[b],c.__messages[d.type]);break;case "repeated":if(a[b]&&c.__messages[d.type])for(var e=0;e<a[b].length;e++)if(!A(a[b][e],c.__messages[d.type]))return!1}}return!0}function H(a,c,b,d){for(var e in d)if(b[e]){var f=
b[e];switch(f.option){case "required":case "optional":c=r(a,c,B(f.type,f.tag));c=C(d[e],f.type,c,a,b);break;case "repeated":if(0<d[e].length){var h=d[e],y=a,k=b,g;if(util.isSimpleType(f.type))for(c=r(y,c,B(f.type,f.tag)),c=r(y,c,l.codec.encodeUInt32(h.length)),g=0;g<h.length;g++)c=C(h[g],f.type,c,y);else for(g=0;g<h.length;g++)c=r(y,c,B(f.type,f.tag)),c=C(h[g],f.type,c,y,k)}}}return c}function C(a,c,b,d,e){var f=l.codec;switch(c){case "uInt32":b=r(d,b,f.encodeUInt32(a));break;case "int32":case "sInt32":b=
r(d,b,f.encodeSInt32(a));break;case "float":r(d,b,f.encodeFloat(a));b+=4;break;case "double":r(d,b,f.encodeDouble(a));b+=8;break;case "string":c=f.byteLength(a);b=r(d,b,f.encodeUInt32(c));f.encodeStr(d,b,a);b+=c;break;default:if(e.__messages[c]){var h=new ArrayBuffer(f.byteLength(JSON.stringify(a)));c=H(h,0,e.__messages[c],a);b=r(d,b,f.encodeUInt32(c));for(a=0;a<c;a++)d[b]=h[a],b++}}return b}function r(a,c,b){for(var d=0;d<b.length;d++,c++)a[c]=b[d];return c}function B(a,c){return l.codec.encodeUInt32(c<<
3|(l.constants.TYPES[a]||2))}function I(a,c,b){for(var d;h.offset<b;){d=l.codec.decodeUInt32(w())>>3;var e=c.__tags[d];switch(c[e].option){case "optional":case "required":a[e]=D(c[e].type,c);break;case "repeated":a[e]||(a[e]=[]);d=a[e];e=c[e].type;var f=c;if(M.isSimpleType(e)){f=l.codec.decodeUInt32(w());for(var g=0;g<f;g++)d.push(D(e))}else d.push(D(e,f))}}return a}function D(a,c){var b=l.codec;switch(a){case "uInt32":return b.decodeUInt32(w());case "int32":case "sInt32":return b.decodeSInt32(w());
case "float":var d=b.decodeFloat(h.buffer,h.offset);h.offset+=4;return d;case "double":return d=b.decodeDouble(h.buffer,h.offset),h.offset+=8,d;case "string":return d=b.decodeUInt32(w()),b=b.decodeStr(h.buffer,h.offset,d),h.offset+=d,b;default:if(c&&c.__messages[a])return d=b.decodeUInt32(w()),b={},I(b,c.__messages[a],h.offset+d),b}}function w(a){var c=[],b=h.offset;a=a||!1;do{var d=h.buffer[b];c.push(d);b++}while(128<=d);a||(h.offset=b);return c}q.prototype.on=function(a,c){this._callbacks=this._callbacks||
{};(this._callbacks[a]=this._callbacks[a]||[]).push(c);return this};q.prototype.once=function(a,c){function b(){d.off(a,b);c.apply(this,arguments)}var d=this;this._callbacks=this._callbacks||{};c._off=b;this.on(a,b);return this};q.prototype.off=q.prototype.removeListener=q.prototype.removeAllListeners=function(a,c){this._callbacks=this._callbacks||{};if(0==arguments.length)return this._callbacks={},this;var b=this._callbacks[a];if(!b)return this;if(1==arguments.length)return delete this._callbacks[a],
this;var d=index(b,c._off||c);~d&&b.splice(d,1);return this};q.prototype.emit=function(a){this._callbacks=this._callbacks||{};var c=[].slice.call(arguments,1),b=this._callbacks[a];if(b){b=b.slice(0);for(var d=0,e=b.length;d<e;++d)b[d].apply(this,c)}return this};q.prototype.listeners=function(a){this._callbacks=this._callbacks||{};return this._callbacks[a]||[]};q.prototype.hasListeners=function(a){return!!this.listeners(a).length};var t={Package:{TYPE_HANDSHAKE:1,TYPE_HANDSHAKE_ACK:2,TYPE_HEARTBEAT:3,
TYPE_DATA:4,TYPE_KICK:5},Message:{TYPE_REQUEST:0,TYPE_NOTIFY:1,TYPE_RESPONSE:2,TYPE_PUSH:3}},g=t.Package,m=t.Message;t.strencode=function(a){for(var c=new p(3*a.length),b=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);e=127>=e?[e]:2047>=e?[192|e>>6,128|e&63]:[224|e>>12,128|(e&4032)>>6,128|e&63];for(var f=0;f<e.length;f++)c[b]=e[f],++b}a=new p(b);u(a,0,c,0,b);return a};t.strdecode=function(a){a=new p(a);for(var c=[],b=0,d,e=a.length;b<e;)128>a[b]?(d=a[b],b+=1):224>a[b]?(d=((a[b]&63)<<6)+(a[b+1]&63),b+=
2):(d=((a[b]&15)<<12)+((a[b+1]&63)<<6)+(a[b+2]&63),b+=3),c.push(d);return String.fromCharCode.apply(null,c)};g.encode=function(a,c){var b=c?c.length:0,d=new p(4+b),e=0;d[e++]=a&255;d[e++]=b>>16&255;d[e++]=b>>8&255;d[e++]=b&255;c&&u(d,e,c,0,b);return d};g.decode=function(a){a=new p(a);var c=a[0],b=1,d=(b=(a[b++]<<16|a[b++]<<8|a[b++])>>>0)?new p(b):null;u(d,0,a,4,b);return{type:c,body:d}};m.encode=function(a,c,b,d,e){if(E(c)){var f=a;var h=0;do h+=1,f>>=7;while(0<f);f=h}else f=0;h=f;f=1+h;if(F(c))if(b){if("number"!==
typeof d)throw Error("error flag for number route!");f+=2}else if(f+=1,d){d=t.strencode(d);if(255<d.length)throw Error("route maxlength is overflow");f+=d.length}e&&(f+=e.length);f=new p(f);if(c!==m.TYPE_REQUEST&&c!==m.TYPE_NOTIFY&&c!==m.TYPE_RESPONSE&&c!==m.TYPE_PUSH)throw Error("unkonw message type: "+c);f[0]=c<<1|(b?1:0);var g=1;if(E(c)){var k=g+h-1;for(f[k--]=a&127;k>=g;)a>>=7,f[k--]=a&127|128;g+=h}if(F(c)){c=d;d=g;if(b){if(65535<c)throw Error("route number is overflow");f[d++]=c>>8&255;f[d++]=
c&255}else c?(f[d++]=c.length&255,u(f,d,c,0,c.length),d+=c.length):f[d++]=0;g=d}e&&u(f,g,e,0,e.length);return f};m.decode=function(a){a=new p(a);var c=a.length||a.byteLength,b=0,d=0,e=null,f=a[b++],h=f&1;f=f>>1&7;if(E(f)){var g=a[b++];for(d=g&127;g&128;)d<<=7,g=a[b++],d|=g&127}F(f)&&(h?e=a[b++]<<8|a[b++]:((g=a[b++])?(e=new p(g),u(e,0,a,b,g),e=t.strdecode(e)):e="",b+=g));c-=b;g=new p(c);u(g,0,a,b,c);return{id:d,type:f,compressRoute:h,route:e,body:g}};var u=function(a,c,b,d,e){if("function"===typeof b.copy)b.copy(a,
c,d,d+e);else for(var f=0;f<e;f++)a[c++]=b[d++]},E=function(a){return a===m.TYPE_REQUEST||a===m.TYPE_RESPONSE},F=function(a){return a===m.TYPE_REQUEST||a===m.TYPE_NOTIFY||a===m.TYPE_PUSH},l={init:function(a){l.encoder.init(a.encoderProtos);l.decoder.init(a.decoderProtos)},encode:function(a,c){return l.encoder.encode(a,c)},decode:function(a,c){return l.decoder.decode(a,c)}};(l.constants={}).TYPES={uInt32:0,sInt32:0,int32:0,"double":1,string:2,message:2,"float":5};var M={isSimpleType:function(a){return"uInt32"===
a||"sInt32"===a||"int32"===a||"uInt64"===a||"sInt64"===a||"float"===a||"double"===a}},n=l.codec={},x=new ArrayBuffer(8),J=new Float32Array(x),K=new Float64Array(x),z=new Uint8Array(x);n.encodeUInt32=function(a){a=parseInt(a);if(isNaN(a)||0>a)return null;var c=[];do{var b=a%128;a=Math.floor(a/128);0!==a&&(b+=128);c.push(b)}while(0!==a);return c};n.encodeSInt32=function(a){a=parseInt(a);if(isNaN(a))return null;a=0>a?2*Math.abs(a)-1:2*a;return n.encodeUInt32(a)};n.decodeUInt32=function(a){for(var c=
0,b=0;b<a.length;b++){var d=parseInt(a[b]);c+=(d&127)*Math.pow(2,7*b);if(128>d)break}return c};n.decodeSInt32=function(a){a=this.decodeUInt32(a);return(a%2+a)/2*(1===a%2?-1:1)};n.encodeFloat=function(a){J[0]=a;return z};n.decodeFloat=function(a,c){if(!a||a.length<c+4)return null;for(var b=0;4>b;b++)z[b]=a[c+b];return J[0]};n.encodeDouble=function(a){K[0]=a;return z.subarray(0,8)};n.decodeDouble=function(a,c){if(!a||a.length<8+c)return null;for(var b=0;8>b;b++)z[b]=a[c+b];return K[0]};n.encodeStr=
function(a,c,b){for(var d=0;d<b.length;d++){var e=b.charCodeAt(d);e=127>=e?[e]:2047>=e?[192|e>>6,128|e&63]:[224|e>>12,128|(e&4032)>>6,128|e&63];for(var f=0;f<e.length;f++)a[c]=e[f],c++}return c};n.decodeStr=function(a,c,b){var d=[];for(b=c+b;c<b;){if(128>a[c]){var e=a[c];c+=1}else 224>a[c]?(e=((a[c]&63)<<6)+(a[c+1]&63),c+=2):(e=((a[c]&15)<<12)+((a[c+1]&63)<<6)+(a[c+2]&63),c+=3);d.push(e)}a="";for(c=0;c<d.length;)a+=String.fromCharCode.apply(null,d.slice(c,c+1E4)),c+=1E4;return a};n.byteLength=function(a){if("string"!==
typeof a)return-1;for(var c=0,b=0;b<a.length;b++){var d=a.charCodeAt(b);d=127>=d?1:2047>=d?2:3;c+=d}return c};x=l.encoder={};x.init=function(a){this.protos=a||{}};x.encode=function(a,c){var b=this.protos[a];if(!A(c,b))return null;var d=l.codec.byteLength(JSON.stringify(c));d=new ArrayBuffer(d);d=new Uint8Array(d);return b&&(b=H(d,0,b,c),0<b)?d.subarray(0,b):null};var h=l.decoder={};h.buffer=0;h.offset=0;h.init=function(a){this.protos=a||{}};h.setProtos=function(a){a&&(this.protos=a)};h.decode=function(a,
c){var b=this.protos[a];h.buffer=c;h.offset=0;return b?I({},b,h.buffer.length):null};var v=function(){this.socket=null;this.callbacks={};this.handlers={};this.routeMap={};this.nextHeartbeatTimeout=this.heartbeatTimeout=this.heartbeatInterval=0;this.gapThreshold=100;this.handshakeCallback=this.heartbeatTimeoutId=this.heartbeatId=null;this.handshakeBuffer={sys:{type:"js-websocket",version:"0.0.5"},user:{}};this.initCallback=null;this.handlers[g.TYPE_HANDSHAKE]=this.handshake;this.handlers[g.TYPE_HEARTBEAT]=
this.heartbeat;this.handlers[g.TYPE_DATA]=this.onData;this.handlers[g.TYPE_KICK]=this.onKick};L.Pomelo=v;v.reqId=0;var k=v.prototype;G(k);k.init=function(a,c){this.initCallback=c;var b=a.port,d="ws://"+a.host;b&&(d+=":"+b);this.handshakeBuffer.user=a.user;this.handshakeCallback=a.handshakeCallback;this.initWebSocket(d,c)};k.initWebSocket=function(a,c){console.log("connect to "+a);var b=this;this.socket=new WebSocket(a);this.socket.binaryType="arraybuffer";this.socket.onopen=function(a){a=g.encode(g.TYPE_HANDSHAKE,
t.strencode(JSON.stringify(b.handshakeBuffer)));b.send(a)};this.socket.onmessage=function(a){b.processPackage(g.decode(a.data),c);b.heartbeatTimeout&&(b.nextHeartbeatTimeout=Date.now()+b.heartbeatTimeout)};this.socket.onerror=function(a){b.emit("io-error",a);console.error("socket error: ",a)};this.socket.onclose=function(a){b.emit("close",a);console.error("socket close: ",a)}};k.disconnect=function(){var a=this.socket;a&&(a.disconnect&&a.disconnect(),a.close&&a.close(),console.log("disconnect"),this.socket=
null);this.heartbeatId&&(clearTimeout(this.heartbeatId),this.heartbeatId=null);this.heartbeatTimeoutId&&(clearTimeout(this.heartbeatTimeoutId),this.heartbeatTimeoutId=null)};k.request=function(a,c,b){2===arguments.length&&"function"===typeof c?(b=c,c={}):c=c||{};if(a=a||c.route)v.reqId++,this.sendMessage(v.reqId,a,c),this.callbacks[v.reqId]=b,this.routeMap[v.reqId]=a};k.notify=function(a,c){c=c||{};this.sendMessage(0,a,c)};k.sendMessage=function(a,c,b){var d=a?m.TYPE_REQUEST:m.TYPE_NOTIFY;b=(this.data.protos?
this.data.protos.client:{})[c]?l.encode(c,b):t.strencode(JSON.stringify(b));var e=0;this.dict&&this.dict[c]&&(c=this.dict[c],e=1);b=m.encode(a,d,e,c,b);a=g.encode(g.TYPE_DATA,b);this.send(a)};k.send=function(a){this.socket.send(a.buffer)};k.heartbeat=function(a){if(this.heartbeatInterval){var c=g.encode(g.TYPE_HEARTBEAT);this.heartbeatTimeoutId&&(clearTimeout(this.heartbeatTimeoutId),this.heartbeatTimeoutId=null);if(!this.heartbeatId){var b=this;this.heartbeatId=setTimeout(function(){b.heartbeatId=
null;b.send(c);b.nextHeartbeatTimeout=Date.now()+b.heartbeatTimeout;b.heartbeatTimeoutId=setTimeout(b.heartbeatTimeoutCb.bind(b),b.heartbeatTimeout)},this.heartbeatInterval)}}};k.heartbeatTimeoutCb=function(){var a=this.nextHeartbeatTimeout-Date.now();a>this.gapThreshold?this.heartbeatTimeoutId=setTimeout(this.heartbeatTimeoutCb.bind(this),a):(console.error("server heartbeat timeout"),this.emit("heartbeat timeout"),this.disconnect())};k.handshake=function(a){a=JSON.parse(t.strdecode(a));if(501===
a.code)this.emit("error","client version not fullfill");else if(200!==a.code)this.emit("error","handshake fail");else{this.handshakeInit(a);var c=g.encode(g.TYPE_HANDSHAKE_ACK);this.send(c);this.initCallback&&(this.initCallback(a),this.initCallback=null)}};k.onData=function(a){a=m.decode(a);if(0<a.id&&(a.route=this.routeMap[a.id],delete this.routeMap[a.id],!a.route))return;a.body=this.deCompose(a);this.processMessage(k,a)};k.onKick=function(a){this.emit("onKick")};k.processPackage=function(a){this.handlers[a.type].apply(this,
[a.body])};k.processMessage=function(a,c){if(c.id){var b=this.callbacks[c.id];delete this.callbacks[c.id];"function"===typeof b&&b(c.body)}else this.emit(c.route,c.body)};k.deCompose=function(a){var c=this.data.protos?this.data.protos.server:{},b=this.data.abbrs,d=a.route;if(a.compressRoute){if(!b[d])return{};d=a.route=b[d]}return c[d]?l.decode(d,a.body):JSON.parse(t.strdecode(a.body))};k.handshakeInit=function(a){a.sys&&a.sys.heartbeat?(this.heartbeatInterval=1E3*a.sys.heartbeat,this.heartbeatTimeout=
2*this.heartbeatInterval):this.heartbeatTimeout=this.heartbeatInterval=0;this.initData(a);"function"===typeof this.handshakeCallback&&this.handshakeCallback(a.user)};k.initData=function(a){if(a&&a.sys){this.data=a||{};var c=a.sys.dict,b=a.sys.protos;if(c){a.dict=c;a.abbrs={};for(var d in c)a.abbrs[c[d]]=d}b&&(a.protos={server:b.server||{},client:b.client||{}},l.init({encoderProtos:b.client,decoderProtos:b.server}))}}})(window,Uint8Array);