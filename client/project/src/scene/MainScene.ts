//主场景类
class MainScene extends Scene
{
    private _mainUI: MainUI;
    private _mapLayer: h5game.MapLayer;

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

        this._mapLayer = new h5game.MapLayer();
        this.addChild(this._mapLayer);

        var mapId = 4;


        if(window["TMP_TEST"]) {
            var map_cnf = h5game.IntfcProxy.getCnfMgr().getMapConfig(mapId);
            map_cnf.npc_list = [
                {"entityId": 200001, "x": 1504, "y": 1190},
            ];
            map_cnf.transport_list = [
                {"entityId": 300001, "x": 1025, "y": 1182},
            ];
        }

        this._mapLayer.loadMap(mapId);

        var gameData = h5game.IntfcProxy.getGameData();

        var playerData = {"id":1,"userId":1,"kindId":"210","name":"cyp001","country":null,"rank":null,"level":1,"experience":50,"attackValue":23,"defenceValue":9,"hitRate":90,"dodgeRate":13,"walkSpeed":240,"attackSpeed":1,"hp":110,"mp":20,"maxHp":220,"maxMp":20,"areaId":1,"x":1284,"y":935,"kindName":"Angle","skillPoint":1};
        gameData.playerData = playerData;

        if(window["TMP_TEST"]) {
            gameData.sceneData = {};

            var curPlayer = {"id":1,"entityId":87,"name":"cyp001","kindId":210,"type":"player","x":1284,"y":935,"hp":110,"mp":20,"maxHp":220,"maxMp":20,"level":1,"experience":50,"attackValue":23,"defenceValue":9,"walkSpeed":240,"attackSpeed":1,"areaId":1,"hitRate":90,"dodgeRate":13,"nextLevelExp":58,"skillPoint":1,"teamId":0,"bag":{"itemCount":20,"items":[{"key":1,"id":1,"type":"item"}]},"equipments":{"weapon":0,"armor":0,"helmet":0,"necklace":0,"ring":0,"belt":0,"shoes":0,"legguard":0,"amulet":0},"fightSkills":[{"id":1,"level":1}]}
            curPlayer.x = 1487;
            curPlayer.y = 1408;
            gameData.sceneData.curPlayer = curPlayer;

            gameData.sceneData.entities = {};
            gameData.sceneData.entities.mob = [];
            gameData.sceneData.entities.npc = [];
        }

        this._mapLayer.initEntities(gameData.sceneData);

        var fgPS = h5game.IntfcProxy.getPSFtry().create("cj_dengluzhuye");
        this.addChild(fgPS);

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