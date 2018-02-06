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
        createPool(key: string): any;
        create(key: string): any;
        recycle(): void;
        releaseInactPool(): void;
        profile(): void;
    }
}
declare namespace h5game {
    enum INetMsgIdR {
        INMIR_MOVE = 1,
    }
    enum INetMsgIdN {
        INMIN_NONE = 1,
    }
    enum INetMsgIdO {
        INMIO_NONE = 1,
    }
    interface INetMsgHdlr {
        requestMsg(id: INetMsgIdR, msg: any, callback: (response: any) => void): void;
        notifyMsg(id: INetMsgIdN, msg: any): void;
        onMsg(id: INetMsgIdO, callback: (response: any) => void): void;
    }
}
