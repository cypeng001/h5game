namespace h5game
{

export class MapLayer extends egret.DisplayObjectContainer {
    protected static DEF_LOGIC_WIDTH: number = 640;
    protected static DEF_LOGIC_HEIGHT: number = 1136;

    protected _entityLayer: egret.DisplayObjectContainer = null;
    protected _mapTileLayer: MapTileLayer = null;
    protected _numLayer: egret.DisplayObjectContainer = null;

    protected _map_cnf: any = null;
    protected _city_cnf: any = null;

    protected _map_id: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;
    protected _tile_width: number = 0;
    protected _tile_height: number = 0;

    protected _curPlayer: Player = null;

    protected _aoiPlayers: {[key: number]: Player} = {};
    protected _monsters: {[key: number]: Monster} = {};
    protected _npcs: {[key: number]: Npc} = {};
    protected _lastRefreshPt: [number, number] = [0, 0];

    protected _mapAreas: {[key: number]: MapArea} = {};

    constructor() {
        super();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);

        this.initMsgHandler();
    }

    public loadMap(mapId: number): void {
        var city_cnf = MapProxy.getCnfMgr().getConfig("city")[mapId];
        var map_cnf = MapProxy.getCnfMgr().getMapConfig(mapId);

        this._map_id = mapId;
        this._map_cnf = map_cnf;
        this._city_cnf = city_cnf;
        this._width = map_cnf.map_width;
        this._height = map_cnf.map_height;
        this._tile_width = map_cnf.map_tile_width;
        this._tile_height = map_cnf.map_tile_height;

        this._mapTileLayer = new MapTileLayer();
        this.addChild(this._mapTileLayer);
        this._mapTileLayer.loadMap(mapId);

        this._entityLayer = new egret.DisplayObjectContainer();
        this.addChild(this._entityLayer);

        this._numLayer = new egret.DisplayObjectContainer();
        this.addChild(this._numLayer);

        this.initMapArea();
    }

    private initMapArea(): void {
        var col = Math.ceil(this._width / MapArea.DEF_SIZE);
	    var row = Math.ceil(this._height / MapArea.DEF_SIZE);

        for(var j = 1; j <= row; ++j) {
            for(var i = 1; i <= col; ++i) {
                var mapArea = new MapArea(this);
                mapArea.x = (i - 1) * MapArea.DEF_SIZE;
                mapArea.y = (j - 1) * MapArea.DEF_SIZE;
                this._mapAreas[(j - 1) * col + i] = mapArea;
            }
        }

        var self = this;
        this._mapTileLayer.forEachMapTile((mapTile: MapTile, index: number, array: MapTile[]) => {
            self.addMapTileToMapArea(mapTile);
        });
    }

    protected addMapTileToMapArea(mapTile: MapTile) {
        var mapArea = this.getMapAreaByPos(mapTile.x, mapTile.y);
        mapArea.addMapTile(mapTile);
    }

    protected getMapAreaByPos(pos_x: number, pos_y: number): MapArea {
        var i = Math.floor(pos_x / MapArea.DEF_SIZE) + 1;
	    var j = Math.floor(pos_y / MapArea.DEF_SIZE) + 1;
	    var col = Math.ceil(this._width / MapArea.DEF_SIZE);
	    var index = (j - 1) * col + i;
	    return this._mapAreas[index];
    }

    protected refreshMapArea(): void {
        var x = -this.x + MapLayer.DEF_LOGIC_WIDTH / 2;
        var y = -this.y + MapLayer.DEF_LOGIC_HEIGHT / 2

        var dx = MapLayer.DEF_LOGIC_WIDTH * 0.25;
        var dy = MapLayer.DEF_LOGIC_HEIGHT * 0.25;

        if(Math.abs(this._lastRefreshPt[0] - x) < dx 
            && Math.abs(this._lastRefreshPt[1] - y) < dy) {
            return;
        }
        this._lastRefreshPt[0] = x;
        this._lastRefreshPt[1] = y;

        var sw = MapLayer.DEF_LOGIC_WIDTH + dx * 2;
        var sh = MapLayer.DEF_LOGIC_HEIGHT + dy * 2;
        var sx = x - MapLayer.DEF_LOGIC_WIDTH / 2 - dx;
        var sy = y - MapLayer.DEF_LOGIC_HEIGHT / 2 - dy;
        for(var i in this._mapAreas) {
            var mapArea = this._mapAreas[i];
            if(mapArea.isInScreen(sx, sy, sw, sh)) {
                mapArea.refresh(sx, sy, sw, sh);
                mapArea.state = MapAreaState.MAS_IN_SCREEN;
            }
            else {
                var lastState = mapArea.state;
                if(lastState != MapAreaState.MAS_OUT_SCREEN) {
                    mapArea.unload();
                    mapArea.state = MapAreaState.MAS_OUT_SCREEN;
                }
            }
        }
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

        this.refreshMapArea();
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
        player.init(data, this);
        this._entityLayer.addChild(player);

        return player;
    }

    protected initCurPlayer(data: any): void {
        var player = this._createPlayer(data);
        player.mainPlayer = true;
        this._curPlayer = player;
    }

    public createAoiPlayer(data: any): Player {
        if(this._aoiPlayers[data.entityId]) {
            console.warn("createAoiPlayer player already exist", JSON.stringify(data));
            return;
        }

        var player = this._createPlayer(data);
        this._aoiPlayers[data.entityId] = player;
        return player;
    }

    public removeAoiPlayer(entityId: number): void {
        var player = this.getAoiPlayer(entityId);
        if(!player) {
            return;
        }

        player.release();

        if(player.parent) {
            player.parent.removeChild(player);
        }

        delete this._aoiPlayers[entityId];
    }

    public getAoiPlayer(entityId: number): Player {
        return this._aoiPlayers[entityId];
    }

    public createMonster(data: any): Monster {
        if(this._monsters[data.entityId]) {
            console.warn("createMonster monster already exist", JSON.stringify(data));
            return;
        }

        var monster = new Monster();
        monster.init(data, this);
        this._entityLayer.addChild(monster);

        this._monsters[data.entityId] = monster;

        return monster;
    }

    public removeMonster(entityId: number): void {
        var monster = this.getMonster(entityId);
        if(!monster) {
            return;
        }

        monster.release();

        if(monster.parent) {
            monster.parent.removeChild(monster);
        }

        delete this._monsters[entityId];
    }

    public getMonster(entityId: number): Monster {
        return this._monsters[entityId];
    }

    public createNpc(data: any): Npc {
        if(this._npcs[data.entityId]) {
            console.warn("createNpc npc already exist", JSON.stringify(data));
            return;
        }

        var npc = new Npc();
        npc.init(data, this);
        this._entityLayer.addChild(npc);

        this._npcs[data.entityId] = npc;

        return npc;
    }

    public removeNpc(entityId: number): void {
        var npc = this.getNpc(entityId);
        if(!npc) {
            return;
        }

        npc.release();

        if(npc.parent) {
            npc.parent.removeChild(npc);
        }

        delete this._npcs[entityId];
    }

    public getNpc(entityId: number): Npc {
        return this._npcs[entityId];
    }


    public getEntity(entityId: number): Entity {
        if(this._curPlayer.entityId == entityId) {
            return this._curPlayer;
        }

        var entity: Entity = null;

        entity = this._aoiPlayers[entityId];
        if(entity) {
            return entity;
        }

        entity = this._monsters[entityId];
        if(entity) {
            return entity;
        }

        entity = this._npcs[entityId];
        if(entity) {
            return entity;
        }

        return null;
    }

    public removeEntity(entityId: number): void {
        var entity = this.getEntity(entityId);
        if(!entity) {
            return;
        }

        if(entity.entityType == EntityType.ET_PLAYER) {
            this.removeAoiPlayer(entityId);
        }
        else if(entity.entityType == EntityType.ET_MONSTER) {
            this.removeMonster(entityId);
        }
        else if(entity.entityType == EntityType.ET_NPC) {
            this.removeNpc(entityId);
        }
    }

    public getActor(entityId: number): Actor {
        var entity: Entity = this.getEntity(entityId);
        if(!entity) {
            return null;
        }

        if(!(entity.entityType == EntityType.ET_PLAYER 
            || entity.entityType == EntityType.ET_MONSTER 
            || entity.entityType == EntityType.ET_NPC)) {
            return null;
        }

        return <Actor>entity;
    }

    public createNum(x: number, y: number, status: number, value: number): void {
        var container = new egret.DisplayObjectContainer;
		container.x = x;
		container.y = y;
        this._numLayer.addChild(container);

        var label = new eui.Label;
        label.size = 30;
		label.stroke = 1;
		label.strokeColor = 0x333333;
        label.text = value.toString();
        label.width = 100;
        label.anchorOffsetX = label.width / 2;
        container.addChild(label);

        egret.Tween.get(container).to({y: y - 20}, 500);
    }

    protected MsgHandler_onAddEntities(data: any): void {
        if(data.mob) {
            for(var k in data.mob) {
                var mobData = data.mob[k];
                this.createMonster(mobData);
            }
        }

        if(data.npc) {
            for(var k in data.npc) {
                var npcData = data.npc[k];
                this.createNpc(npcData);
            }
        }
    }

    protected MsgHandler_onRemoveEntities(data: any): void {
        if(data.entities) {
            for(var k in data.entities) {
                var entityId = data.entities[k];
                this.removeEntity(entityId);
            }
        }
    }

    protected MsgHandler_onMove(data: any): void {
        var path = data.path;
        var actor = this.getActor(data.entityId);
        if(!actor) {
            return;
        }

        actor.moveTo(path[1].x, path[1].y);
    }

    protected MsgHandler_onAttack(data: any): void {
        var skillId = data.skillId;
        var atkActor = this.getActor(data.attacker);
        var defActor = this.getActor(data.target);
        if(!atkActor || !defActor) {
            return;
        }

        atkActor.stopMove();
        atkActor.adjustDir(defActor.x, defActor.y);
        atkActor.execSkill(skillId, data);
    }

    protected initMsgHandler(): void {
        var self = this;

        MapProxy.getNetMsgHdlr().addMsgHdlr(INetMsgOn.INMO_onAddEntities, function(data: any) {
            self.MsgHandler_onAddEntities(data);
        });
        MapProxy.getNetMsgHdlr().addMsgHdlr(INetMsgOn.INMO_onRemoveEntities, function(data: any) {
            self.MsgHandler_onRemoveEntities(data);
        });
        MapProxy.getNetMsgHdlr().addMsgHdlr(INetMsgOn.INMO_onMove, function(data: any) {
            self.MsgHandler_onMove(data);
        });
        MapProxy.getNetMsgHdlr().addMsgHdlr(INetMsgOn.INMO_onAttack, function(data: any) {
            self.MsgHandler_onAttack(data);
        });
    }

    public notify(cmd: IMapCmdN, params: any): void {
        switch(cmd) {
            case IMapCmdN.IMCN_CreateNum:
            {
                this.createNum.apply(this, params);
            }
            break;
        }
    }
    
    public query(cmd: IMapCmdQ, params: any): any {
        switch(cmd) {
            case IMapCmdQ.IMCQ_GetActor:
            {
                return this.getActor.apply(this, params);
            }
        }
    }
}

}