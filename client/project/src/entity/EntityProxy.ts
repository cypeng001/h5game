class EntityProxy {
    public static getMCFtry(): IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static getNetMsgHdlr(): INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }
}