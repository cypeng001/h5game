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

            GameApp.getInstance().loadScene(SceneType.ST_MainScene, null);

            BaseUtil.callFunc(callback, data);
        });
    }

    public reqMove(path: any, callback: Function): void {
        NetMgr.getInstance().request('area.playerHandler.move', {path: path}, function(data: any) {
            BaseUtil.callFunc(callback, data);
        });
    }
}