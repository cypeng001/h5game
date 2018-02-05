class Monster extends Actor {
    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_MONSTER;
    }

    public init(data: any, mapLayer: MapLayer): void {
        super.init(data, mapLayer);

        this._entityId = data.entityId;
        this._name = "mon10001";
        this._hp = data.hp;
        this._maxHp = data.maxHp;
        this._speed = data.walkSpeed;

        this.x = data.x;
        this.y = data.y;

        this.initSprite();
        this.initNameLabel();
        this.initHpBar();

        this.standAct();
    }

    public release(): void {
        super.release();
    }

    protected initSprite(): void {
        this._sprite = MCFtry.getInstance().create("monster_10001");
        this.addChild(this._sprite);
    }
}