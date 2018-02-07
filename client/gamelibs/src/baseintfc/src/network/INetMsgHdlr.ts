namespace h5game
{

export interface INetMsgHdlr {
    requestMsg(id: INetMsgReq, msg: any, callback: (response: any) => void): void;

    notifyMsg(id: INetMsgNtf, msg: any): void;

    onMsg(id: INetMsgOn, callback: (response:any)=>void): void;
}

}