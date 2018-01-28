//loading场景类
class LoadingScene extends Scene
{
    private _loadingBg: egret.Bitmap;
    private _loadingLayer: LoadingLayer;
    private _loadGroupList: string[] = [];
    private _loadGroupCount: number = 0;
    private _loadFileList: string[] = [];
    private _loadFileCount: number = 0;
    private _context_data: any = null;

    public constructor()
    {
        super();
    }

    public getSceneType(): number
    {
        return SceneType.ST_LoadingScene;
    }

    //override
    public onEnter(): void
    {
        super.onEnter();

        this._loadingBg = new egret.Bitmap(RES.getRes("loading_bg"));
        this.addChild( this._loadingBg );

        this._loadingLayer = new LoadingLayer();
        this.addChild(this._loadingLayer);
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

    public load(groupList: string[], fileList: string[], context_data: any): void
    {
        this._loadGroupList = groupList;
        this._loadGroupCount = 0;

        this._loadFileList = fileList;
        this._loadFileCount = 0;

        this._context_data = context_data;

        if(groupList.length == 0 && fileList.length == 0)
        {
            this.loadComplete();
            return;
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        console.info("LoadingScene_startLoad1");
        for(var i in this._loadGroupList)
        {
            var group = this._loadGroupList[i];
            console.info("LoadingScene_startLoad2:" + group);
            RES.loadGroup(group);
        }
        
        for(var i in this._loadFileList)
        {
            var fileName = this._loadFileList[i];
            RES.getResAsync(fileName, this.onFileLoaded, this);
        }
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
        console.info("LoadingScene_onResourceLoadComplete1", event.groupName)
        if(this.isLoadGroup(event.groupName))
        {
            this._loadGroupCount++;
        }
        else
        {
            console.error("LoadingScene_onResourceLoadComplete invalid groupName");
            return;
        }

        console.info("LoadingScene_onResourceLoadComplete2", this._loadGroupCount, this._loadGroupList.length);
        if(this._loadGroupCount == this._loadGroupList.length)
        {
            console.info("LoadingScene_onResourceLoadComplete2");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            if(this._loadFileCount == this._loadFileList.length)
            {
                this.loadComplete();
            }
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
            console.error("LoadingScene_onResourceProgress invalid groupName");
            return;
        }

        this._loadingLayer.setProgress(this._loadGroupCount, this._loadGroupList.length,
            event.itemsLoaded, event.itemsTotal);
    }

    private onFileLoaded(res: any, name: string):void
    {
        //todo:资源下载失败处理
        if (res)
        {
            this._loadFileCount++;

            if(this._loadFileCount == this._loadFileList.length
                && this._loadGroupCount == this._loadGroupList.length)
            {
                this.loadComplete();
            }
        }
    }

    private loadComplete(): void
    {
        this.dispatchEventWith(GameEvents.EVT_LOAD_COMPLETE, false, this._context_data);
    }
}