namespace h5game
{

export class Transport extends Entity {
    protected _effect: egret.DisplayObject;

    constructor() {
        super();
    }

    public get entityType(): number {
        return EntityType.ET_TRANSPORT;
    }

    public init(data: any, mapLayer: IMapLayer): void {
        super.init(data, mapLayer);

        this.x = data.x;
        this.y = data.y;

        this.initRes();

    }

    public release(): void {
        super.release();
    }

    protected initRes(): void {
        this._effect = IntfcProxy.getPSFtry().create("scene_chuansongmen1");
        this.addChild(this._effect);
    }

}

}