class EntryMsgHdlr {
    public static init(): void {
        EntryMsgHdlr.regReqHdlr();
        EntryMsgHdlr.regNtfHdlr();
        EntryMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_entry, EntryMsgHdlr.reqEntry);
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
    }

    private static reqEntry(msg: any, callback: Function): void {
        NetMgr.getInstance().request("connector.entryHandler.entry", msg, function(response: any): void {
            if(response.code == 200) {
                var userData = response.user;
                var playerData = response.player;

                if (!!userData) {
                    g_gameData.uid = userData.id;
                }
                g_gameData.playerId = playerData.id;
                g_gameData.areaId = playerData.areaId;
                g_gameData.player = playerData;
            }

            h5game.BaseUtil.callFunc(callback, response);
        });
    }


}