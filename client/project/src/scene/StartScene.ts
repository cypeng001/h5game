//启动场景类
class StartScene extends Scene
{
    private _loadingBg: egret.Bitmap;
    private _startLoadingLayer: StartLoadingLayer;
    private _loadGroupList: string[] = ["account", "config"];
    private _loadGroupCount: number = 0;

    public constructor()
    {
        super();
    }

    public getSceneType(): number
    {
        return SceneType.ST_StartScene;
    }

    //override
    public onEnter(): void
    {
        super.onEnter();

        this._loadingBg = new egret.Bitmap(RES.getRes("start_bg_jpg"));
        this.addChild( this._loadingBg );

        this._startLoadingLayer = new StartLoadingLayer();
        this.addChild(this._startLoadingLayer);

        this.startLoad();
    }

    //override
    public onExit(): void
    {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        super.onExit();
    }

    private startLoad(): void
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        //console.info("StartScene_startLoad1");
        for(var i in this._loadGroupList)
        {
            var group = this._loadGroupList[i];
            //console.info("StartScene_startLoad2:" + group);
            RES.loadGroup(group);
        }
    }

    private initGame(): void
    {
        GameApp.getInstance().init();
    }

    private loadComplete(): void
    {
        this.initGame();
        
        SceneMgr.getInstance().switchScene(SceneType.ST_AccountScene, null);
    }

    private isLoadGroup(groupName: string): boolean
    {
        for(var i in this._loadGroupList)
        {
            var group = this._loadGroupList[i];
            if(group == groupName)
            {
                return true;
            }
        }
        return false;
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        //console.info("StartScene_onResourceLoadComplete1", event.groupName)
        if(this.isLoadGroup(event.groupName))
        {
            this._loadGroupCount++;
        }
        else
        {
            //console.error("StartScene_onResourceLoadComplete invalid groupName");
            return;
        }

        //console.info("StartScene_onResourceLoadComplete2", this._loadGroupCount, this._loadGroupList.length);
        if(this._loadGroupCount == this._loadGroupList.length)
        {
            //console.info("StartScene_onResourceLoadComplete2");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            this.loadComplete();
        }
    }

    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
    }


    private onResourceProgress(event:RES.ResourceEvent):void {
        if(!this.isLoadGroup(event.groupName))
        {
            console.error("StartScene_onResourceProgress invalid groupName");
            return;
        }

        this._startLoadingLayer.setProgress(this._loadGroupCount, this._loadGroupList.length,
            event.itemsLoaded, event.itemsTotal);
    }
}