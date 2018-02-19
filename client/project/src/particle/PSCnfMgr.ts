class PSCnfMgr {
    private _configMap: Object = {};

    public init(): void {
        this._configMap = RES.getRes("particle_json");
    }

    public getConfig(key: string): any {
        return this._configMap[key];
    }
}