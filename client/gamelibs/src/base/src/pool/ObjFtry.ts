namespace h5game
{

export class ObjFtry {
    protected _poolMap = {};

    public constructor() {
    
    }

    public createPool(key: string): any {
        return new ObjPool(key);
    }

    public getPool(key: string): any {
        return this._poolMap[key];
    }

    public create(key: string, params: any = null): any {
        var pool = this._poolMap[key];
        if(!pool) {
            this._poolMap[key] = pool = this.createPool(key);
        }
        return pool.create(key, params);
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
            if(pool.canRelease()) {
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
        console.log("ObjFtry total:", total);
    }
}

}