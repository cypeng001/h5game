namespace h5game
{

export enum IMapCmdN {
    IMCN_CreateNum = 1,
};

export enum IMapCmdQ {
    IMCQ_GetActor = 1,
};

export interface IMapLayer {
    notify(cmd: IMapCmdN, params: any): void;
    query(cmd: IMapCmdQ, params: any): any;
};

}