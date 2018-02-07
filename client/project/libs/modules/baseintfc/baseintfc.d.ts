declare namespace h5game {
    enum IMapCmdN {
        IMCN_CreateNum = 1,
    }
    enum IMapCmdQ {
        IMCQ_GetActor = 1,
    }
    interface IMapLayer {
        notify(cmd: IMapCmdN, params: any): void;
        query(cmd: IMapCmdQ, params: any): any;
    }
}
declare namespace h5game {
    interface IMCFtry {
        init(): void;
        createPool(key: string): any;
        create(key: string): any;
        recycle(): void;
        releaseInactPool(): void;
        profile(): void;
    }
}
declare namespace h5game {
    enum INetMsgReq {
        INMR_MOVE = 1,
    }
    enum INetMsgNtf {
        INMN_NONE = 1,
    }
    enum INetMsgOn {
        INMO_onAddEntities = 1,
        INMO_onRemoveEntities = 2,
        INMO_onMove = 3,
        INMO_onAttack = 4,
    }
}
declare namespace h5game {
    interface INetMsgHdlr {
        requestMsg(id: INetMsgReq, msg: any, callback: (response: any) => void): void;
        notifyMsg(id: INetMsgNtf, msg: any): void;
        onMsg(id: INetMsgOn, callback: (response: any) => void): void;
    }
}
declare namespace h5game {
    interface ICnfMgr {
        init(): void;
        getConfig(configName: string): any;
        getMapConfig(mapID: number): any;
    }
}
