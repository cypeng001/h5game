class MCPool {
    private static DEF_RELEASE_TIME: number = 60000;
    private static DEF_AUTO_RECYCLE_TIME: number = 5000;

    private _name: string;
    private _actPool: Array<MCAdv> = [];
    private _inactPool: Array<MCAdv> = [];
    private _state: MCPST = MCPST.UNINIT;
    private _mcDataFtry: MCDataFtryAdv = null;
    private _activeTick: number = 0;
    private _recycleTick: number = 0;

    private static getAssets(source: string, callback: Function) {
        var adapter = egret.getImplementation("eui.IAssetAdapter");
        adapter.getAsset(source, function (content) {
            callback(content);
        }, this);
    }

    private static getImagePath(key: string): string {
        var imagePath = RES.config.resourceRoot + "movieclip/" + key + ".png";
        var hash = MCCnfMgr.getInstance().getHash(key);
        if(hash && hash.length > 0) {
            imagePath += ("?v=" + hash);
        }
        return imagePath;
    }

    constructor(name: string) {
        this._name = name;
        this._state = MCPST.UNLOAD;
    }

    public createMC(): MCAdv {
        this._activeTick = egret.getTimer();

        var key = this._name;

        if(!this._mcDataFtry) {
            this._mcDataFtry = new MCDataFtryAdv(MCCnfMgr.getInstance().getMCCnf(key));
        }

        let mc: MCAdv = null;

        if(this._state == MCPST.UNLOAD) {
            this._state = MCPST.LOADING;

            var _this = this;

            var imagePath = MCPool.getImagePath(key);
            MCPool.getAssets(imagePath, (texture) => {
                _this._state = MCPST.LOADED;

                egret.$callAsync(() => {
                    _this.reload(texture);
                }, _this);
            });
        }

        this.autoRecycle();

        if(this._inactPool.length > 0) {
            mc = this._inactPool.pop();
            this._actPool.push(mc);
            return mc;
        }
        
        mc = new MCAdv(this._mcDataFtry.generateMovieClipData(key));
        this._actPool.push(mc);
        return mc;
    }

    private reload(texture: egret.Texture): void {
        this._mcDataFtry.texture = texture;

        for(var i in this._actPool) {
            var mc = this._actPool[i];
            if(mc.mcst == MCST.UNLOAD) {
                mc.mcst = MCST.LOAD;
            }
        }
    }

    public recycle(): void {
        this._recycleTick = egret.getTimer();

        var rmkeys = null;
        for(var i in this._actPool) {
            var mc = this._actPool[i];
            if(!mc.parent) {
                rmkeys = rmkeys ? rmkeys : [];
                rmkeys.push(i);
                this._inactPool.push(mc);
            }
        }
        if(rmkeys) {
            for(var i in rmkeys) {
                this._actPool.splice(rmkeys[i], 1);
            }
        }
    }

    public autoRecycle(): void {
        if(egret.getTimer() - this._recycleTick > MCPool.DEF_AUTO_RECYCLE_TIME) {
            this.recycle();
        }
    }

    public release(): void {
        var imagePath = MCPool.getImagePath(this._name);
        RES.destroyRes(imagePath);

        this._actPool = null;
        this._inactPool = null;
        this._state = MCPST.UNINIT;
    }

    public isInactive(): boolean {
        return this._actPool.length == 0
            && (egret.getTimer() - this._activeTick) > MCPool.DEF_RELEASE_TIME;
    }

    public profile(): void {
        console.log("MCPool:" + this._name 
            + " act:" + this._actPool.length 
            + " inact:" + this._inactPool.length);
    }
}

class MCFtry {
    private static _instance: MCFtry = null;
    
    public static getInstance(): MCFtry {
        if(!this._instance)
        {
            this._instance = new MCFtry();
        }
        return this._instance;
    }

    private _poolMap = egret.createMap<MCPool>();

    public constructor() {
    
    }

    public createMC(key: string): MCAdv {
        var pool = this._poolMap[key];
        if(!pool) {
            this._poolMap[key] = pool = new MCPool(key);
        }
        return pool.createMC();
    }

    public recycle(): void {
        for(var key in this._poolMap) {
            var pool = this._poolMap[key];
            pool.recycle();
        }
    }

    public releaseInactPool(): void {
        var rmkeys = null;
        var key = null;
        for(key in this._poolMap) {
            var pool = this._poolMap[key];
            if(pool.isInactive()) {
                rmkeys = rmkeys ? rmkeys : [];
                rmkeys.push(key);
            }
        }
        if(rmkeys) {
            for(var k in rmkeys) {
                key = rmkeys[k];
                var pool = this._poolMap[key];
                pool.release();
                delete this._poolMap[key];
            }
        }
    }

    public profile(): void {
        var total = 0;
        for(var key in this._poolMap) {
             var pool = this._poolMap[key];
             pool.profile();
             total++;
        }
        console.log("MCFtry total:", total);
    }
}