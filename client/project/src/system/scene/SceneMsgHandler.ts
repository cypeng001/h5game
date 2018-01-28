class SceneMsgHandler {
    private static _instance: SceneMsgHandler = null;
    public static getInstance(): SceneMsgHandler {
        if(!SceneMsgHandler._instance) {
            SceneMsgHandler._instance = new SceneMsgHandler;
        }
        return SceneMsgHandler._instance;
    }

    public init(): void {
    }

    public reqLoadAreaResource(callback: Function): void {
        NetMgr.getInstance().request('area.resourceHandler.loadAreaResource', {}, function(data: any): void {
            g_gameData.areaData = data;

            BaseUtil.callFunc(callback, data);
        });
    }

    public reqEnterScene(callback: Function): void {
        NetMgr.getInstance().request('area.playerHandler.enterScene', null, function(data: any): void {
            g_gameData.sceneData = data;

            BaseUtil.callFunc(callback, data);
        });
    }
}