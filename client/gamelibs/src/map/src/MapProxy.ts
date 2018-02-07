namespace h5game
{

export class MapProxy {
    public static getCnfMgr(): h5game.ICnfMgr {
        return egret.getImplementation("ICnfMgr");
    }

    public static getMCFtry(): h5game.IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static getNetMsgHdlr(): h5game.INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }
}

}