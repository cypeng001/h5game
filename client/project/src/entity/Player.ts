class Player extends Actor {
    constructor() {
        super();
    }

    public init(data: any): void {
        super.init(data);

        this._aoiId = data.entityId;
        this._name = data.name;
        this._hp = data.hp;
        this._maxHp = data.maxHp;
        this._mp = data.mp;
        this._maxMp = data.maxMp;
        this._speed = data.walkSpeed * ENTITY_POS_SCALE;

        this.x = data.x * ENTITY_POS_SCALE;
        this.y = data.y * ENTITY_POS_SCALE;

        this.initSprite();
        this.initNameLabel();
        this.initHpBar();
        this.initMpBar();

        this.standAct();
    }

    public release(): void {
        super.release();
    }

    protected initSprite(): void {
        var data = RES.getRes("movieclip_player_10001_json");
        var txtr = RES.getRes("movieclip_player_10001_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr);
        this._sprite = new egret.MovieClip( mcFactory.generateMovieClipData("player_10001"));
        this.addChild(this._sprite);
    }
}