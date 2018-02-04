class MCCnfMgr {
    private static _instance: MCCnfMgr = null;
    
    public static getInstance(): MCCnfMgr {
        if(!this._instance)
        {
            this._instance = new MCCnfMgr();
        }
        return this._instance;
    }

    private _configMap: Object = {};

    private _manifest: any = null;

    public init(): void {
        var zip = new JSZip(RES.getRes("movieclip_zip"));
        this.initManifest(zip);
        this.initMCCnf(zip);
        RES.destroyRes("movieclip_zip");
    }

    private initManifest(zip: JSZip): void {
        var manifest = JSON.parse(zip.file("manifest.json").asText());
        this._manifest = manifest;
    }

    private initMCCnf(zip: JSZip): void {
        for(var configName in this._manifest) {
            var config = JSON.parse(zip.file(configName + ".json").asText());
            this.regMCCnf(configName, config);
        }
    }

    public regMCCnf(configName: string, config: any): Boolean {
        if(!config) {
            return false;
        }

        if(this._configMap[configName]) {
            console.log("MCCnfMgr_regMCCnf config already exist", configName);
            return false;
        }

        this._configMap[configName] = config;

        return true;
    }

    public getMCCnf(configName: string): any {
        var config = this._configMap[configName];
        if(!config) {
            console.log("MCCnfMgr_getMCCnf invalid configName", configName);
        }
        return config;
    }
}