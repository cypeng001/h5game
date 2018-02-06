class Npc extends Actor {
    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_NPC;
    }

    public init(data: any, mapLayer: IMapLayer): void {
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
        this._sprite = h5game.MCFtry.getInstance().create("npc_10001");
        this.addChild(this._sprite);
    }
}