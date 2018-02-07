class NetMsgHdlr implements h5game.INetMsgHdlr {
    requestMsg(id: h5game.INetMsgReq, msg: any, callback: (response: any) => void): void {
        switch(id) {
            case h5game.INetMsgReq.INMR_MOVE:
            {
                SceneMsgHandler.getInstance().reqMove(msg, callback);
                break;
            }
        }
    }

    notifyMsg(id: h5game.INetMsgNtf, msg: any): void {

    }

    onMsg(id: h5game.INetMsgOn, callback: (response:any)=>void): void {
        switch(id) {
            case h5game.INetMsgOn.INMO_onAddEntities:
            {
                NetMgr.getInstance().on("onAddEntities", callback);
                break;
            }
            case h5game.INetMsgOn.INMO_onRemoveEntities:
            {
                NetMgr.getInstance().on("nRemoveEntities", callback);
                break;
            }
            case h5game.INetMsgOn.INMO_onAttack:
            {
                NetMgr.getInstance().on("onAttack", callback);
                break;
            }
            case h5game.INetMsgOn.INMO_onMove:
            {
                NetMgr.getInstance().on("onMove", callback);
                break;
            }
        }
    }
}