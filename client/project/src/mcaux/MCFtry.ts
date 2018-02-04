class MCPool {
    private _actPool: Array<MovieClipAdv> = [];
    private _inactPool: Array<MovieClipAdv> = [];
    private _state: MCPST = MCPST.UNINIT;
    private _mcDataFtry: egret.MovieClipDataFactory = null;

    public createMC(key: string): MovieClipAdv {
        //todo:
        var data = RES.getRes("movieclip_" + key + "_json");
        var txtr = RES.getRes("movieclip_" + key + "_png");
        this._mcDataFtry = new egret.MovieClipDataFactory(data, txtr);
        return new MovieClipAdv(this._mcDataFtry.generateMovieClipData(key));
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

    public createMC(key: string): MovieClipAdv {
        var pool = this._poolMap[key];
        if(!pool) {
            this._poolMap[key] = pool = new MCPool();
        }
        return pool.createMC(key);
    }

}