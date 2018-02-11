namespace h5game
{

export class Monster extends Actor {
    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_MONSTER;
    }

    public init(data: any, mapLayer: IMapLayer): void {
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

        this.setTouchEnabled(true);
    }

    public release(): void {
        super.release();
    }

    protected initSprite(): void {
        this._sprite = IntfcProxy.getMCFtry().create("monster_10001");
        this.addChild(this._sprite);
    }

    protected onTouchTab(event: egret.TouchEvent): void {
        event.stopPropagation();

        console.log("Monster.onTouchTab localX:", event.localX, "localY:", event.localY, 
                    "stageX:", event.stageX, "stageY:", event.stageY);

        IntfcProxy.getNetMsgHdlr().requestMsg(INetMsgReq.INMR_FIGHT_attack, 
            {targetId: this._entityId}, 
            null);
    }
}

}