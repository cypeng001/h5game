//主场景类
class MainScene extends Scene
{
    /*
    private _mainUI: MainUI;
    private _mapLayer: MapLayer;
    */

    public constructor()
    {
        super();
    }

    public getSceneType(): number
    {
        return SceneType.ST_MainScene;
    }

    //override
    public onEnter(): void
    {
        super.onEnter();

        /*
        //地图层
        this._mapLayer = new MapLayer();
        this.addChild(this._mapLayer);

        this._mapLayer.loadMap(g_gameData.role_data.map_id);
        this._mapLayer.initPlayer(g_gameData.role_data);

        //主界面层
        this._mainUI = new MainUI();
        this.addChild(this._mainUI);
        */
    }

    //override
    public onExit(): void
    {
        super.onExit();

        /*
        if(this._mainUI)
        {
            if(this._mainUI.parent)
            {
                this._mainUI.parent.removeChild(this._mainUI);
            }
            this._mainUI = null;
        }

        if(this._mapLayer)
        {
            if(this._mapLayer.parent)
            {
                this._mapLayer.parent.removeChild(this._mapLayer);
            }
            this._mapLayer = null;
        }
        */
    }

    //override
    public update(interval: number): void
    {
        /*
        if(this._mainUI)
        {
            this._mainUI.update(interval);
        }
        if(this._mapLayer)
        {
            this._mapLayer.update(interval);
        }
        */
    }
}