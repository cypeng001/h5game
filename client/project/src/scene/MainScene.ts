//主场景类
class MainScene extends Scene
{
    private _mainUI: MainUI;
    private _mapLayer: MapLayer;

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

        this._mapLayer = new MapLayer();
        this.addChild(this._mapLayer);

        var mapId = 4;
        var map_cnf = GameProxy.getCnfMgr().getMapConfig(mapId);
        var city_cnf = GameProxy.getCnfMgr().getConfig("city")[mapId];

        this._mapLayer.loadMap(mapId, {map_cnf: map_cnf, city_cnf});
        this._mapLayer.initEntities(g_gameData.sceneData);

        this._mainUI = new MainUI();
        this.addChild(this._mainUI);
    }

    //override
    public onExit(): void
    {
        super.onExit();

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
    }

    //override
    public update(interval: number): void
    {
        if(this._mainUI)
        {
            this._mainUI.update(interval);
        }

        if(this._mapLayer)
        {
            this._mapLayer.update(interval);
        }
    }
}