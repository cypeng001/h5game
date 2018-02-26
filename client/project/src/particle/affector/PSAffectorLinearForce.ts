class PSAffectorLinearForce extends PSAffector {
    protected static DEF_ATTR = {
        FORCE: 100,
    };

    protected static ForceApp = {
		AVERAGE: 0,
		ADD: 1
	};

    protected _forceVector: PSVec3 = [0, -1, 0];
    protected _forceApp: number = PSAffectorLinearForce.ForceApp.ADD;
    protected _dynForce: PSDynAttr;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setForceVector(forceVector: PSVec3): void {
        PSVec3Util.copy(forceVector, this._forceVector);
        PSVec3Util.normalize(this._forceVector);
    }

    public setForceApp(forceApp: number): void {
        this._forceApp = forceApp;
    }

    public setDynForce(dynForce: PSDynAttr): void {
        this._dynForce = dynForce;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var percent = particle.timeFactor;

        var vecTmp = PSVec3Ftry.getInstance().create(1, 1, 1);

        PSVec3Util.multiply(this._forceVector, 
            PSUtil.calcDynAttr(this._dynForce, percent, PSAffectorLinearForce.DEF_ATTR.FORCE), 
            vecTmp);

        if (this._forceApp == PSAffectorLinearForce.ForceApp.ADD) {
            PSVec3Util.multiply(vecTmp, timeElapsed, vecTmp);
            PSVec3Util.add(particle.direction, vecTmp, particle.direction);
        }
        else {
            PSVec3Util.add(particle.direction, vecTmp, vecTmp);
            PSVec3Util.multiply(vecTmp, 0.5, particle.direction);
        }

        PSVec3Ftry.getInstance().release(vecTmp);
    }
}