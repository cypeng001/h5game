class PSAffectorSuction extends PSAffector {
    public static DEF_ATTR = {
        SUCTION: 64,
    };

    public static SuctionType = {
        DIR: 0,
        POS: 1,
    };

    protected static DEF_SUCTION_RANGE: number = 64;

    protected _suctionPos: PSVec3 = [0, 0, 0];
    protected _collideVisible: boolean = false;
    protected _dynSuction: PSDynAttr;

    protected _derivedPos: PSVec3 = [0, 0, 0];
    protected _suctionType: number = PSAffectorSuction.SuctionType.POS;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setCollideVisible(collideVisible: boolean): void {
        this._collideVisible = collideVisible;
    }

	public setSuctionPos(suctionPos: PSVec3): void {
        PSVec3Util.copy(suctionPos, this._suctionPos);
    }

    public setDynSuction(dynSuction: PSDynAttr): void {
        this._dynSuction = dynSuction;
    }

	public setSuctionType(suctionType: number): void {
        this._suctionType = suctionType;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var percent = particle.timeFactor;

        var force = PSUtil.calcDynAttr(this._dynSuction, percent, PSAffectorSuction.DEF_ATTR.SUCTION);
        var dirTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
        PSVec3Util.sub(this._suctionPos, particle.position, dirTmp);
        var len = PSVec3Util.len(dirTmp);
        PSVec3Util.normalize(dirTmp);
        if (percent <= this._endTime && percent >= this._startTime 
            && len < PSAffectorSuction.DEF_SUCTION_RANGE 
            && !this._collideVisible) {
            particle.timeLive = -1;
            return;
        }

        PSVec3Util.multiply(dirTmp, force * timeElapsed, dirTmp);

        if (this._suctionType == PSAffectorSuction.SuctionType.DIR) {
            PSVec3Util.add(particle.direction, dirTmp, particle.direction);
        }
        else {
            PSVec3Util.add(particle.position ,dirTmp, particle.position);
        }

        PSVec3Ftry.getInstance().release(dirTmp);
    }
}