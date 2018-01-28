//场景管理器
///<reference path="..\GameEvents.ts" />
///<reference path="StartScene.ts" />
///<reference path="AccountScene.ts" />
///<reference path="MainScene.ts" />
///<reference path="LoadingScene.ts" />

class SceneMgr extends egret.EventDispatcher {
    private static _instance: SceneMgr = null;
    
    public static getInstance(): SceneMgr
    {
        if(!this._instance)
        {
            this._instance = new SceneMgr();
        }
        return this._instance;
    }

    private _load_scene_data: any = null;
    private _scene_array: Object = null;
    private _running_scene: Scene = null;
    private _loading_scene: LoadingScene = null;
    private _root: egret.DisplayObjectContainer = null;

    public constructor()
    {
        super();

        this._scene_array = {};

        let scene = null;
        
        scene = new StartScene();
        this._scene_array[scene.getSceneType()] = scene;

        scene = new AccountScene();
        this._scene_array[scene.getSceneType()] = scene;

        scene = new MainScene();
        this._scene_array[scene.getSceneType()] = scene;

        this._loading_scene = new LoadingScene();
        this._scene_array[this._loading_scene.getSceneType()] = this._loading_scene;
        this._loading_scene.addEventListener( GameEvents.EVT_LOAD_COMPLETE, ( evt:egret.Event )=>{
            console.log("EVT_LOAD_COMPLETE", evt.data);
            var context_data = evt.data;
            this.switchScene(context_data.scene_type, context_data.scene_data);
        }, this );
    }

    public initRoot(root: egret.DisplayObjectContainer): void
    {
        this._root = root;
    }

    public getRunningScene(): Scene
    {
        return this._running_scene;
    }

    public update(interval: number): void
    {
        if(this._load_scene_data)
        {
            var load_scene_data = this._load_scene_data;
            this._load_scene_data = null;

            switch(load_scene_data.op)
            {
                case SceneMgrOP.SMOP_SwitchScene:
                {
                    this._switchScene(load_scene_data.scene_type, 
                        load_scene_data.scene_data);
                    break;
                }
                case SceneMgrOP.SMOP_LoadScene:
                {
                    this._loadScene(load_scene_data.scene_type, 
                        load_scene_data.scene_data,
                        load_scene_data.groupList,
                        load_scene_data.fileList
                        );
                    break;
                }
            }
        }

        if(this._running_scene && this._running_scene.parent)
        {
            this._running_scene.update(interval);
        }
    }

    public _switchScene(scene_type: number, scene_data: any): void
    {
        let scene = this._scene_array[scene_type];
        if(!scene)
        {
            console.error("_switchScene invalid scene_type", scene_type);
            return;
        }

        if(this._running_scene)
        {
            if(this._running_scene.parent)
            {
                this._root.removeChild(this._running_scene);
            }
            this._running_scene = null;
        }

        this._running_scene = scene;

        this._root.addChild(scene);
    }

    //切换场景
    public switchScene(scene_type: number, scene_data: any): void
    {
        this._load_scene_data = {
            op: SceneMgrOP.SMOP_SwitchScene,
            scene_type: scene_type,
            scene_data: scene_data
        }
    }

    public _loadScene(scene_type: number, scene_data: any, groupList: string[], fileList: string[]): void
    {
        let scene = this._scene_array[scene_type];
        if(!scene)
        {
            console.error("_loadScene invalid scene_type", scene_type);
            return;
        }

        if(this._running_scene)
        {
            if(this._running_scene.parent)
            {
                this._root.removeChild(this._running_scene);
            }
            this._running_scene = null;
        }

        this._running_scene = this._loading_scene;
        this._root.addChild(this._loading_scene);

        var context_data = {
            scene_type: scene_type,
            scene_data: scene_data
        }
        this._loading_scene.load(groupList, fileList, context_data);
    }

    //加载场景
    public loadScene(scene_type: number, scene_data: any, groupList: string[], fileList: string[]): void
    {
        this._load_scene_data = {
            op: SceneMgrOP.SMOP_LoadScene,
            scene_type: scene_type,
            scene_data: scene_data, 
            groupList: groupList,
            fileList: fileList
        }
    }
}