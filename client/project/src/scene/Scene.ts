//场景类
class Scene extends egret.DisplayObjectContainer
{
    private _uiLayerList: PanelUILayer[] = [];

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    public getSceneType(): number
    {
        return -1;
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
        console.log("Scene_onEnter", this.getSceneType());
    }

    public onExit(): void
    {
        console.log("Scene_onExit", this.getSceneType());
    }

    public update(interval: number): void
    {
    }

    public hasUILayer(layer: PanelUILayer): Boolean
    {
        for(var i in this._uiLayerList)
        {
            if(this._uiLayerList[i].getObjID() == layer.getObjID())
            {
                return true;
            }
        }

        return false;
    }

    public addUILayer(layer: PanelUILayer, zorder: number = 0)
    {
        if(this.hasUILayer(layer))
        {
            console.error("Scene_addUILayer layer has alreay exist", layer.panelID);
            return
        }

        this.addChild(layer);

        this._uiLayerList.push(layer);
    }

    public removeUILayer(layer: PanelUILayer)
    {
        for(var i = 0; i < this._uiLayerList.length; ++i)
        {
            if(this._uiLayerList[i].getObjID() == layer.getObjID())
            {
                if(layer.parent)
                {
                    layer.parent.removeChild(layer);
                }

                this._uiLayerList.splice(i, 1);

                return;
            }
        }

        console.error("Scene_addUILayer layer has not exist", layer.panelID);
    }

}