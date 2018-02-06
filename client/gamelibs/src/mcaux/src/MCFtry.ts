namespace h5game
{

export class MCFtry extends h5game.ObjFtry {
    private _init: boolean = false;
    private _mcCnfMgr: MCCnfMgr = null;

    public init(): void {
        if(this._init) {
            console.warn("MCFtry already init");
            return;
        }
        this._init = true;

        this._mcCnfMgr = new MCCnfMgr;
        this._mcCnfMgr.init();
    }

    public createPool(key: string): any {
        return new MCPool(key, this._mcCnfMgr);
    }
}

}