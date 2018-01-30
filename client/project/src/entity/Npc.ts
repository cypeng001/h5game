class Npc extends Actor {
    constructor() {
        super();
    }

    public init(data: any): void {
        super.init(data);

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