namespace h5game
{

export class CnfMgr {
    private _configMap: Object = {};

    private _baseConfigFiles: string[] = null;

    public init(): void {
        var zip = new JSZip(RES.getRes("config_zip"));
        this.initBaseManifest(zip);
        this.initBaseCnf(zip);
        this.initMapCnf(zip);
        RES.destroyRes("config_zip");
    }

    private initBaseManifest(zip: JSZip): void {
        this._baseConfigFiles = JSON.parse(zip.file("data/manifest.json").asText());
    }

    private initBaseCnf(zip: JSZip): void {
        for(var i in this._baseConfigFiles) {
            var configName = this._baseConfigFiles[i];
            var config = JSON.parse(zip.file("data/" + configName + ".json").asText());
            this.registerConfig(configName, config);
        }
    }

    private initMapCnf(zip: JSZip): void {
        var city_cnfs = this.getConfig("city");
        for (var map_id in city_cnfs) {
            var configName = "map_" + map_id;
            var config = JSON.parse(zip.file("map/" + map_id + ".json").asText());
            this.registerConfig(configName, config);
        }
    }

    private registerConfig(configName: string, config: any): Boolean {
        if(!config) {
            return false;
        }

        if(this._configMap[configName]) {
            console.log("CnfMgr_registerConfig config already exist", configName);
            return false;
        }

        this._configMap[configName] = config;

        return true;
    }

    public getConfig(configName: string): any {
        var config = this._configMap[configName];
        if(!config) {
            console.log("CnfMgr_getConfig invalid configName", configName);
        }
        return config;
    }

    public getMapConfig(mapID: number): any {
        var configName = "map_" + mapID;
        return this.getConfig(configName);
    }
}

}