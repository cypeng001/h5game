class MapProxy {
    public static getMCFtry(): h5game.IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static getNetMsgHdlr(): h5game.INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }
}