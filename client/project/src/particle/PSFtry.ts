class PSFtry implements h5game.IPSFtry {
    private _init: boolean = false;
    private _psCnfMgr: PSCnfMgr = null;

    public init(): void {
        if(this._init) {
            console.warn("MCFtry already init");
            return;
        }
        this._init = true;

        this._psCnfMgr = new PSCnfMgr;
        this._psCnfMgr.init();
    }

    public create(name: string): PSParticleSystem {
        var cnf = this._psCnfMgr.getConfig(name);
        return PSParserJson.parse(cnf);
    }
}