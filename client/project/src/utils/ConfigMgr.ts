class ConfigMgr {
    private static _instance: ConfigMgr = null;
    
    public static getInstance(): ConfigMgr
    {
        if(!this._instance)
        {
            this._instance = new ConfigMgr();
        }
        return this._instance;
    }

    private _configMap: Object = {};

    private _preloadConfigFiles = [
        "city"
        ];

    public init(): void
    {
        for(var i in this._preloadConfigFiles)
        {
            var configName = this._preloadConfigFiles[i];
            var resName = "config_data_" + configName + "_json";
            var config = RES.getRes(resName); 
            this.registerConfig(configName, config);
        }

        this.initMapCnf();
    }

    private initMapCnf(): void
    {
        var city_cnfs = ConfigMgr.getInstance().getConfig("city");
        for (var map_id in city_cnfs)
        {
            var configName = "map_" + map_id;
            var resName = "config_map_" + map_id + "_json";
            var config = RES.getRes(resName); 
            this.registerConfig(configName, config);
        }
    }

    public registerConfig(configName: string, config: any): Boolean
    {
        if(!config)
        {
            return false;
        }

        if(this._configMap[configName])
        {
            console.log("ConfigMgr_registerConfig config already exist", configName);
            return false;
        }

        this._configMap[configName] = config;

        return true;
    }

    public getConfig(configName: string): any
    {
        var config = this._configMap[configName];
        if(!config)
        {
            console.log("ConfigMgr_getConfig invalid configName", configName);
        }
        return config;
    }

    public getMapConfig(mapID: number): any
    {
        var configName = "map_" + mapID;
        return this.getConfig(configName);
    }
}