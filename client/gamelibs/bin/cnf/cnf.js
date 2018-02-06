var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var ConfigMgr = (function () {
        function ConfigMgr() {
            this._configMap = {};
            this._baseConfigFiles = null;
        }
        ConfigMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new ConfigMgr();
            }
            return this._instance;
        };
        ConfigMgr.prototype.init = function () {
            var zip = new JSZip(RES.getRes("config_zip"));
            this.initBaseManifest(zip);
            this.initBaseCnf(zip);
            this.initMapCnf(zip);
            RES.destroyRes("config_zip");
        };
        ConfigMgr.prototype.initBaseManifest = function (zip) {
            this._baseConfigFiles = JSON.parse(zip.file("data/manifest.json").asText());
        };
        ConfigMgr.prototype.initBaseCnf = function (zip) {
            for (var i in this._baseConfigFiles) {
                var configName = this._baseConfigFiles[i];
                var config = JSON.parse(zip.file("data/" + configName + ".json").asText());
                this.registerConfig(configName, config);
            }
        };
        ConfigMgr.prototype.initMapCnf = function (zip) {
            var city_cnfs = ConfigMgr.getInstance().getConfig("city");
            for (var map_id in city_cnfs) {
                var configName = "map_" + map_id;
                var config = JSON.parse(zip.file("map/" + map_id + ".json").asText());
                this.registerConfig(configName, config);
            }
        };
        ConfigMgr.prototype.registerConfig = function (configName, config) {
            if (!config) {
                return false;
            }
            if (this._configMap[configName]) {
                console.log("ConfigMgr_registerConfig config already exist", configName);
                return false;
            }
            this._configMap[configName] = config;
            return true;
        };
        ConfigMgr.prototype.getConfig = function (configName) {
            var config = this._configMap[configName];
            if (!config) {
                console.log("ConfigMgr_getConfig invalid configName", configName);
            }
            return config;
        };
        ConfigMgr.prototype.getMapConfig = function (mapID) {
            var configName = "map_" + mapID;
            return this.getConfig(configName);
        };
        ConfigMgr._instance = null;
        return ConfigMgr;
    }());
    h5game.ConfigMgr = ConfigMgr;
    __reflect(ConfigMgr.prototype, "h5game.ConfigMgr");
})(h5game || (h5game = {}));
