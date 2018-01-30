class MapLayer extends egret.DisplayObjectContainer {
    protected static DEF_LOGIC_WIDTH: number = 640;
    protected static DEF_LOGIC_HEIGHT: number = 1136;

    protected _entityLayer: egret.DisplayObjectContainer = null;
    protected _mapTileLayer: MapTileLayer = null;

    protected _map_cnf: any = null;
    protected _city_cnf: any = null;

    protected _map_id: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;
    protected _tile_width: number = 0;
    protected _tile_height: number = 0;

    protected _curPlayer: Player = null;
    protected _aoiPlayers: Array<Player> = [];
    protected _monsters: Array<Monster> = [];
    protected _npcs: Array<Npc> = [];

    constructor() {
        super();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }

    public loadMap(mapId: number, mapData: any): void {
        var map_cnf = mapData.map_cnf;
        var city_cnf = mapData.city_cnf;

        this._map_id = mapId;
        this._map_cnf = map_cnf;
        this._city_cnf = city_cnf;
        this._width = map_cnf.map_width;
        this._height = map_cnf.map_height;
        this._tile_width = map_cnf.map_tile_width;
        this._tile_height = map_cnf.map_tile_height;

        this._mapTileLayer = new MapTileLayer();
        this.addChild(this._mapTileLayer);
        this._mapTileLayer.loadMap(mapId, mapData);

        this._entityLayer = new egret.DisplayObjectContainer();
        this.addChild(this._entityLayer);
    }

    public initEntities(data: any): void {
        this.initCurPlayer(data.curPlayer);

        for(var k in data.entities.mob) {
            var mobData = data.entities.mob[k];
            this.createMonster(mobData);
        }

        for(var k in data.entities.npc) {
            var npcData = data.entities.npc[k];
            this.createNpc(npcData);
        }
    }

    public update(interval: number): void {
        this._curPlayer.update(interval);

        for(var k in this._aoiPlayers) {
            var player = this._aoiPlayers[k];
            player.update(interval);
        }

        for(var k in this._monsters) {
            var monster = this._monsters[k];
            monster.update(interval);
        }

        for(var k in this._npcs) {
            var npc = this._npcs[k];
            npc.update(interval);
        }

        this.updateCamera(this._curPlayer.x, this._curPlayer.y);

        this._mapTileLayer.update(interval);
    }

    public updateCamera(cameraX: number, cameraY: number): void {
        this.x = Math.max(
                Math.min(0, -(cameraX - MapLayer.DEF_LOGIC_WIDTH / 2)), 
                -(this._width - MapLayer.DEF_LOGIC_WIDTH));
        this.y = Math.max(
                Math.min(0, -(cameraY - MapLayer.DEF_LOGIC_HEIGHT / 2)), 
                -(this._height - MapLayer.DEF_LOGIC_HEIGHT));
    }

    protected onTouchBegin(event): void {
    }

    protected onTouchCancel(event): void {
    }

    protected onTouchEnd(event): void {
        var localPt = this.globalToLocal(event.stageX, event.stageY);
        this._curPlayer.moveTo(localPt.x, localPt.y);
    }

    protected onTouchMove(event): void {
    }

    protected _createPlayer(data: any): Player {
        var player = new Player();
        player.init(data);
        this._entityLayer.addChild(player);

        return player;
    }

    protected initCurPlayer(data: any): void {
        var player = this._createPlayer(data);
        this._curPlayer = player;
    }

    public createAoiPlayer(data: any): Player {
        var player = this._createPlayer(data);
        this._aoiPlayers.push(player);
        return player;
    }

    public createMonster(data: any): Monster {
        var monster = new Monster();
        monster.init(data);
        this._entityLayer.addChild(monster);

        this._monsters.push(monster);

        return monster;
    }

    public createNpc(data: any): Npc {
        var npc = new Npc();
        npc.x = 300;
        npc.y = 300;
        npc.init(data);
        this._entityLayer.addChild(npc);

        this._npcs.push(npc);

        return npc;
    }
}