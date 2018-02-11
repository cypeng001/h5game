class FightMsgHdlr {
    public static init(): void {
        FightMsgHdlr.regReqHdlr();
        FightMsgHdlr.regNtfHdlr();
        FightMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_FIGHT_attack, FightMsgHdlr.reqAttack);
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
        NetMgr.getInstance().on("onAttack", FightMsgHdlr.onAttack);
    }

    private static reqAttack(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.fightHandler.attack", msg, function(response: any): void {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static onAttack(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_FIGHT_onAttack, response);
    }


}