class ResourceMsgHdlr {
    public static init(): void {
        ResourceMsgHdlr.regReqHdlr();
        ResourceMsgHdlr.regNtfHdlr();
        ResourceMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_loadResource, ResourceMsgHdlr.reqLoadResource);
        GameProxy.getNetMsgHdlr().regReqHdlr(h5game.INetMsgReq.INMR_loadAreaResource, ResourceMsgHdlr.reqLoadAreaResource);
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
            g_gameData.areaData = response;
            
            h5game.BaseUtil.callFunc(callback, response);
        });
    }
}