class UILayerMgr {
    private static _instance: UILayerMgr = null;
    
    public static getInstance(): UILayerMgr
    {
        if(!this._instance)
        {
            this._instance = new UILayerMgr();
        }
        return this._instance;
    }

    private _loadUIFuncMap: any = {}
    private _uiLayerMap: Object = {};

    private loadRoleUI(id: UILayerID, data: any): void
    {
        this.createUILayer(id, data, RoleUI);
    }

    private createUILayer(id: UILayerID, data: any, uiclass: any): void
    {
        if(this.hasUILayer(id))
        {
            console.error("UILayerMgr_createUILayer layer has exist");
            return;
        }

        let layer = new uiclass();
        layer.panelID = id;
        this._uiLayerMap[id] = layer;
        let scene = SceneMgr.getInstance().getRunningScene();
        scene.addUILayer(layer);
    }

    public hasUILayer(id: UILayerID): Boolean
    {
        if(this._uiLayerMap[id])
        {
            return true;
        }
        return false;
    }

    public loadUILayer(id: UILayerID, data?: any): void
    {
        if(this.hasUILayer(id))
        {
            console.error("UILayerMgr_LoadUILayer layer has exist");
            return;
        }

        switch(id)
        {
            case UILayerID.UIID_ROLE: { this.loadRoleUI(id, data); break; }
                
            default:
            {
                console.error("UILayerMgr_LoadUILayer invalid id", id);
                break;
            }
        }
    }

    public releaseUILayer(layer: PanelUILayer)
    {
        if(!this.hasUILayer(layer.panelID))
        {
            console.error("UILayerMgr_releaseUILayer layer invalid", layer.panelID);
            return;
        }

        this._uiLayerMap[layer.panelID] = null;

        let scene = SceneMgr.getInstance().getRunningScene();
        scene.removeUILayer(layer);
    }

    public init(): void
    {
    }
}