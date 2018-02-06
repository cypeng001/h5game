var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var BaseUtil = (function () {
        function BaseUtil() {
        }
        BaseUtil.callFunc = function (func, params) {
            if (func) {
                func(params);
            }
        };
        return BaseUtil;
    }());
    h5game.BaseUtil = BaseUtil;
    __reflect(BaseUtil.prototype, "h5game.BaseUtil");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.randInRange = function (min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + Math.round(rand * range));
        };
        MathUtil.randInRangeFloat = function (min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + rand * range);
        };
        MathUtil._bezierat2 = function (a, b, c, t) {
            return Math.pow(1 - t, 2) * a +
                2 * t * (1 - t) * b +
                Math.pow(t, 2) * c;
        };
        MathUtil._bezierat3 = function (a, b, c, d, t) {
            return Math.pow(1 - t, 3) * a +
                3 * t * (Math.pow(1 - t, 2)) * b +
                3 * Math.pow(t, 2) * (1 - t) * c +
                Math.pow(t, 3) * d;
        };
        MathUtil.bezierat2 = function (x1, y1, x2, y2, x3, y3, t, result) {
            if (result === void 0) { result = null; }
            var rx = MathUtil._bezierat2(x1, x2, x3, t);
            var ry = MathUtil._bezierat2(y1, y2, y3, t);
            if (result) {
                result[0] = rx;
                result[1] = ry;
                return result;
            }
            return [rx, ry];
        };
        MathUtil.bezierat3 = function (x1, y1, x2, y2, x3, y3, x4, y4, t, result) {
            if (result === void 0) { result = null; }
            var rx = MathUtil._bezierat3(x1, x2, x3, x4, t);
            var ry = MathUtil._bezierat3(y1, y2, y3, y4, t);
            if (result) {
                result[0] = rx;
                result[1] = ry;
                return result;
            }
            return [rx, ry];
        };
        return MathUtil;
    }());
    h5game.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "h5game.MathUtil");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var PhpUtil = (function () {
        function PhpUtil() {
        }
        PhpUtil.param_count = function (param) {
            var count = 0;
            for (var k in param) {
                count++;
            }
            return count;
        };
        PhpUtil.param_2_str = function (param) {
            var ret = "";
            var i = 0;
            var count = PhpUtil.param_count(param);
            for (var k in param) {
                var v = param[k];
                ret += (k + "=" + v);
                i++;
                if (i < count) {
                    ret += ("&");
                }
            }
            return ret;
        };
        PhpUtil.post = function (url, param, handleFunc, errorFunc, thisObject) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var param_str = PhpUtil.param_2_str(param);
            request.send(param_str);
            function onPostResult(event) {
                var request = event.currentTarget;
                var result = JSON.parse(request.response);
                handleFunc.call(thisObject, result);
            }
            function onPostFail(event) {
                errorFunc.call(thisObject, event);
            }
            request.addEventListener(egret.Event.COMPLETE, onPostResult, null);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostFail, null);
        };
        return PhpUtil;
    }());
    h5game.PhpUtil = PhpUtil;
    __reflect(PhpUtil.prototype, "h5game.PhpUtil");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var RectUtil = (function () {
        function RectUtil() {
        }
        RectUtil.isIntersect = function (rc1_x1, rc1_y1, rc1_x2, rc1_y2, rc2_x1, rc2_y1, rc2_x2, rc2_y2) {
            return !(rc1_x2 < rc2_x1
                || rc2_x2 < rc1_x1
                || rc1_y2 < rc2_y1
                || rc2_y2 < rc1_y1);
        };
        return RectUtil;
    }());
    h5game.RectUtil = RectUtil;
    __reflect(RectUtil.prototype, "h5game.RectUtil");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var VectorUtil = (function () {
        function VectorUtil() {
        }
        VectorUtil.calcLength = function (x, y) {
            return Math.sqrt(x * x + y * y);
        };
        VectorUtil.calcNormalize = function (x, y, result) {
            if (result === void 0) { result = null; }
            var len = VectorUtil.calcLength(x, y);
            var rx = x / len;
            var ry = y / len;
            if (result) {
                result[0] = rx;
                result[1] = ry;
                return result;
            }
            return [rx, ry];
        };
        VectorUtil.calcDir = function (x1, y1, x2, y2, result) {
            if (result === void 0) { result = null; }
            var x_len = x2 - x1;
            var y_len = y2 - y1;
            var len = VectorUtil.calcLength(x_len, y_len);
            var rx = 0;
            var ry = 0;
            if (len > 0) {
                rx = x_len / len;
                ry = y_len / len;
            }
            if (result) {
                result[0] = rx;
                result[1] = ry;
                return result;
            }
            return [rx, ry];
        };
        VectorUtil.calcTarPos = function (x, y, dir_x, dir_y, len, result) {
            if (result === void 0) { result = null; }
            var rx = x + dir_x * len;
            var ry = y + dir_y * len;
            if (result) {
                result[0] = rx;
                result[1] = ry;
                return result;
            }
            return [rx, ry];
        };
        VectorUtil.radian2Degree = function (radian) {
            return radian / Math.PI * 180;
        };
        VectorUtil.degree2Radian = function (degree) {
            return degree / 180 * Math.PI;
        };
        VectorUtil.calcRadian = function (x, y) {
            var radian = Math.atan(Math.abs(y / x));
            if (x > 0) {
                if (y > 0) {
                    return radian;
                }
                else {
                    return 2 * Math.PI - radian;
                }
            }
            else {
                if (y > 0) {
                    return Math.PI - radian;
                }
                else {
                    return Math.PI + radian;
                }
            }
        };
        VectorUtil.calcDegree = function (x, y) {
            return VectorUtil.radian2Degree(VectorUtil.calcRadian(x, y));
        };
        return VectorUtil;
    }());
    h5game.VectorUtil = VectorUtil;
    __reflect(VectorUtil.prototype, "h5game.VectorUtil");
})(h5game || (h5game = {}));
