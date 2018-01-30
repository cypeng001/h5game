class MapLayer extends egret.DisplayObjectContainer {
    protected static DEF_LOGIC_WIDTH: number = 640;
    protected static DEF_LOGIC_HEIGHT: number = 1136;

    protected _mapTileLayer: MapTileLayer = null;

    protected _map_cnf: any = null;
    protected _city_cnf: any = null;

    protected _map_id: number = 0;
    protected _width: number = 0;
    protected _height: number = 0;
    protected _tile_width: number = 0;
    protected _tile_height: number = 0;

    protected _player: Player = null;

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

        this._player = new Player();
        this._player.init({});
        this.addChild(this._player);
    }

    public update(interval: number): void {
        this._player.update(interval);
        this.updateCamera(this._player.x, this._player.y);

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

    protected onTouchBegin(event):void {
    }

    protected onTouchCancel(event):void {
    }

    protected onTouchEnd(event):void {
        var localPt = this.globalToLocal(event.stageX, event.stageY);
        this._player.moveTo(localPt.x, localPt.y);
    }

    protected onTouchMove(event):void {
    }
}