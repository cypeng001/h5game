namespace h5game
{

export class MCPool extends h5game.ObjPool {
    private static DEF_RELEASE_TIME: number = 60000;
    private static DEF_AUTO_RECYCLE_INTERVAL: number = 5000;

    private _state: MCPST = MCPST.UNINIT;
    private _mcDataFtry: MCDataFtryAdv = null;
    private _mcCnfMgr: MCCnfMgr = null;

    private static getAssets(source: string, callback: Function) {
        var adapter = egret.getImplementation("eui.IAssetAdapter");
        adapter.getAsset(source, function (content) {
            callback(content);
        }, this);
    }

    private getImagePath(key: string): string {
        var imagePath = RES.config.resourceRoot + "movieclip/" + key + ".png";
        var hash = this._mcCnfMgr.getHash(key);
        if(hash && hash.length > 0) {
            imagePath += ("?v=" + hash);
        }
        return imagePath;
    }

    constructor(name: string, mcCnfMgr: MCCnfMgr) {
        super(name);
        this._mcCnfMgr = mcCnfMgr;
        this._autoRecycleInterval = MCPool.DEF_AUTO_RECYCLE_INTERVAL;
        this._state = MCPST.UNLOAD;
    }

    protected createObj(key: string): any {
        return new MCAdv(this._mcDataFtry.generateMovieClipData(key));
    }

    private reload(texture: egret.Texture): void {
        this._mcDataFtry.texture = texture;

        for(var i in this._actPool) {
            var mc: MCAdv = <MCAdv>this._actPool[i];
            if(mc.mcst == MCST.UNLOAD) {
                mc.mcst = MCST.LOAD;
            }
        }
    }

    public create(key: string): any {
        this._lastActiveTick = egret.getTimer();

        if(!this._mcDataFtry) {
            this._mcDataFtry = new MCDataFtryAdv(this._mcCnfMgr.getMCCnf(key));
        }

        if(this._state == MCPST.UNLOAD) {
            this._state = MCPST.LOADING;

            var self = this;

            var imagePath = this.getImagePath(key);
            MCPool.getAssets(imagePath, (texture) => {
                self._state = MCPST.LOADED;

                egret.callLater(() => {
                    self.reload(texture);
                }, self);
            });   
        }

        return super.create(key);
    }

    public release(): void {
        super.release();

        var imagePath = this.getImagePath(this._name);
        RES.destroyRes(imagePath);

        this._mcDataFtry = null;
        this._mcCnfMgr = null;
    }

    public canRelease(): boolean {
        return this._actPool.length == 0
            && (egret.getTimer() - this._lastActiveTick) > MCPool.DEF_RELEASE_TIME;
    }
}

}