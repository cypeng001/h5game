class GateMsgHdlr {
    public static init(): void {
        GateMsgHdlr.regReqHdlr();
        GateMsgHdlr.regNtfHdlr();
        GateMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_queryEntry, GateMsgHdlr.reqQueryEntry);
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
    }

    private static reqQueryEntry(msg: any, callback: Function): void {
        NetMgr.getInstance().request("gate.gateHandler.queryEntry", msg, function(response: any): void {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }


}