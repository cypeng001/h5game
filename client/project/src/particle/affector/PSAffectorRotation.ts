class PSAffectorRotation extends PSAffector {
    protected _dynStartAngle: PSDynAttr;
    protected _dynSpeed: PSDynAttr;
    
    protected _speed: number = 0;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setDynStartAngle(dynStartAngle: PSDynAttr): void {
        this._dynStartAngle = dynStartAngle;
    }

    public setDynSpeed(dynSpeed: PSDynAttr): void {
        this._dynSpeed = dynSpeed;

        if(this._dynSpeed && this._dynSpeed.getType() != PSDynAttrType.CURVED) {
            var t = this.getCycleTimeFactor();
            this._speed = PSUtil.calcDynAttr(this._dynSpeed, t, 0);
        }
    }

    public initParticle(particle: PSParticle): void {
        var percent = particle.timeFactor;
        particle.angle = PSUtil.calcDynAttr(this._dynStartAngle, percent, 0);
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var maxAngle = 0;
        var minAngle = 0;
        if(this._dynStartAngle) {
            maxAngle = this._dynStartAngle.getMaxValue();
	        minAngle = this._dynStartAngle.getMinValue();
        }

	    var percent = particle.timeFactor;
        
        if(this._dynSpeed) {
            if(this._dynSpeed.getType() == PSDynAttrType.CURVED) {
                particle.angle += PSUtil.calcDynAttr(this._dynSpeed, percent, 10) * timeElapsed;
                if(this._dynSpeed.getMaxValue() > 0) {
                    maxAngle += this._dynSpeed.getMaxValue() * particle.totalLive; 
                }

                if(this._dynSpeed.getMinValue() < 0) {
                    minAngle += this._dynSpeed.getMinValue() * particle.totalLive;
                }
            }
            else if(this._dynSpeed.getType() == PSDynAttrType.RANDOM) {
                particle.angle += particle.rotationRandomValue * timeElapsed;
                if (particle.rotationRandomValue > 0) {
                    maxAngle += particle.rotationRandomValue * particle.totalLive;
                }
                else {
                    minAngle += particle.rotationRandomValue * particle.totalLive;
                }
            }
            else {
                particle.angle += this._speed * timeElapsed;

                if(this._speed > 0) {
                    maxAngle += this._speed * particle.totalLive;
                }
                else {
                    minAngle += this._speed * particle.totalLive;
                }
            }
        }

        if(particle.liveForever) {
            if(particle.angle < minAngle) {
                if(minAngle != 0) {
                    particle.angle = Math.floor(particle.angle) % Math.floor(minAngle);
                } else {
                    particle.angle = minAngle;
                }
            }

            if(particle.angle > maxAngle) {
                if(maxAngle != 0) {
                    particle.angle = Math.floor(particle.angle) % Math.floor(maxAngle);
                } else {
                    particle.angle = maxAngle;
                }
            }
        }
        else
        {
            if(particle.angle < minAngle && !particle.liveForever) {
                particle.angle = minAngle;
            }

            if(particle.angle > maxAngle && !particle.liveForever) {
                particle.angle = maxAngle;
            }
        }
    }
}