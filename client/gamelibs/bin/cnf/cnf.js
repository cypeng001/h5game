var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var CnfMgr = (function () {
        function CnfMgr() {
            this._configMap = {};
            this._baseConfigFiles = null;
        }
        CnfMgr.prototype.init = function () {
            var zip = new JSZip(RES.getRes("config_zip"));
            this.initBaseManifest(zip);
            this.initBaseCnf(zip);
            this.initMapCnf(zip);
            RES.destroyRes("config_zip");
        };
        CnfMgr.prototype.initBaseManifest = function (zip) {
            this._baseConfigFiles = JSON.parse(zip.file("data/manifest.json").asText());
        };
        CnfMgr.prototype.initBaseCnf = function (zip) {
            for (var i in this._baseConfigFiles) {
                var configName = this._baseConfigFiles[i];
                var config = JSON.parse(zip.file("data/" + configName + ".json").asText());
                this.registerConfig(configName, config);
            }
        };
        CnfMgr.prototype.initMapCnf = function (zip) {
            var city_cnfs = this.getConfig("city");
            for (var map_id in city_cnfs) {
                var configName = "map_" + map_id;
                var config = JSON.parse(zip.file("map/" + map_id + ".json").asText());
                this.registerConfig(configName, config);
            }
        };
        CnfMgr.prototype.registerConfig = function (configName, config) {
            if (!config) {
                return false;
            }
            if (this._configMap[configName]) {
                console.log("CnfMgr_registerConfig config already exist", configName);
                return false;
            }
            this._configMap[configName] = config;
            return true;
        };
        CnfMgr.prototype.getConfig = function (configName) {
            var config = this._configMap[configName];
            if (!config) {
                console.log("CnfMgr_getConfig invalid configName", configName);
            }
            return config;
        };
        CnfMgr.prototype.getMapConfig = function (mapID) {
            var configName = "map_" + mapID;
            return this.getConfig(configName);
        };
        return CnfMgr;
    }());
    h5game.CnfMgr = CnfMgr;
    __reflect(CnfMgr.prototype, "h5game.CnfMgr");
})(h5game || (h5game = {}));
