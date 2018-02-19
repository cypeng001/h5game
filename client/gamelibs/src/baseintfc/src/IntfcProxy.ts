namespace h5game
{

export class IntfcProxy {
    public static regCnfMgr(impl: ICnfMgr): void {
        egret.registerImplementation("ICnfMgr", impl);
    }

    public static getCnfMgr(): ICnfMgr {
        return egret.getImplementation("ICnfMgr");
    }

    public static regMCFtry(impl: IMCFtry): void {
        egret.registerImplementation("IMCFtry", impl);
    }

    public static getMCFtry(): IMCFtry {
        return egret.getImplementation("IMCFtry");
    }

    public static regPSFtry(impl: IPSFtry): void {
        egret.registerImplementation("IPSFtry", impl);
    }

    public static getPSFtry(): IPSFtry {
        return egret.getImplementation("IPSFtry");
    }

    public static regNetMsgHdlr(impl: INetMsgHdlr): void {
        egret.registerImplementation("INetMsgHdlr", impl);
    }

    public static getNetMsgHdlr(): INetMsgHdlr {
        return egret.getImplementation("INetMsgHdlr");
    }

    public static regLocalMsgDispatcher(impl: ILocalMsgDispatcher): void {
        egret.registerImplementation("ILocalMsgDispatcher", impl);
    }

    public static getLocalMsgDispatcher(): ILocalMsgDispatcher {
        return egret.getImplementation("ILocalMsgDispatcher");
    }

    public static regGameData(impl: any): void {
        egret.registerImplementation("IGameData", impl);
    }

    public static getGameData(): any {
        return egret.getImplementation("IGameData");
    }
}

}