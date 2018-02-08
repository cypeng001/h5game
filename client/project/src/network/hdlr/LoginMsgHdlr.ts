class LoginMsgHdlr {
    public static init(): void {
        LoginMsgHdlr.regReqHdlr();
        LoginMsgHdlr.regNtfHdlr();
        LoginMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
        NetMgr.getInstance().on("onKick", LoginMsgHdlr.onKick);
        NetMgr.getInstance().on("disconnect", LoginMsgHdlr.onDisconnect);
        NetMgr.getInstance().on("onUserLeave", LoginMsgHdlr.onUserLeave);
    }

    private static onKick(response: any): void {
        console.log("LoginMsgHdlr.onKick");
    }

    private static onDisconnect(response: any): void {
        console.log("LoginMsgHdlr.onDisconnect");
    }

    private static onUserLeave(response: any): void {
        console.log("LoginMsgHdlr.onUserLeave");
    }


}