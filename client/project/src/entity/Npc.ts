class Npc extends Actor {
    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_NPC;
    }

    public init(data: any, mapLayer: MapLayer): void {
        super.init(data, mapLayer);

        this._entityId = data.entityId;
        this._name = "npc10001";

        this.x = data.x;
        this.y = data.y;

        this.initSprite();

        this.standAct();
    }

    public release(): void {
        super.release();
    }

    protected initSprite(): void {
        var data = RES.getRes("movieclip_npc_10001_json");
        var txtr = RES.getRes("movieclip_npc_10001_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this._sprite = new egret.MovieClip( mcFactory.generateMovieClipData("npc_10001"));
        this.addChild(this._sprite);
    }
}