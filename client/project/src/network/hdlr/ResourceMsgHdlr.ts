class ResourceMsgHdlr {
    public static init(): void {
        ResourceMsgHdlr.regReqHdlr();
        ResourceMsgHdlr.regNtfHdlr();
        ResourceMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_RESOURCE_loadResource, ResourceMsgHdlr.reqLoadResource);
        h5game.IntfcProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_RESOURCE_loadAreaResource, ResourceMsgHdlr.reqLoadAreaResource);
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
    }

    private static reqLoadResource(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.resourceHandler.loadResource", msg, function(response: any): void {
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    private static reqLoadAreaResource(msg: any, callback: Function): void {
        NetMgr.getInstance().request("area.resourceHandler.loadAreaResource", msg, function(response: any): void {
            var gameData = h5game.IntfcProxy.getGameData();
            gameData.areaData = response;
            
            h5game.BaseUtil.callFunc(callback, response);
        });
    }
}