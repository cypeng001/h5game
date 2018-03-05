class PSAffectorRandomiser extends PSAffector {
    protected _randomDirection: boolean = true;
    protected _maxDeviation: PSVec3 = [1, 1, 1];
    protected _randomRange: number = 100;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setRandomDirection(randomDirection: boolean): void {
        this._randomDirection = randomDirection;
    }

    public setMaxDeviation(maxDeviation: PSVec3): void {
        PSVec3Util.copy(maxDeviation, this._maxDeviation);
    }

    public setMaxDeviationX(x: number): void {
        this._maxDeviation[0] = x;
    }

    public setMaxDeviationY(y: number): void {
        this._maxDeviation[1] = y;
    }

    public setMaxDeviationZ(z: number): void {
        this._maxDeviation[2] = z;
    }

    public setRandomRange(randomRange: number): void {
        this._randomRange = randomRange;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var x = PSUtil.randInRangeFloat(-this._maxDeviation[0], this._maxDeviation[0]) 
            * this._technique.getDefaultWidth();
        var y = PSUtil.randInRangeFloat(-this._maxDeviation[1], this._maxDeviation[1]) 
            * this._technique.getDefaultHeight();

        var vecTmp = PSVec3Ftry.getInstance().create(x * timeElapsed * this._randomRange,
            y * timeElapsed * this._randomRange,
            0);

        if (this._randomDirection) {
            PSVec3Util.add(particle.direction, vecTmp, particle.direction);
        }
        else {
            PSVec3Util.add(particle.position, vecTmp, particle.position);
        }

        PSVec3Ftry.getInstance().release(vecTmp);
    }
}