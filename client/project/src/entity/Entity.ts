class Entity extends egret.DisplayObjectContainer {
    protected static _AUTO_LOCAL_ID: number = 1;
    protected static _AUTO_LOCAL_MAX_ID: number = 100000;
    protected _localId: number = 0;
    protected _entityId: number = 0;

    protected _data: any = null;

    constructor() {
        super();

        this._localId = Entity._AUTO_LOCAL_ID++;
        if(Entity._AUTO_LOCAL_ID > Entity._AUTO_LOCAL_MAX_ID) {
            Entity._AUTO_LOCAL_ID = 1;
        }
    }

    public get localId(): number {
        return this._localId;
    }

    public get entityId(): number {
        return this._entityId;
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