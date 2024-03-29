class GameApp extends egret.EventDispatcher {
    private static _instance: GameApp = null;
    
    public static getInstance(): GameApp {
        if(!this._instance) {
            this._instance = new GameApp();
        }
        return this._instance;
    }

    private _init: boolean = false;

    public constructor() {
        super();
    }

    public init(): void {
        if(this._init) {
            console.error("GameApp already initialize");
            return;
        }
        this._init = true;
        
        h5game.IntfcProxy.getCnfMgr().init();
        h5game.IntfcProxy.getMCFtry().init();
        h5game.IntfcProxy.getPSFtry().init();
        

        this.initMsgHandler();
    }

    public update(interval: number): void {
        if(!this._init) {
            return;
        }

        SceneMgr.getInstance().update(interval);
    }

    public loadScene(scene_type: number, scene_data: any) {
        switch(scene_type) {
            case SceneType.ST_MainScene: {
                var groupList = [
                    "main"
                ];
                var fileList = [];
                SceneMgr.getInstance().loadScene(scene_type, scene_data, groupList, fileList);
                break;
            }
            case SceneType.ST_FbScene: {
                //todo:
                break;
            }
            default: {
                console.error("GaemApp_loadScene invalid scene_type", scene_type);
                break;
            }
        }
    }

    public switchAccountSceneLayer(type: number): void {
        SceneMgr.getInstance().switchAccountSceneLayer(type);
    }

    private onConnect(): void {
        console.log("onConnect");
    }

    private onDisconnect(): void {
        alert("onDisconnect");
    }

    private onSocketIOError(): void {
        console.log("onSocketIOError");
    }

    private initMsgHandler(): void {
        NetMgr.getInstance().addEventListener(NetMgr.CONNECT, this.onConnect, this);
        NetMgr.getInstance().addEventListener(NetMgr.IO_ERROR, this.onSocketIOError, this);
        NetMgr.getInstance().addEventListener(NetMgr.CLOSE, this.onDisconnect, this);

        LoginMsgHdlr.init();
        RoleMsgHdlr.init();
        AreaMsgHdlr.init();
        EntryMsgHdlr.init();
        GateMsgHdlr.init();
        PlayerMsgHdlr.init();
        ResourceMsgHdlr.init();
        TeamMsgHdlr.init();
        FightMsgHdlr.init();
    }
}