class ObjPool {
    protected _name: string;
    protected _actPool = [];
    protected _inactPool = [];
    protected _lastActiveTick: number = 0;
    protected _lastRecycleTick: number = 0;
    protected _autoRecycleInterval: number = 60000;

    constructor(name: string) {
        this._name = name;
    }

    protected createObj(key: string): any {
        return {};
    }

    protected recycleObj(obj: any) {

    }

    protected releaseObj(obj: any) {
        
    }

    protected canRecycleObj(obj): any {
        return false;
    }

    public create(key: string): any {
        var obj = null;

        this.autoRecycle();

        if(this._inactPool.length > 0) {
            obj = this._inactPool.pop();
            this._actPool.push(obj);
            return obj;
        }
        
        obj = this.createObj(key);
        this._actPool.push(obj);

        this._lastActiveTick = egret.getTimer();

        return obj;
    }

    public recycle(): void {
        var rmkeys = null;
        for(var i in this._actPool) {
            var obj = this._actPool[i];
            if(this.canRecycleObj(obj)) {
                rmkeys = rmkeys ? rmkeys : [];
                rmkeys.push(i);
                this._inactPool.push(obj);
                this.recycleObj(obj);
            }
        }
        if(rmkeys) {
            for(var i in rmkeys) {
                this._actPool.splice(rmkeys[i], 1);
            }
        }

        this._lastRecycleTick = egret.getTimer();
    }

    protected autoRecycle(): void {
        if(egret.getTimer() - this._lastRecycleTick > this._autoRecycleInterval) {
            this.recycle();
        }
    }

    public release(): void {
        var key, obj;
        for(key in this._actPool) {
            obj = this._actPool[key];
            this.releaseObj(obj);
        }
        for(key in this._inactPool) {
            obj = this._inactPool[key];
            this.releaseObj(obj);
        }
        this._actPool = null;
        this._inactPool = null;
    }

    public canRelease(): boolean {
        return this._actPool.length == 0;
    }

    public profile(): void {
        console.log("ObjPool:" + this._name 
            + " act:" + this._actPool.length 
            + " inact:" + this._inactPool.length);
    }
}

class ObjFtry {
    protected _poolMap = {};

    public constructor() {
    
    }

    public createPool(key: string): any {
        return new ObjPool(key);
    }

    public create(key: string): any {
        var pool = this._poolMap[key];
        if(!pool) {
            this._poolMap[key] = pool = this.createPool(key);
        }
        return pool.create(key);
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