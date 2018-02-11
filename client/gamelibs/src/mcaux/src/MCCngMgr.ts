namespace h5game
{
    
export class MCCnfMgr {
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
            var filelist = this.getFilelist(key);
            for(var i in filelist) {
                var filename = filelist[i];
                var config = JSON.parse(zip.file(filename + ".json").asText());
                this.regMCCnf(filename, config);
            }
        }
    }

    public regMCCnf(key: string, config: any): Boolean {
        if(!config) {
            console.warn("MCCnfMgr_regMCCnf config is null", key);
            return false;
        }

        if(this._configMap[key]) {
            console.warn("MCCnfMgr_regMCCnf config already exist", key);
            return false;
        }

        this._configMap[key] = config;

        return true;
    }

    public getMCCnf(key: string): any {
        var config = this._configMap[key];
        if(!config) {
            console.warn("MCCnfMgr_getMCCnf config is null", key);
        }
        return config;
    }

    public getHash(key: string, filename: string): string {
        var crc = this._manifest[key].crc;
        var files = this._manifest[key].files;
        for(var i in files) {
            if(files[i] == filename) {
                return crc[i];
            }
        }

        return "";
    }

    public getFilelist(key: string): string[] {
        return this._manifest[key].files;
    }
}

}