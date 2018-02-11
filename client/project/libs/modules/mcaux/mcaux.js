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
        function MCAdv(movieClipData, key, pool) {
            var _this = _super.call(this, movieClipData) || this;
            _this._pool = null;
            _this._mcDatas = {};
            _this.mcst = h5game.MCST.LOAD;
            _this._key = key;
            _this._pool = pool;
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
        MCAdv.prototype.playAnimation = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            if (this.mcst != h5game.MCST.LOAD) {
                return;
            }
            if (this._pool.getMCDataCnt() > 1) {
                var mcData = this._mcDatas[frame];
                if (!mcData) {
                    mcData = this._mcDatas[frame] = this._pool.createMovieClipData(this._key + "_" + frame);
                }
                this.movieClipData = mcData;
            }
            this.gotoAndPlay(frame, playTimes);
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
                var filelist = this.getFilelist(key);
                for (var i in filelist) {
                    var filename = filelist[i];
                    var config = JSON.parse(zip.file(filename + ".json").asText());
                    this.regMCCnf(filename, config);
                }
            }
        };
        MCCnfMgr.prototype.regMCCnf = function (key, config) {
            if (!config) {
                console.warn("MCCnfMgr_regMCCnf config is null", key);
                return false;
            }
            if (this._configMap[key]) {
                console.warn("MCCnfMgr_regMCCnf config already exist", key);
                return false;
            }
            this._configMap[key] = config;
            return true;
        };
        MCCnfMgr.prototype.getMCCnf = function (key) {
            var config = this._configMap[key];
            if (!config) {
                console.warn("MCCnfMgr_getMCCnf config is null", key);
            }
            return config;
        };
        MCCnfMgr.prototype.getHash = function (key, filename) {
            var crc = this._manifest[key].crc;
            var files = this._manifest[key].files;
            for (var i in files) {
                if (files[i] == filename) {
                    return crc[i];
                }
            }
            return "";
        };
        MCCnfMgr.prototype.getFilelist = function (key) {
            return this._manifest[key].files;
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
            _this._mcDataFtrys = null;
            _this._mcDataCnt = 0;
            _this._mcCnfMgr = null;
            _this._loadFileCnt = 0;
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
            return RES.config.resourceRoot + "movieclip/" + key + ".png";
        };
        MCPool.prototype.createObj = function (key, params) {
            var mcData = null;
            if (this.getMCDataCnt() == 1) {
                mcData = this._mcDataFtrys[key].generateMovieClipData(key);
            }
            return new h5game.MCAdv(mcData, key, this);
        };
        MCPool.prototype.recycleObj = function (obj) {
            var mc = obj;
            mc.clearEventListener();
        };
        MCPool.prototype.releaseObj = function (obj) {
            var mc = obj;
            mc.clearEventListener();
        };
        MCPool.prototype.reload = function (filename, texture) {
            this._mcDataFtrys[filename].texture = texture;
        };
        MCPool.prototype.create = function (key, params) {
            if (params === void 0) { params = null; }
            this._lastActiveTick = egret.getTimer();
            var filelist = this._mcCnfMgr.getFilelist(key);
            if (!this._mcDataFtrys) {
                this._mcDataFtrys = {};
                for (var i in filelist) {
                    var filename = filelist[i];
                    this._mcDataFtrys[filename] = new h5game.MCDataFtryAdv(this._mcCnfMgr.getMCCnf(filename));
                    this._mcDataCnt++;
                }
            }
            if (this._state == h5game.MCPST.UNLOAD) {
                this._state = h5game.MCPST.LOADING;
                this.loadNext();
            }
            return _super.prototype.create.call(this, key, params);
        };
        MCPool.prototype.loadNext = function () {
            var key = this._name;
            var filelist = this._mcCnfMgr.getFilelist(key);
            var filename = filelist[this._loadFileCnt];
            var imagePath = this.getImagePath(filelist[this._loadFileCnt]);
            var hash = this._mcCnfMgr.getHash(key, filename);
            if (hash && hash.length > 0) {
                imagePath += ("?v=" + hash);
            }
            var self = this;
            MCPool.getAssets(imagePath, function (texture) {
                egret.callLater(function () {
                    self._loadFileCnt++;
                    self.reload(filename, texture);
                    if (self._loadFileCnt == filelist.length) {
                        self.loadComplete();
                    }
                    else {
                        self.loadNext();
                    }
                }, self);
            });
        };
        MCPool.prototype.loadComplete = function () {
            this._state = h5game.MCPST.LOADED;
            for (var i in this._actPool) {
                var mc = this._actPool[i];
                if (mc.mcst == h5game.MCST.UNLOAD) {
                    mc.mcst = h5game.MCST.LOAD;
                }
            }
        };
        MCPool.prototype.release = function () {
            _super.prototype.release.call(this);
            var filelist = this._mcCnfMgr.getFilelist(this._name);
            for (var i in filelist) {
                var filename = filelist[i];
                var imagePath = this.getImagePath(filename);
                RES.destroyRes(imagePath);
            }
            this._mcDataFtrys = null;
            this._mcCnfMgr = null;
        };
        MCPool.prototype.canRelease = function () {
            return this._actPool.length == 0
                && (egret.getTimer() - this._lastActiveTick) > MCPool.DEF_RELEASE_TIME;
        };
        MCPool.prototype.getMCDataCnt = function () {
            return this._mcDataCnt;
        };
        MCPool.prototype.createMovieClipData = function (key) {
            return this._mcDataFtrys[key].generateMovieClipData(key);
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
