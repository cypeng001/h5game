namespace h5game
{

export class Player extends Actor {
    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_PLAYER;
    }

    public init(data: any, mapLayer: IMapLayer): void {
        super.init(data, mapLayer);

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
        this._sprite = IntfcProxy.getMCFtry().create("player_10001");
        this.addChild(this._sprite);
    }

    public moveTo(x: number, y: number): void {
        super.moveTo(x, y);

        if(this.mainPlayer) {
            IntfcProxy.getNetMsgHdlr().requestMsg(INetMsgReq.INMR_move, 
                [{x: this.x, y: this.y}, {x: x, y: y}], 
                null);
        }
    }
}

}