class PanelUILayer extends eui.Component{
    private _objID: number = -1;
    private _panelID: number = -1;
    private _layerData: any = null;
    private static _s_objID: number = 0;
    private static _s_maxObjID: number = 99999;
    private _localMsgCallbacks: {[key: number]: h5game.ILocalMsgCallback[]} = {};
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    public set layerData(data: any)
    {
        this._layerData = data;
    }

    protected onAddToStage(event: egret.Event): void
    {
        this.onEnter();
    }

    protected onRemoveFromStage(event: egret.Event): void
    {
        this.onExit();
    }

    public onEnter(): void
    {
        PanelUILayer._s_objID = PanelUILayer._s_objID + 1;
        if(PanelUILayer._s_objID > PanelUILayer._s_maxObjID)
        {
            PanelUILayer._s_objID = 1;
        }
        this._objID = PanelUILayer._s_objID;
    }

    public onExit(): void
    {
        this._objID = -1;
        this._layerData = null;

        this.clearLocalMsgListener();
    }

    public update(interval: number): void
    {
    }

    public getObjID(): number
    {
        return this._objID;
    }

    get objID(): number
    {
        return this._objID;
    }

    set panelID(id: number)
    {
        this._panelID = id;
    }

    get panelID(): number
    {
        return this._panelID;
    }

    protected addLocalMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
        if(this.hasLocalMsgListener(id, callback)) {
            return false;
        }

        var cblist = this._localMsgCallbacks[id];
        if(!cblist) {
            cblist = this._localMsgCallbacks[id] = [];
        }

        cblist.push(callback);

        return GameProxy.getLocalMsgDispatcher().addMsgListener(id, callback);
    }

    protected removeLocalMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
        var cblist = this._localMsgCallbacks[id];
        if(!cblist) {
            return false;
        }

        for(var i in cblist) {
            if(cblist[i] == callback) {
                cblist.splice(parseInt(i), 1);
                return true;
            }
        }

        return GameProxy.getLocalMsgDispatcher().removeMsgListener(id, callback);
    }

    protected hasLocalMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
        var cblist = this._localMsgCallbacks[id];
        if(!cblist) {
            return false;
        }

        for(var i in cblist) {
            if(cblist[i] == callback) {
                return true;
            }
        }

        return false;
    }

    protected clearLocalMsgListener(): void {
        for(var id in this._localMsgCallbacks) {
            var cblist = this._localMsgCallbacks[id];
            for(var i in cblist) {
                this.removeLocalMsgListener(parseInt(id), cblist[i]);
            }
        }
    }
}