namespace h5game
{

export class MCPool extends ObjPool {
    private static DEF_RELEASE_TIME: number = 60000;
    private static DEF_AUTO_RECYCLE_INTERVAL: number = 5000;

    private _state: MCPST = MCPST.UNINIT;
    private _mcDataFtrys: {[key: string]: MCDataFtryAdv} = null;
    private _mcDataCnt: number = 0;
    private _mcCnfMgr: MCCnfMgr = null;
    private _loadFileCnt: number = 0;

    private static getAssets(source: string, callback: Function) {
        var adapter = egret.getImplementation("eui.IAssetAdapter");
        adapter.getAsset(source, function (content) {
            callback(content);
        }, this);
    }

    private getImagePath(key: string): string {
        return RES.config.resourceRoot + "movieclip/" + key + ".png";
    }

    constructor(name: string, mcCnfMgr: MCCnfMgr) {
        super(name);
        this._mcCnfMgr = mcCnfMgr;
        this._autoRecycleInterval = MCPool.DEF_AUTO_RECYCLE_INTERVAL;
        this._state = MCPST.UNLOAD;
    }

    protected createObj(key: string, params: any): any {
        var mcData: egret.MovieClipData = null;
        if(this.getMCDataCnt() == 1) {
            mcData = this._mcDataFtrys[key].generateMovieClipData(key);
        }
        return new MCAdv(mcData, key, this);
    }

    protected recycleObj(obj: any) {
        var mc: MCAdv = <MCAdv>obj;
        mc.clearEventListener();
    }

    protected releaseObj(obj: any) {
        var mc: MCAdv = <MCAdv>obj;
        mc.clearEventListener();
    }

    private reload(filename, texture: egret.Texture): void {
        this._mcDataFtrys[filename].texture = texture;
    }

    public create(key: string, params: any = null): any {
        this._lastActiveTick = egret.getTimer();

        var filelist = this._mcCnfMgr.getFilelist(key);
        if(!this._mcDataFtrys) {
            this._mcDataFtrys = {};
            for(var i in filelist) {
                var filename = filelist[i];
                this._mcDataFtrys[filename] = new MCDataFtryAdv(this._mcCnfMgr.getMCCnf(filename));
                this._mcDataCnt++;
            }
        }

        if(this._state == MCPST.UNLOAD) {
            this._state = MCPST.LOADING;

            this.loadNext();
        }

        return super.create(key, params);
    }

    private loadNext(): void {
        var key = this._name;
        var filelist = this._mcCnfMgr.getFilelist(key);
        var filename = filelist[this._loadFileCnt];
        var imagePath = this.getImagePath(filelist[this._loadFileCnt]);
        var hash = this._mcCnfMgr.getHash(key);
        if(hash && hash.length > 0) {
            imagePath += ("?v=" + hash);
        }

        var self = this;
        MCPool.getAssets(imagePath, (texture) => {
            egret.callLater(() => {
                self._loadFileCnt++;

                self.reload(filename, texture);

                if(self._loadFileCnt == filelist.length) {
                    self.loadComplete();
                } else {
                    self.loadNext();
                }
            }, self);
        });
    }

    private loadComplete(): void {
        this._state = MCPST.LOADED;

        for(var i in this._actPool) {
            var mc: MCAdv = <MCAdv>this._actPool[i];
            if(mc.mcst == MCST.UNLOAD) {
                mc.mcst = MCST.LOAD;
            }
        }
    }

    public release(): void {
        super.release();

        var filelist = this._mcCnfMgr.getFilelist(this._name);
        for(var i in filelist) {
            var filename = filelist[i];
            var imagePath = this.getImagePath(filename);
            RES.destroyRes(imagePath);
        }

        this._mcDataFtrys = null;
        this._mcCnfMgr = null;
    }

    public canRelease(): boolean {
        return this._actPool.length == 0
            && (egret.getTimer() - this._lastActiveTick) > MCPool.DEF_RELEASE_TIME;
    }

    public getMCDataCnt(): number {
        return this._mcDataCnt;
    }

    public createMovieClipData(key: string): egret.MovieClipData {
        return this._mcDataFtrys[key].generateMovieClipData(key);
    }
}

}