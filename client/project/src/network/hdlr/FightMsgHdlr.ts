class FightMsgHdlr {
    public static init(): void {
        FightMsgHdlr.regReqHdlr();
        FightMsgHdlr.regNtfHdlr();
        FightMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
        NetMgr.getInstance().on("onAttack", FightMsgHdlr.onAttack);
    }

    private static onAttack(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_FIGHT_onAttack, response);
    }


}