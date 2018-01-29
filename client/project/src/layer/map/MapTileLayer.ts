//地图Tile层
class MapTileLayer extends egret.DisplayObjectContainer{
    private map_id:number=0;
    private map_cnf:any;
    private city_cnf:any;
    private _widht:number=0;
    private _height:number=0;
    private _tile_size:number=512;

    constructor() {
        super();
    }

    public update(interval: number): void
    {
    }

    public loadMap(mapID: number): void
    {     
        var map_cnf = ConfigMgr.getInstance().getMapConfig(mapID);
        var city_cnf = ConfigMgr.getInstance().getConfig("city")[mapID];

        this.map_id = mapID;
        this.map_cnf = map_cnf;
        this.city_cnf = city_cnf;

        this._widht = city_cnf.width;
        this._height = city_cnf.height;
        
        this._tile_size = map_cnf.tile_size;

        this.createMapTile();
    }

    private static getImagePath(mapId:number, x: number, y: number): string {
        return "resource/map/" + mapId + "/" + x + "X" + y + ".jpg";
    }

    public createMapTile(): void
    {
        var tile_size = this._tile_size;
        var tile_w = Math.floor((this._widht - 1)/tile_size + 1);
        var tile_h = Math.floor((this._height - 1)/tile_size + 1);

        for(var i=1; i<=tile_h; i++)
        {
            for(var j=1; j<=tile_w; j++)
            {
                var pos_x = tile_size*(j-1); 
                var pos_y = tile_size*(i-1);

                var img_label = new eui.Image(); 
                img_label.x = pos_x;
                img_label.y = pos_y;
                img_label.source = MapTileLayer.getImagePath(this.map_cnf.map_res, i, j);
                this.addChild(img_label);
            }
        }
    }



}