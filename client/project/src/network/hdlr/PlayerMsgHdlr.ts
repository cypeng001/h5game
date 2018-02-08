class PlayerMsgHdlr {
    public static init(): void {
        PlayerMsgHdlr.regReqHdlr();
        PlayerMsgHdlr.regNtfHdlr();
        PlayerMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_enterScene, PlayerMsgHdlr.reqEnterScene);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_changeArea, PlayerMsgHdlr.reqChangeArea);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_move, PlayerMsgHdlr.reqMove);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_dropItem, PlayerMsgHdlr.reqDropItem);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_useItem, PlayerMsgHdlr.reqUseItem);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_pickItem, PlayerMsgHdlr.reqPickItem);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_learnSkill, PlayerMsgHdlr.reqLearnSkill);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_upgradeSkill, PlayerMsgHdlr.reqUpgradeSkill);
    }

    private static regNtfHdlr(): void {
        GameProxy.getNetMsgHdlr().regNtfHdlr(h5game.INetMsgNtf.INMN_changeView, PlayerMsgHdlr.notifyChangeView);
        GameProxy.getNetMsgHdlr().regNtfHdlr(h5game.INetMsgNtf.INMN_npcTalk, PlayerMsgHdlr.notifyNpcTalk);
    }

    private static regOnHdlr(): void {
        NetMgr.getInstance().on("onPlayerDialog", PlayerMsgHdlr.onPlayerDialog);
        NetMgr.getInstance().on("onNPCTalk", PlayerMsgHdlr.onNPCTalk);
        NetMgr.getInstance().on("onUpgrade", PlayerMsgHdlr.onUpgrade);
        NetMgr.getInstance().on("onPathCheckout", PlayerMsgHdlr.onPathCheckout);
    }

    private static reqEnterScene(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.enterScene", msg, function(response: any): void {
            g_gameData.sceneData = response;
            
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqMove(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.move", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqChangeArea(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.changeArea", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqDropItem(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.dropItem", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqUseItem(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.useItem", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqPickItem(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.pickItem", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqLearnSkill(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.learnSkill", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqUpgradeSkill(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.playerHandler.upgradeSkill", msg, function(response: any) {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static notifyChangeView(msg: any): void {
        NetMgr.getInstance().notify("area.playerHandler.changeView", msg);
    }

    private static notifyNpcTalk(msg: any): void {
        NetMgr.getInstance().notify("area.playerHandler.npcTalk", msg);
    }

    private static onPlayerDialog(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onPlayerDialog, response);
    }

    private static onNPCTalk(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onNPCTalk, response);
    }

    private static onUpgrade(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onUpgrade, response);
    }

    private static onPathCheckout(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onPathCheckout, response);
    }
}