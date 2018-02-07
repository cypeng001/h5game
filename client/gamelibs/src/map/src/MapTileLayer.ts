namespace h5game
{

export class MapTileLayer extends egret.DisplayObjectContainer {
    public static DEF_TILE_SIZE = 512;

    private map_id: number = 0;
    private map_cnf: any = null;
    private city_cnf: any = null;
    private _widht: number = 0;
    private _height: number = 0;
    private _ver: string = "";
    private _mapTiles: Array<MapTile> = [];

    private static getImagePath(mapId:number, x: number, y: number): string {
        return "resource/map/" + mapId + "/" + x + "X" + y + ".jpg";
    }

    constructor() {
        super();
    }

    public update(interval: number): void {
    }

    public loadMap(mapId: number): void {     
        var city_cnf = MapProxy.getCnfMgr().getConfig("city")[mapId];
        var map_cnf = MapProxy.getCnfMgr().getMapConfig(mapId);

        this.map_id = mapId;
        this.map_cnf = map_cnf;
        this.city_cnf = city_cnf;

        this._widht = city_cnf.width;
        this._height = city_cnf.height;

        this._ver = city_cnf.ver ? city_cnf.ver : "";

        this.createMapTile();
    }

    public createMapTile(): void {
        var tile_size = MapTileLayer.DEF_TILE_SIZE;
        var tile_w = Math.floor((this._widht - 1) / tile_size + 1);
        var tile_h = Math.floor((this._height - 1) / tile_size + 1);

        for(var i = 1; i <= tile_h; i++) {
            for(var j = 1; j <= tile_w; j++) {
                var imagePath = MapTileLayer.getImagePath(this.map_cnf.map_res, i, j);
                if(this._ver && this._ver.length) {
                    imagePath += ("?v=" + this._ver);
                }

                var image = new eui.Image(); 
                image.x = tile_size * (j - 1);
                image.y = tile_size * (i - 1);

                this.addChild(image);

                var mapTile = new MapTile();
                mapTile.source = imagePath;
                mapTile.image = image;
                this._mapTiles.push(mapTile);
            }
        }
    }

    public forEachMapTile(cb: (value: MapTile, index: number, array: MapTile[]) => void): void {
        this._mapTiles.forEach(cb);
    }
}

}