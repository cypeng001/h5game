namespace h5game
{

export interface ICnfMgr {
    init(): void;
    getConfig(configName: string): any;
    getMapConfig(mapID: number): any;
};

}