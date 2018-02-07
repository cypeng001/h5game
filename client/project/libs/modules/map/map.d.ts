declare namespace h5game {
    class MapArea {
        static DEF_SIZE: number;
        x: number;
        y: number;
        state: MapAreaState;
        private _mapLayer;
        private _mapTiles;
        constructor(_mapLayer: MapLayer);
        addMapTile(mapTile: MapTile): void;
        isInScreen(x: number, y: number, w: number, h: number): boolean;
        refresh(x: number, y: number, w: number, h: number): void;
        unload(): void;
    }
}
declare namespace h5game {
    enum MapAreaState {
        MAS_OUT_SCREEN = 1,
        MAS_IN_SCREEN = 2,
    }
    var MAP_AREA_SIZE: number;
}
declare namespace h5game {
    class MapLayer extends egret.DisplayObjectContainer {
        protected static DEF_LOGIC_WIDTH: number;
        protected static DEF_LOGIC_HEIGHT: number;
        protected _entityLayer: egret.DisplayObjectContainer;
        protected _mapTileLayer: MapTileLayer;
        protected _numLayer: egret.DisplayObjectContainer;
        protected _map_cnf: any;
        protected _city_cnf: any;
        protected _map_id: number;
        protected _width: number;
        protected _height: number;
        protected _tile_width: number;
        protected _tile_height: number;
        protected _curPlayer: h5game.Player;
        protected _aoiPlayers: {
            [key: number]: h5game.Player;
        };
        protected _monsters: {
            [key: number]: h5game.Monster;
        };
        protected _npcs: {
            [key: number]: h5game.Npc;
        };
        protected _lastRefreshPt: [number, number];
        protected _mapAreas: {
            [key: number]: MapArea;
        };
        constructor();
        loadMap(mapId: number, mapData: any): void;
        private initMapArea();
        protected addMapTileToMapArea(mapTile: MapTile): void;
        protected getMapAreaByPos(pos_x: number, pos_y: number): MapArea;
        protected refreshMapArea(): void;
        initEntities(data: any): void;
        update(interval: number): void;
        updateCamera(cameraX: number, cameraY: number): void;
        protected onTouchBegin(event: any): void;
        protected onTouchCancel(event: any): void;
        protected onTouchEnd(event: any): void;
        protected onTouchMove(event: any): void;
        protected _createPlayer(data: any): h5game.Player;
        protected initCurPlayer(data: any): void;
        createAoiPlayer(data: any): h5game.Player;
        removeAoiPlayer(entityId: number): void;
        getAoiPlayer(entityId: number): h5game.Player;
        createMonster(data: any): h5game.Monster;
        removeMonster(entityId: number): void;
        getMonster(entityId: number): h5game.Monster;
        createNpc(data: any): h5game.Npc;
        removeNpc(entityId: number): void;
        getNpc(entityId: number): h5game.Npc;
        getEntity(entityId: number): h5game.Entity;
        removeEntity(entityId: number): void;
        getActor(entityId: number): h5game.Actor;
        createNum(x: number, y: number, status: number, value: number): void;
        protected MsgHandler_onAddEntities(data: any): void;
        protected MsgHandler_onRemoveEntities(data: any): void;
        protected MsgHandler_onMove(data: any): void;
        protected MsgHandler_onAttack(data: any): void;
        protected initMsgHandler(): void;
        notify(cmd: h5game.IMapCmdN, params: any): void;
        query(cmd: h5game.IMapCmdQ, params: any): any;
    }
}
declare namespace h5game {
    class MapProxy {
        static getMCFtry(): h5game.IMCFtry;
        static getNetMsgHdlr(): h5game.INetMsgHdlr;
    }
}
declare namespace h5game {
    class MapTile {
        source: string;
        image: eui.Image;
        readonly x: number;
        readonly y: number;
        visible: boolean;
        reload(): void;
        unload(): void;
    }
}
declare namespace h5game {
    class MapTileLayer extends egret.DisplayObjectContainer {
        static DEF_TILE_SIZE: number;
        private map_id;
        private map_cnf;
        private city_cnf;
        private _widht;
        private _height;
        private _ver;
        private _mapTiles;
        private static getImagePath(mapId, x, y);
        constructor();
        update(interval: number): void;
        loadMap(mapID: number, mapData: any): void;
        createMapTile(): void;
        forEachMapTile(cb: (value: MapTile, index: number, array: MapTile[]) => void): void;
    }
}
