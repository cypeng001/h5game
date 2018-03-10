namespace h5game
{

export class Player extends Actor {
    protected _titleEffect: egret.DisplayObject;

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
        this.initTitle();

        this.standAct();

        this.setTouchEnabled(true);
    }

    public release(): void {
        super.release();
    }

    protected initSprite(): void {
        this._sprite = IntfcProxy.getMCFtry().create("player_10002");
        //this._sprite = IntfcProxy.getMCFtry().create("player_10001");
        this.addChild(this._sprite);
    }

    protected initTitle(): void {
        this._titleEffect = IntfcProxy.getPSFtry().create("ui_ch_baihuazhengyan");
        this._titleEffect.y = -180;
        this._titleEffect.scaleX = this._titleEffect.scaleY = 0.7;
        this.addChild(this._titleEffect);
    }

    public moveTo(x: number, y: number): void {
        super.moveTo(x, y);

        if(this.mainPlayer) {
            IntfcProxy.getNetMsgHdlr().requestMsg(INetMsgReq.INMR_PLAYER_move, 
                {path: [{x: this.x, y: this.y}, {x: x, y: y}]}, 
                null);
        }
    }

    protected onTouchTab(event: egret.TouchEvent): void {
        event.stopPropagation();

        console.log("Player.onTouchTab localX:", event.localX, "localY:", event.localY, 
                    "stageX:", event.stageX, "stageY:", event.stageY);
    }
}

}