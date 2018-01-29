class MapLayer extends egret.DisplayObjectContainer{
    private _mapTileLayer: MapTileLayer = null;

    private _map_cnf: any = null;
    private _city_cnf: any = null;

    private _map_id: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _tile_width: number = 0;
    private _tile_height: number = 0;

    constructor() {
        super();
    }
    public loadMap(mapID: number): void
    {
        var map_cnf = ConfigMgr.getInstance().getMapConfig(mapID);
        var city_cnf = ConfigMgr.getInstance().getConfig("city")[mapID];

        this._map_id = mapID;
        this._map_cnf = map_cnf;
        this._city_cnf = city_cnf;
        this._width = map_cnf.map_width;
        this._height = map_cnf.map_height;
        this._tile_width = map_cnf.map_tile_width;
        this._tile_height = map_cnf.map_tile_height;

        this._mapTileLayer = new MapTileLayer();
        this.addChild(this._mapTileLayer);
        this._mapTileLayer.loadMap(mapID);
    }

    public update(interval: number): void
    {        
        this._mapTileLayer.update(interval);
    }
}