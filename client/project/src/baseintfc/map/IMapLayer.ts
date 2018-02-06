enum IMapCmdN {
    IMCN_CreateNum = 1,
};

enum IMapCmdQ {
    IMCQ_GetActor = 1,
};

interface IMapLayer {
    notify(cmd: IMapCmdN, params: any): void;
    query(cmd: IMapCmdQ, params: any): any;
};