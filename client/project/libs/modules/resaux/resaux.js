var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var RESAux = (function () {
        function RESAux() {
        }
        RESAux.releaseUnusedRes = function () {
            var codes = egret.BitmapData.$getUnusedList();
            var codeset = {};
            for (var k in codes) {
                codeset[codes[k]] = true;
            }
            var keys = [];
            var texture = null;
            var bitmapData = null;
            for (var name in RES.host.state) {
                if (RES.host.state[name] == 2) {
                    var data = RES.getRes(name);
                    if (data instanceof egret.SpriteSheet) {
                        texture = data.$texture;
                        if (texture) {
                            bitmapData = texture.$bitmapData;
                            if (bitmapData && codeset[bitmapData.hashCode]) {
                                keys.push(name);
                            }
                        }
                    }
                    else if (data instanceof egret.Texture) {
                        bitmapData = data.$bitmapData;
                        if (bitmapData && codeset[bitmapData.hashCode]) {
                            keys.push(name);
                        }
                    }
                }
            }
            for (var k in keys) {
                RES.destroyRes(keys[k]);
            }
        };
        return RESAux;
    }());
    h5game.RESAux = RESAux;
    __reflect(RESAux.prototype, "h5game.RESAux");
})(h5game || (h5game = {}));
