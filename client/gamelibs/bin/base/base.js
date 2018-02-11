var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var ObjPool = (function () {
        function ObjPool(name) {
            this._actPool = [];
            this._inactPool = [];
            this._lastActiveTick = 0;
            this._lastRecycleTick = 0;
            this._autoRecycleInterval = 60000;
            this._name = name;
        }
        ObjPool.prototype.createObj = function (key, params) {
            return {};
        };
        ObjPool.prototype.recycleObj = function (obj) {
        };
        ObjPool.prototype.releaseObj = function (obj) {
        };
        ObjPool.prototype.canRecycleObj = function (obj) {
            return false;
        };
        ObjPool.prototype.create = function (key, params) {
            var obj = null;
            this.autoRecycle();
            if (this._inactPool.length > 0) {
                obj = this._inactPool.pop();
                this._actPool.push(obj);
                return obj;
            }
            obj = this.createObj(key, params);
            this._actPool.push(obj);
            this._lastActiveTick = egret.getTimer();
            return obj;
        };
        ObjPool.prototype.recycle = function () {
            var rmkeys = null;
            for (var i in this._actPool) {
                var obj = this._actPool[i];
                if (this.canRecycleObj(obj)) {
                    rmkeys = rmkeys ? rmkeys : [];
                    rmkeys.push(i);
                    this._inactPool.push(obj);
                    this.recycleObj(obj);
                }
            }
            if (rmkeys) {
                for (var i in rmkeys) {
                    this._actPool.splice(rmkeys[i], 1);
                }
            }
            this._lastRecycleTick = egret.getTimer();
        };
        ObjPool.prototype.autoRecycle = function () {
            if (egret.getTimer() - this._lastRecycleTick > this._autoRecycleInterval) {
                this.recycle();
            }
        };
        ObjPool.prototype.release = function () {
            var key, obj;
            for (key in this._actPool) {
                obj = this._actPool[key];
                this.releaseObj(obj);
            }
            for (key in this._inactPool) {
                obj = this._inactPool[key];
                this.releaseObj(obj);
            }
            this._actPool = null;
            this._inactPool = null;
        };
        ObjPool.prototype.canRelease = function () {
            return this._actPool.length == 0;
        };
        ObjPool.prototype.profile = function () {
            console.log("ObjPool:" + this._name
                + " act:" + this._actPool.length
                + " inact:" + this._inactPool.length);
        };
        return ObjPool;
    }());
    h5game.ObjPool = ObjPool;
    __reflect(ObjPool.prototype, "h5game.ObjPool");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var ObjFtry = (function () {
        function ObjFtry() {
            this._poolMap = {};
        }
        ObjFtry.prototype.createPool = function (key) {
            return new h5game.ObjPool(key);
        };
        ObjFtry.prototype.getPool = function (key) {
            return this._poolMap[key];
        };
        ObjFtry.prototype.create = function (key, params) {
            if (params === void 0) { params = null; }
            var pool = this._poolMap[key];
            if (!pool) {
                this._poolMap[key] = pool = this.createPool(key);
            }
            return pool.create(key, params);
        };
        ObjFtry.prototype.recycle = function () {
            for (var key in this._poolMap) {
                var pool = this._poolMap[key];
                pool.recycle();
            }
        };
        ObjFtry.prototype.releaseInactPool = function () {
            var rmkeys = null;
            var key = null;
            for (key in this._poolMap) {
                var pool = this._poolMap[key];
                if (pool.canRelease()) {
                    rmkeys = rmkeys ? rmkeys : [];
                    rmkeys.push(key);
                }
            }
            if (rmkeys) {
                for (var k in rmkeys) {
                    key = rmkeys[k];
                    var pool = this._poolMap[key];
                    pool.release();
                    delete this._poolMap[key];
                }
            }
        };
        ObjFtry.prototype.profile = function () {
            var total = 0;
            for (var key in this._poolMap) {
                var pool = this._poolMap[key];
                pool.profile();
                total++;
            }
            console.log("ObjFtry total:", total);
        };
        return ObjFtry;
    }());
    h5game.ObjFtry = ObjFtry;
    __reflect(ObjFtry.prototype, "h5game.ObjFtry");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var BaseState = (function () {
        function BaseState() {
            this.cur_state = -1;
            this.next_state = -1;
            this.next_st_data = null;
        }
        BaseState.prototype.getCurState = function () {
            return this.cur_state;
        };
        BaseState.prototype.clearCurState = function () {
            this.cur_state = -1;
        };
        BaseState.prototype.update = function (interval) {
            if (this.next_state > 0) {
                var next_state = this.next_state;
                var next_st_data = this.next_st_data;
                this.next_state = -1;
                this.next_st_data = null;
                this.exitState(this.cur_state, next_state);
                this.cur_state = next_state;
                this.enterState(next_state, next_st_data);
            }
            else {
                this.updateState(interval);
            }
        };
        BaseState.prototype.enterState = function (next_state, next_st_data) {
        };
        BaseState.prototype.exitState = function (state, next_state) {
        };
        BaseState.prototype.updateState = function (interval) {
        };
        BaseState.prototype.setNextState = function (next_state, next_st_data) {
            this.next_state = next_state;
            this.next_st_data = next_st_data;
        };
        return BaseState;
    }());
    h5game.BaseState = BaseState;
    __reflect(BaseState.prototype, "h5game.BaseState");
})(h5game || (h5game = {}));
