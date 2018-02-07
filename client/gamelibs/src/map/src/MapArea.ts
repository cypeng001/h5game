namespace h5game
{

export class MapArea {
    public static DEF_SIZE: number = 1024;
    public x: number = 0;
    public y: number = 0;
    public state: MapAreaState = MapAreaState.MAS_OUT_SCREEN;

    private _mapLayer: MapLayer = null;
    private _mapTiles: MapTile[] = [];

    public constructor(_mapLayer: MapLayer) {
        this._mapLayer = _mapLayer;
    }

    public addMapTile(mapTile: MapTile): void {
        this._mapTiles.push(mapTile);
    }

    public isInScreen(x: number, y: number, w: number, h: number): boolean {
        return h5game.RectUtil.isIntersect(
            this.x, this.y, this.x + MapArea.DEF_SIZE, this.y + MapArea.DEF_SIZE,
            x, y, x + w, y + h
            );
    }

    public refresh(x: number, y: number, w: number, h: number): void {
        var k;
        for(k in this._mapTiles) {
            var mapTile = this._mapTiles[k];
            if(h5game.RectUtil.isIntersect(x, y, 
                x + w, y + h, 
                mapTile.x, mapTile.y, 
                mapTile.x + MapTileLayer.DEF_TILE_SIZE, mapTile.y + MapTileLayer.DEF_TILE_SIZE)) {

                mapTile.visible = true;
                mapTile.reload();
            }
            else {
                mapTile.visible = false;
                mapTile.unload();
            }
        }
    }

    public unload(): void {
        var k;
        for(k in this._mapTiles) {
            var mapTile = this._mapTiles[k];
            mapTile.visible = false;
            mapTile.unload();
        }
    }
}

}