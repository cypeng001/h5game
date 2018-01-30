class PanelUILayer extends eui.Component{
    private _objID: number = -1;
    private _panelID: number = -1;
    private _layerData: any = null;
    private static _s_objID: number = 0;
    private static _s_maxObjID: number = 99999;
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

    public listenNetworkMsg(protocol: any): void
    {
    }
}