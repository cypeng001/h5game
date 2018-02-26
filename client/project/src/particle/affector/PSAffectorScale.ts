class PSAffectorScale extends PSAffector {
    private static DEF_ATTR = {
        X_SCALE : 64,
        Y_SCALE : 64,
        Z_SCALE : 64,
        SIZE_SCALE : 64,
        FIXED : false,
    }

    protected _dynScaleX: PSDynAttr;
    protected _dynScaleY: PSDynAttr;
    protected _dynScaleZ: PSDynAttr;
    protected _dynScaleSize: PSDynAttr;

    protected _fixed: boolean = PSAffectorScale.DEF_ATTR.FIXED;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setDynScaleX(dynScaleX: PSDynAttr): void {
        this._dynScaleX = dynScaleX;
    }

    public setDynScaleY(dynScaleY: PSDynAttr): void {
        this._dynScaleY = dynScaleY;
    }

    public setDynScaleZ(dynScaleZ: PSDynAttr): void {
        this._dynScaleZ = dynScaleZ;
    }

    public setDynScaleSize(dynScaleSize: PSDynAttr): void {
        this._dynScaleSize = dynScaleSize;
    }

    public setFixed(fixed: boolean): void {
        this._fixed = fixed;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var ds = 0;
        var dimension = 0;
        if (particle.timeLive < timeElapsed) {
            timeElapsed = particle.timeLive;
        }

        var percent = (particle.totalLive - particle.timeLive) / particle.totalLive;

        if (this._dynScaleSize) {
            if (!this._fixed) {
                ds = PSUtil.calcDynAttr(this._dynScaleSize, 
                    percent, 
                    PSAffectorScale.DEF_ATTR.SIZE_SCALE) * timeElapsed;
                particle.width = particle.width + ds;
                particle.height = particle.height + ds;
                particle.depth = particle.depth + ds;
            }
            else {
                dimension = PSUtil.calcDynAttr(this._dynScaleSize, 
                    percent, 
                    PSAffectorScale.DEF_ATTR.SIZE_SCALE);
                particle.width = dimension;
                particle.height = dimension;
                particle.depth = dimension;
            }
        }
        else {
            if (this._dynScaleX) {
                if (!this._fixed) {
                    ds = PSUtil.calcDynAttr(this._dynScaleX, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.X_SCALE) * timeElapsed;
                    particle.width = particle.width + ds;
                }
                else {
                    particle.width = PSUtil.calcDynAttr(this._dynScaleX, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.X_SCALE);
                }
            }

            if (this._dynScaleY) {
                if (!this._fixed) {
                    ds = PSUtil.calcDynAttr(this._dynScaleY, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.Y_SCALE) * timeElapsed;
                    particle.height = particle.height + ds;
                }
                else {
                    particle.height = PSUtil.calcDynAttr(this._dynScaleY, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.Y_SCALE);
                }
            }

            if (this._dynScaleZ) {
                if (!this._fixed) {
                    ds = PSUtil.calcDynAttr(this._dynScaleZ, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.Z_SCALE) * timeElapsed;
                    particle.depth = particle.depth + ds;
                }
                else {
                    particle.depth = PSUtil.calcDynAttr(this._dynScaleZ, 
                        percent, 
                        PSAffectorScale.DEF_ATTR.Z_SCALE);
                }
            }
        }

        if (particle.width < 0) {
            particle.width = 0;
        }
        if (particle.height < 0) {
            particle.height = 0;
        }
        if (particle.depth < 0) {
            particle.depth = 0;
        }
    }
}