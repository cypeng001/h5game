class NetMsgHdlr implements h5game.INetMsgHdlr {
    requestMsg(id: h5game.INetMsgIdR, msg: any, callback: (response: any) => void): void {
        switch(id) {
            case h5game.INetMsgIdR.INMIR_MOVE:
            {
                SceneMsgHandler.getInstance().reqMove(msg, callback);
                break;
            }
        }
    }

    notifyMsg(id: h5game.INetMsgIdN, msg: any): void {

    }

    onMsg(id: h5game.INetMsgIdO, callback: (response:any)=>void): void {

    }
}