class Player extends Actor {
    protected _mainPlayer: boolean = false;

    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_PLAYER;
    }

    public init(data: any): void {
        super.init(data);

        this._entityId = data.entityId;
        this._name = data.name;
        this._hp = data.hp;
        this._maxHp = data.maxHp;
        this._mp = data.mp;
        this._maxMp = data.maxMp;
        this._speed = data.walkSpeed;

        this.x = data.x;
        this.y = data.y;

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

    public set mainPlayer(val: boolean) {
        this._mainPlayer = val;
    }

    public get mainPlayer(): boolean {
        return this._mainPlayer;
    }

    public moveTo(x: number, y: number): void {
        super.moveTo(x, y);

        if(this.mainPlayer) {
            SceneMsgHandler.getInstance().reqMove([{x: this.x, y: this.y}, {x: x, y: y}], null);
        }
    }
}