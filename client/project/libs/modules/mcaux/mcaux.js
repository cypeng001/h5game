var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var h5game;
(function (h5game) {
    var MCAdv = (function (_super) {
        __extends(MCAdv, _super);
        function MCAdv(movieClipData) {
            var _this = _super.call(this, movieClipData) || this;
            _this.mcst = h5game.MCST.LOAD;
            return _this;
        }
        MCAdv.prototype.gotoAndPlay = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            if (this.mcst != h5game.MCST.LOAD) {
                return;
            }
            _super.prototype.gotoAndPlay.call(this, frame, playTimes);
        };
        MCAdv.prototype.gotoAndStop = function (frame) {
            if (this.mcst != h5game.MCST.LOAD) {
                return;
            }
            _super.prototype.gotoAndStop.call(this, frame);
        };
        return MCAdv;
    }(egret.MovieClip));
    h5game.MCAdv = MCAdv;
    __reflect(MCAdv.prototype, "h5game.MCAdv");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MCCnfMgr = (function () {
        function MCCnfMgr() {
            this._configMap = {};
            this._manifest = null;
        }
        MCCnfMgr.prototype.init = function () {
            var zip = new JSZip(RES.getRes("movieclip_zip"));
            this.initManifest(zip);
            this.initMCCnf(zip);
            RES.destroyRes("movieclip_zip");
        };
        MCCnfMgr.prototype.initManifest = function (zip) {
            var manifest = JSON.parse(zip.file("manifest.json").asText());
            this._manifest = manifest;
        };
        MCCnfMgr.prototype.initMCCnf = function (zip) {
            for (var key in this._manifest) {
                var config = JSON.parse(zip.file(key + ".json").asText());
                this.regMCCnf(key, config);
            }
        };
        MCCnfMgr.prototype.regMCCnf = function (key, config) {
            if (!config) {
                return false;
            }
            if (this._configMap[key]) {
                console.log("MCCnfMgr_regMCCnf config already exist", key);
                return false;
            }
            this._configMap[key] = config;
            return true;
        };
        MCCnfMgr.prototype.getMCCnf = function (key) {
            var config = this._configMap[key];
            if (!config) {
                console.log("MCCnfMgr_getMCCnf invalid key", key);
            }
            return config;
        };
        MCCnfMgr.prototype.getHash = function (key) {
            return this._manifest[key];
        };
        return MCCnfMgr;
    }());
    h5game.MCCnfMgr = MCCnfMgr;
    __reflect(MCCnfMgr.prototype, "h5game.MCCnfMgr");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MCST;
    (function (MCST) {
        MCST[MCST["UNINIT"] = 1] = "UNINIT";
        MCST[MCST["LOAD"] = 2] = "LOAD";
        MCST[MCST["UNLOAD"] = 3] = "UNLOAD";
    })(MCST = h5game.MCST || (h5game.MCST = {}));
    ;
    var MCPST;
    (function (MCPST) {
        MCPST[MCPST["UNINIT"] = 1] = "UNINIT";
        MCPST[MCPST["UNLOAD"] = 2] = "UNLOAD";
        MCPST[MCPST["LOADING"] = 3] = "LOADING";
        MCPST[MCPST["LOADED"] = 4] = "LOADED";
    })(MCPST = h5game.MCPST || (h5game.MCPST = {}));
    ;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MCDataFtryAdv = (function (_super) {
        __extends(MCDataFtryAdv, _super);
        function MCDataFtryAdv(movieClipDataSet, texture) {
            return _super.call(this, movieClipDataSet, texture) || this;
        }
        MCDataFtryAdv.prototype.setTexture = function (value) {
            _super.prototype.setTexture.call(this, value);
            if (this.enableCache) {
                for (var k in this.$mcDataCache) {
                    var mcdata = this.$mcDataCache[k];
                    mcdata.spriteSheet = this.$spriteSheet;
                }
            }
        };
        return MCDataFtryAdv;
    }(egret.MovieClipDataFactory));
    h5game.MCDataFtryAdv = MCDataFtryAdv;
    __reflect(MCDataFtryAdv.prototype, "h5game.MCDataFtryAdv");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MCPool = (function (_super) {
        __extends(MCPool, _super);
        function MCPool(name, mcCnfMgr) {
            var _this = _super.call(this, name) || this;
            _this._state = h5game.MCPST.UNINIT;
            _this._mcDataFtry = null;
            _this._mcCnfMgr = null;
            _this._mcCnfMgr = mcCnfMgr;
            _this._autoRecycleInterval = MCPool.DEF_AUTO_RECYCLE_INTERVAL;
            _this._state = h5game.MCPST.UNLOAD;
            return _this;
        }
        MCPool.getAssets = function (source, callback) {
            var adapter = egret.getImplementation("eui.IAssetAdapter");
            adapter.getAsset(source, function (content) {
                callback(content);
            }, this);
        };
        MCPool.prototype.getImagePath = function (key) {
            var imagePath = RES.config.resourceRoot + "movieclip/" + key + ".png";
            var hash = this._mcCnfMgr.getHash(key);
            if (hash && hash.length > 0) {
                imagePath += ("?v=" + hash);
            }
            return imagePath;
        };
        MCPool.prototype.createObj = function (key) {
            return new h5game.MCAdv(this._mcDataFtry.generateMovieClipData(key));
        };
        MCPool.prototype.reload = function (texture) {
            this._mcDataFtry.texture = texture;
            for (var i in this._actPool) {
                var mc = this._actPool[i];
                if (mc.mcst == h5game.MCST.UNLOAD) {
                    mc.mcst = h5game.MCST.LOAD;
                }
            }
        };
        MCPool.prototype.create = function (key) {
            this._lastActiveTick = egret.getTimer();
            if (!this._mcDataFtry) {
                this._mcDataFtry = new h5game.MCDataFtryAdv(this._mcCnfMgr.getMCCnf(key));
            }
            if (this._state == h5game.MCPST.UNLOAD) {
                this._state = h5game.MCPST.LOADING;
                var self = this;
                var imagePath = this.getImagePath(key);
                MCPool.getAssets(imagePath, function (texture) {
                    self._state = h5game.MCPST.LOADED;
                    egret.callLater(function () {
                        self.reload(texture);
                    }, self);
                });
            }
            return _super.prototype.create.call(this, key);
        };
        MCPool.prototype.release = function () {
            _super.prototype.release.call(this);
            var imagePath = this.getImagePath(this._name);
            RES.destroyRes(imagePath);
            this._mcDataFtry = null;
            this._mcCnfMgr = null;
        };
        MCPool.prototype.canRelease = function () {
            return this._actPool.length == 0
                && (egret.getTimer() - this._lastActiveTick) > MCPool.DEF_RELEASE_TIME;
        };
        MCPool.DEF_RELEASE_TIME = 60000;
        MCPool.DEF_AUTO_RECYCLE_INTERVAL = 5000;
        return MCPool;
    }(h5game.ObjPool));
    h5game.MCPool = MCPool;
    __reflect(MCPool.prototype, "h5game.MCPool");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MCFtry = (function (_super) {
        __extends(MCFtry, _super);
        function MCFtry() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._init = false;
            _this._mcCnfMgr = null;
            return _this;
        }
        MCFtry.prototype.init = function () {
            if (this._init) {
                console.warn("MCFtry already init");
                return;
            }
            this._init = true;
            this._mcCnfMgr = new h5game.MCCnfMgr;
            this._mcCnfMgr.init();
        };
        MCFtry.prototype.createPool = function (key) {
            return new h5game.MCPool(key, this._mcCnfMgr);
        };
        return MCFtry;
    }(h5game.ObjFtry));
    h5game.MCFtry = MCFtry;
    __reflect(MCFtry.prototype, "h5game.MCFtry");
})(h5game || (h5game = {}));
