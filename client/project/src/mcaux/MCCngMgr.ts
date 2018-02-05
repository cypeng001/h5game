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
        for(var key in this._manifest) {
            var config = JSON.parse(zip.file(key + ".json").asText());
            this.regMCCnf(key, config);
        }
    }

    public regMCCnf(key: string, config: any): Boolean {
        if(!config) {
            return false;
        }

        if(this._configMap[key]) {
            console.log("MCCnfMgr_regMCCnf config already exist", key);
            return false;
        }

        this._configMap[key] = config;

        return true;
    }

    public getMCCnf(key: string): any {
        var config = this._configMap[key];
        if(!config) {
            console.log("MCCnfMgr_getMCCnf invalid key", key);
        }
        return config;
    }

    public getHash(key: string): string {
        return this._manifest[key];
    }
}