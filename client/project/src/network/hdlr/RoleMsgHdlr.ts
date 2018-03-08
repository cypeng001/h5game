class RoleMsgHdlr {
    public static init(): void {
        RoleMsgHdlr.regReqHdlr();
        RoleMsgHdlr.regNtfHdlr();
        RoleMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_ROLE_createPlayer, RoleMsgHdlr.reqCreatePlayer);
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
    }

    private static reqCreatePlayer(msg: any, callback: Function): void {
        NetMgr.getInstance().request("connector.roleHandler.createPlayer", msg, function(response: any): void {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

}