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
        /*
        g_gameData.init();
        ConfigMgr.getInstance().init();
        ProtocolDecoder.getInstance().init();
        ProtocolDecoder.getInstance().initProtocolHandler(this, this.onProtocolRecv);
        NetHandler.getInstance().addEventListener(NetEvent.CONNECT, this.onConnect, this);
        NetHandler.getInstance().addEventListener(NetEvent.DISCONNECT, this.onDisconnect, this);
        ProtocolRegister.init();
        NetModRepRegister.init();
        */

        this._init = true;

        g_gameData.init();
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
                    "art"
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
        //NetModLogin.reqHandShake();
    }

    private onDisconnect(): void
    {
    }

    /*
    private onProtocolRecv(protocol: ProtocolBase): void
    {
        this.notifyResponser(protocol);
        this.notifyProtocolListener(protocol);
        this.notifyProtocolToScene(protocol);
    }

    private notifyResponser(protocol: ProtocolBase): void
    {
        NetModResponser.getInstance().notifyResponser(protocol);
    }

    public addProtocolListener(protocol_id: number, callback: Function, obj: Object): void
    {
        if(!callback)
        {
            return;
        }

        var listeners = this._protocol_listeners[protocol_id];
        if(!listeners)
        {
            listeners = this._protocol_listeners[protocol_id] = [];
        }
        var listener = {
            callback: callback,
            obj: obj
        };
        listeners.push(listener);
    }

    private notifyProtocolListener(protocol: ProtocolBase): void
    {
        var protocol_id = protocol.getProtocolID();
        var listeners = this._protocol_listeners[protocol_id];
        if(listeners)
        {
            delete this._protocol_listeners[protocol_id];
            for(var i = 0; i < listeners.length; ++i)
            {
                var listener = listeners[i];
                listener.callback.call(listener.obj, protocol);
            }
        }
    }

    private notifyProtocolToScene(protocol: ProtocolBase): void
    {
        var scene = SceneMgr.getInstance().getRunningScene();
        scene.listenNetworkMsg(protocol);
    }
    */
}