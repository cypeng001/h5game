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
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onAddEntities, response);
    }

    private static onRemoveEntities(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onRemoveEntities, response);
    }

    private static onMove(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onMove, response);
    }

    private static onChangeArea(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onChangeArea, response);
    }

    private static onPickItem(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onPickItem, response);
    }

    private static onRemoveItem(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onRemoveItem, response);
    }

    private static onDropItems(response: any): void {
        h5game.IntfcProxy.getNetMsgHdlr().dispatchMsg(h5game.INetMsgOn.INMO_AREA_onDropItems, response);
    }
}