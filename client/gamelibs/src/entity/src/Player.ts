namespace h5game
{

export class Player extends Actor {
    protected _mainPlayer: boolean = false;

    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_PLAYER;
    }

    public init(data: any, mapLayer: h5game.IMapLayer): void {
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
        this._sprite = EntityProxy.getMCFtry().create("player_10001");
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
            EntityProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgIdR.INMIR_MOVE, 
                [{x: this.x, y: this.y}, {x: x, y: y}], 
                null);
        }
    }
}

}