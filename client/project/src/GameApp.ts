class GameApp {
    private static _instance: GameApp = null;
    private _init: boolean = false;
    
    public static getInstance(): GameApp
    {
        if(!this._instance)
        {
            this._instance = new GameApp();
        }
        return this._instance;
    }

    //private _protocol_listeners = {};

    public constructor() {

    }

    public init(): void
    {
        if(this._init) {
            console.error("GameApp already initialize");
            return;
        }
        this._init = true;

        g_gameData.init();
        
        h5game.IntfcProxy.getCnfMgr().init();
        h5game.IntfcProxy.getMCFtry().init();

        this.initMsgHandler();
    }

    public update(interval: number): void
    {
        if(!this._init)
        {
            return;
        }
        /*
        ProtocolDecoder.getInstance().update(interval);
        */
        SceneMgr.getInstance().update(interval);
    }

    public loadScene(scene_type: number, scene_data: any)
    {
        //console.log("GameApp_loadScene", scene_type);

        switch(scene_type)
        {
            case SceneType.ST_MainScene:
            {
                var groupList = [
                    "main"
                ];
                var fileList = [];
                //ResUtility.getMapRes(fileList, g_gameData.role_data.map_id);
                SceneMgr.getInstance().loadScene(scene_type, scene_data, groupList, fileList);
                break;
            }
            case SceneType.ST_FbScene:
            {
                //todo:
                break;
            }
            default:
            {
                console.error("GaemApp_loadScene invalid scene_type", scene_type);
                break;
            }
        }
    }

    private onConnect(): void
    {
    }

    private onDisconnect(): void
    {
    }

    private initMsgHandler(): void {
        AreaMsgHdlr.init();
        EntryMsgHdlr.init();
        GateMsgHdlr.init();
        PlayerMsgHdlr.init();
        ResourceMsgHdlr.init();
        TeamMsgHdlr.init();
        FightMsgHdlr.init();
    }
}