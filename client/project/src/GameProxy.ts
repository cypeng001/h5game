class GameProxy {
    public static getCnfMgr(): h5game.ICnfMgr {
        return egret.getImplementation("ICnfMgr");
    }
}