declare namespace h5game {
    class ConfigMgr {
        private static _instance;
        static getInstance(): ConfigMgr;
        private _configMap;
        private _baseConfigFiles;
        init(): void;
        private initBaseManifest(zip);
        private initBaseCnf(zip);
        private initMapCnf(zip);
        registerConfig(configName: string, config: any): Boolean;
        getConfig(configName: string): any;
        getMapConfig(mapID: number): any;
    }
}
