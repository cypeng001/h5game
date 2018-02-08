namespace h5game
{

export type INetMsgCallback = (response:any) => void;
export type INetMsgReqHdlr = (msg:any, callback:INetMsgCallback) => void;
export type INetMsgNtfHdlr = (msg:any) => void;

export interface INetMsgHdlr {
    regReqHdlr(id: INetMsgReq, INetMsgReqHdlr): void;

    regNtfHdlr(id: INetMsgNtf, INetMsgNtfHdlr): void;

    requestMsg(id: INetMsgReq, msg: any, callback: INetMsgCallback): void;

    notifyMsg(id: INetMsgNtf, msg: any): void;

    addMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;

    removeMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;

    hasMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;

    clearMsgHdlr(id: INetMsgReq | INetMsgOn): void;

    dispatchMsg(id: INetMsgReq | INetMsgOn, response: any): void;
}

}