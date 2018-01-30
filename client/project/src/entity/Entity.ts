class Entity extends egret.DisplayObjectContainer {
    protected _data: any = null;

    constructor() {
        super();
    }

    public get entityType(): number {
        return 0;
    }

    public init(data: any): void {
        this._data = data;
    }

    public release(): void {
        this._data = null;
    }

    protected update(interval: number): void {
        
    }
}