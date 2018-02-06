declare namespace h5game {
    class CnfMgr {
        private _configMap;
        private _baseConfigFiles;
        init(): void;
        private initBaseManifest(zip);
        private initBaseCnf(zip);
        private initMapCnf(zip);
        private registerConfig(configName, config);
        getConfig(configName: string): any;
        getMapConfig(mapID: number): any;
    }
}
