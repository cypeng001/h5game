class PSAffectorElasticity extends PSAffector {
    private static DEF_ATTR = {
        "REVERSE_LIMIT": 32,
        "DISTANCE_FACTOR": 0.0075,
        "TIME_START": 0.4,
        "REVERSE_FACTOR": 0.95,
        "OFFSET_RADIUS": 48,
    }

    protected _reverseLimit: number = PSAffectorElasticity.DEF_ATTR.REVERSE_LIMIT;
	protected _distanceFactor: number = PSAffectorElasticity.DEF_ATTR.DISTANCE_FACTOR;
	protected _timeStart: number = PSAffectorElasticity.DEF_ATTR.TIME_START;
	protected _reverseFactor: number = PSAffectorElasticity.DEF_ATTR.REVERSE_FACTOR;
	protected _offsetRadius: number = PSAffectorElasticity.DEF_ATTR.OFFSET_RADIUS;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setDistanceFactor(distanceFactor: number): void {
        this._distanceFactor = distanceFactor;
    }

    public setReverseLimit(reverseLimit: number): void {
        this._reverseLimit = reverseLimit;
    }

    public setTimeStart(timeStart: number): void {
        this._timeStart = timeStart;
    }

    public setReverseFactor(reverseFactor: number): void {
        this._reverseFactor = reverseFactor;
    }

    public setOffsetRadius(offsetRadius: number): void {
        this._offsetRadius = offsetRadius;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        if ((particle.totalLive - particle.timeLive) < this._timeStart) {
            return;
        }

        var diffTmp = PSVec3Ftry.getInstance().create(-particle.position[0], 
            -particle.position[1], 
            -particle.position[2]);

        var offsetTmp = PSVec3Ftry.getInstance().create(PSUtil.randInRangeFloat(-1, 1), 
            PSUtil.randInRangeFloat(-1, 1), 
            PSUtil.randInRangeFloat(-1, 1));

        PSVec3Util.multiply(offsetTmp, this._offsetRadius, offsetTmp);

        PSVec3Util.add(diffTmp, offsetTmp, diffTmp);

        var distance = PSVec3Util.len(diffTmp);
        PSVec3Util.normalize(diffTmp);

        var speed = this._distanceFactor * distance * distance;
        var l = PSVec3Util.len(particle.direction);

        var k = PSVec3Util.dot(particle.direction, diffTmp);
        if (l > this._reverseLimit && k <= 0) {
            PSVec3Util.multiply(particle.direction, this._reverseFactor, particle.direction);
        }

        PSVec3Util.multiply(diffTmp, speed * timeElapsed, diffTmp);

        PSVec3Util.add(particle.direction, diffTmp, particle.direction);

        PSVec3Ftry.getInstance().release(diffTmp);
        PSVec3Ftry.getInstance().release(offsetTmp);
    }
}