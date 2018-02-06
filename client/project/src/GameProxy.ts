class GameProxy {
    public static getCnfMgr(): h5game.ICnfMgr {
        return egret.getImplementation("ICnfMgr");
    }

    public static getMCFtry(): h5game.IMCFtry {
        return egret.getImplementation("IMCFtry");
    }
}