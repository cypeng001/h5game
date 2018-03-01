class PSAffectorDeflector extends PSAffector {
    public static DEF_ATTR = {
        BOUNCE: 1,
    };

    protected _planePoint: PSVec3 = [0, 0, 0];
    protected _planeNormal: PSVec3 = [0, -1, 0];
    protected _normal: PSVec3 = [0, -1, 0];
    protected _dynBounce: PSDynAttr;
    protected _distance: number = 0;
    protected _distanceDirty: boolean = true;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setDynBounce(dynBounce: PSDynAttr): void {
        this._dynBounce = dynBounce;
    }

    public setPlanePoint(planePoint: PSVec3): void {
        PSVec3Util.copy(planePoint, this._planePoint);
        this._distanceDirty = true;
    }

    public setPlaneNormal(planeNormal: PSVec3): void {
        PSVec3Util.copy(planeNormal, this._planeNormal);
        PSVec3Util.copy(this._planeNormal, this._normal);
        PSVec3Util.normalize(this._normal);
        this._distanceDirty = true;
    }

    protected updateDistance(): void {
        if(!this._distanceDirty) {
            return;
        }
        this._distanceDirty = false;

        this._distance =  - PSVec3Util.dot(this._planeNormal, this._planePoint) 
            / PSVec3Util.len(this._planeNormal);
    }


    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        this.updateDistance();

        var percent = (particle.totalLive - particle.timeLive) / particle.totalLive;
        var bounce = PSUtil.calcDynAttr(this._dynBounce, percent, PSAffectorDeflector.DEF_ATTR.BOUNCE);

        var posTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
        PSVec3Util.copy(particle.position, posTmp);

        var dirTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
        PSVec3Util.copy(particle.direction, dirTmp);

        PSVec3Util.multiply(dirTmp, timeElapsed, dirTmp);
 
        var b = PSVec3Util.dot(this._normal, dirTmp);
        var curr_direct = PSVec3Util.dot(this._normal, dirTmp);
        var dot_value = PSVec3Util.dot(posTmp, this._normal) + this._distance;
        if (curr_direct < -0.000001 && (dot_value + b) < 0.000001) {
            var a = this._normal[0];
            var b = this._normal[1];
            var e = a * this._planePoint[0] + b * this._planePoint[1];

            var c = -dirTmp[1];
            var d = dirTmp[0];
            var f = c * posTmp[0] + d * posTmp[1];
            var flag = c * b - a * d;
            if (flag >= 0.000001 || flag <= -0.000001) {
                particle.position[0] = (b * f - d * e) / (c * b - a * d);
                particle.position[1] = (c * e - a * f) / (c * b - a * d);

                var d = PSVec3Util.dot(particle.direction, this._normal) * 2;
                PSVec3Util.multiply(this._normal, d, dirTmp);
                PSVec3Util.sub(particle.direction, dirTmp, particle.direction);
                PSVec3Util.multiply(particle.direction, bounce, particle.direction);
            }
        }

        PSVec3Ftry.getInstance().release(posTmp);
        PSVec3Ftry.getInstance().release(dirTmp);
	
    }
}