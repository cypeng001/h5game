namespace h5game
{

export class MapProxy {
    public static getCnfMgr(): ICnfMgr {
        return egret.getImplementation("ICnfMgr");
    }

    public static getMCFtry(): IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static getNetMsgHdlr(): INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }
}

}