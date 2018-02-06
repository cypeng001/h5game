enum INetMsgIdR {
    INMIR_MOVE   = 1,
}

enum INetMsgIdN {
    INMIN_NONE   = 1,
}

enum INetMsgIdO {
    INMIO_NONE   = 1,
}

interface INetMsgHdlr {
    requestMsg(id: INetMsgIdR, msg: any, callback: (response: any) => void): void;

    notifyMsg(id: INetMsgIdN, msg: any): void;

    onMsg(id: INetMsgIdO, callback: (response:any)=>void): void;
}