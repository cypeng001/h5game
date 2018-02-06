namespace h5game
{

export enum INetMsgIdR {
    INMIR_MOVE   = 1,
}

export enum INetMsgIdN {
    INMIN_NONE   = 1,
}

export enum INetMsgIdO {
    INMIO_NONE   = 1,
}

export interface INetMsgHdlr {
    requestMsg(id: INetMsgIdR, msg: any, callback: (response: any) => void): void;

    notifyMsg(id: INetMsgIdN, msg: any): void;

    onMsg(id: INetMsgIdO, callback: (response:any)=>void): void;
}

}