class NetMsgHdlr implements INetMsgHdlr {
    requestMsg(id: INetMsgIdR, msg: any, callback: (response: any) => void): void {
        switch(id) {
            case INetMsgIdR.INMIR_MOVE:
            {
                SceneMsgHandler.getInstance().reqMove(msg, callback);
                break;
            }
        }
    }

    notifyMsg(id: INetMsgIdN, msg: any): void {

    }

    onMsg(id: INetMsgIdO, callback: (response:any)=>void): void {

    }
}