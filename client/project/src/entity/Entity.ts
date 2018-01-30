class Entity extends egret.DisplayObjectContainer {
    protected _data: any = null;

    protected _sprite: egret.MovieClip;
    protected _nameLabel: eui.Label;

    constructor() {
        super();
    }

    public get entityType(): number {
        return 0;
    }

    public get name(): string {
        return "name";
    }

    public init(data: any): void {
        this._data = data;
    }

    public release(): void {
        this._data = null;
    }

    protected initSprite(): void {

    }

    protected initNameLabel(): void {
        this._nameLabel = new eui.Label(this.name);

		this._nameLabel.width = 100;
		this._nameLabel.height = 20;
		this._nameLabel.textAlign = 'center';
		this._nameLabel.size = 13;
		this._nameLabel.stroke = 1;
		this._nameLabel.strokeColor = 0x333333;
		this._nameLabel.anchorOffsetY = 60;
		this._nameLabel.anchorOffsetX = this._nameLabel.width / 2;
		this._nameLabel.verticalAlign = "bottom";
		this._nameLabel.scaleX = this._nameLabel.scaleY = 0.8;

		this.addChild(this._nameLabel);
    }
}