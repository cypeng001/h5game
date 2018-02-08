namespace h5game
{

export class EntityProxy {
    public static getMCFtry(): IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static getNetMsgHdlr(): INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }

    public static getLocalMsgDispatcher(): ILocalMsgDispatcher {
        return egret.getImplementation("ILocalMsgDispatcher");
    }
}

}