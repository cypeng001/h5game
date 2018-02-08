class AreaMsgHdlr {
    public static init(): void {
        AreaMsgHdlr.regReqHdlr();
        AreaMsgHdlr.regNtfHdlr();
        AreaMsgHdlr.regOnHdlr();
    }

    private static regReqHdlr(): void {
    }

    private static regNtfHdlr(): void {
    }

    private static regOnHdlr(): void {
        NetMgr.getInstance().on("onAddEntities", AreaMsgHdlr.onAddEntities);
        NetMgr.getInstance().on("onRemoveEntities", AreaMsgHdlr.onRemoveEntities);
        NetMgr.getInstance().on("onMove", AreaMsgHdlr.onMove);
        NetMgr.getInstance().on("onChangeArea", AreaMsgHdlr.onChangeArea);
        NetMgr.getInstance().on("onPickItem", AreaMsgHdlr.onPickItem);
        NetMgr.getInstance().on("onRemoveItem", AreaMsgHdlr.onRemoveItem);
        NetMgr.getInstance().on("onDropItems", AreaMsgHdlr.onDropItems);
    }

    private static onAddEntities(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onAddEntities, response);
    }

    private static onRemoveEntities(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onRemoveEntities, response);
    }

    private static onMove(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onMove, response);
    }

    private static onChangeArea(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onChangeArea, response);
    }

    private static onPickItem(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onPickItem, response);
    }

    private static onRemoveItem(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onRemoveItem, response);
    }

    private static onDropItems(response: any): void {
        GameProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_onDropItems, response);
    }
}