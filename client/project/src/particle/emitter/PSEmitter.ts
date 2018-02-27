class PSEmitter extends PSParticle {
    protected static DEF_ATTR = {
        WIDTH: 64,
        HEIGHT: 64,
        DEPTH: 64,
        SIZE: 64,
        POSITION: [0, 0, 0],
        DIRECTION: [1, 0, 0],
        VELOCITY: 30,
        TIME_LIVE: 3,
        EMISSION_RATE: 10,
        FORCE_EMIT: false,
        PARTICLES_LIVE_FOREVER: false,
        COLOR: [1, 1, 1, 1],
        ANGLE: 20,
        CYCLE: true,
    }

    public id: number = 0;

    protected _name: string = "";
    protected _dir: PSVec3 = [1, 0, 0];
    protected _up: PSVec3 = [0, 1, 0];
    protected _relativePos: PSVec3 = [0, 0, 0];
    protected _emissionRate: number = 10;
    protected _startTime: number = 0;
    protected _endTime: number = 0;
    protected _cycle: boolean = true;
    protected _forceEmit: boolean = false;
    protected _liveForever: boolean = false;
    protected _remainder: number = 0;
    protected _emitterTime: number = 0;
    protected _startColor: PSColor4F = [1, 1, 1, 1];
    protected _endColor: PSColor4F = [1, 1, 1, 1];

    protected _enable: boolean = true;
    protected _lastCount: number = 0;

    protected _dynLiveTime: PSDynAttr;
    protected _dynAngle: PSDynAttr;
    protected _dynWidth: PSDynAttr;
    protected _dynHeight: PSDynAttr;
    protected _dynDepth: PSDynAttr;
    protected _dynSize: PSDynAttr;
    protected _dynAllXYZ: PSDynAttr;
    protected _dynVelocity: PSDynAttr;

	protected _technique: PSTechnique;

    protected _totalTimeLast: number = 0;
    protected _totalTime: number = 0;
    protected _totalCount: number = 0;

    constructor(technique: PSTechnique) {
        super();

        this._technique = technique;

        this._endTime = this._technique.getCycleTotalTime();
    }

    protected getCycleTimeFactor(): number {
        return this._technique.getCycleTimeFactor();
    }
    
	public setName(name: string): void {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public setCycleTime(startTime: number, endTime: number): void {
        this._startTime = startTime;
        this._endTime = endTime;
    }

    public setCycle(cycle: boolean): void {
        this._cycle = cycle;
    }

    public setForceEmit(forceEmit: boolean): void {
        this._forceEmit = forceEmit;
    }

    public setLiveForever(liveForever: boolean): void {
        this._liveForever = liveForever;
    }

    public setDynLiveTime(dynLiveTime: PSDynAttr): void {
        this._dynLiveTime = dynLiveTime;
    }

    public setDynAngle(dynAngle: PSDynAttr): void {
        this._dynAngle = dynAngle;
    }

    public setDynWidth(dynWidth: PSDynAttr): void {
        this._dynWidth = dynWidth;
    }

    public setDynHeight(dynHeight: PSDynAttr): void {
        this._dynHeight = dynHeight;
    }

    public setDynDepth(dynDepth: PSDynAttr): void {
        this._dynDepth = dynDepth;
    }

    public setDynSize(dynSize: PSDynAttr): void {
        this._dynSize = dynSize;
    }

    public setDynVelocity(dynVelocity: PSDynAttr): void {
        this._dynVelocity = dynVelocity;
    }

    public setPosition(position: PSVec3): void {
        PSVec3Util.copy(position, this._relativePos);
    }

    public setDirection(direction: PSVec3): void {
        PSVec3Util.copy(direction, this._dir);
        PSVec3Util.normalize(this._dir);
        PSVec3Util.perpendicular(this._dir, this._up);
    }

    public setEnable(enable: boolean): void {
        this._enable = enable;
    }

    public isEnable(): boolean {
        return this._enable;
    }

    public getLastCount(): number {
        return this._lastCount;
    }

    public initParticle(particle: PSParticle): void {
        particle.emitter = this;
        particle.liveForever = this._liveForever;
        particle.left = 0;
        particle.top = 0;
        particle.right = 1;
        particle.bottom = 1;
        //particle.index = -1;
        this.initParticlePos(particle);
        this.initParticleDirection(particle);
        this.initParticleSpeed(particle);
        this.initParticleColor(particle);
        this.initParticleLiveTime(particle);
        this.initParticleDimensions(particle);
    }

    protected initParticlePos(particle: PSParticle): void {
        particle.position = PSVec3Util.copy(this._relativePos, particle.position);
    }

    protected initParticleColor(particle: PSParticle): void {
		PSColor4FUtil.copy(this._startColor, particle.color);
    }

    protected initParticleSpeed(particle: PSParticle): void {
		var t = this.getCycleTimeFactor();
		var velocity = PSUtil.calcDynAttr(this._dynVelocity, t, 0);
		PSVec3Util.multiply(particle.direction, velocity, particle.direction);
    }

    protected generateAngle(): number {
        var t =  this._technique.getCycleTimeFactor();
        return PSUtil.calcDynAttr(this._dynAngle, t, PSEmitter.DEF_ATTR.ANGLE);
    }

    protected initParticleDirection(particle: PSParticle): void {
        var angle = this.generateAngle() * Math.random();
        if (angle != 0.0) {
            PSVec3Util.copy(PSVec3_UNIT_X, particle.direction);
            PSVec3Util.rotate(this._dir, particle.direction, angle);
        }
        else {
            PSVec3Util.copy(this._dir, particle.direction);
        }
    }

    protected initParticleLiveTime(particle: PSParticle): void {
        var t = this.getCycleTimeFactor();

        particle.timeLive = particle.totalLive 
            = PSUtil.calcDynAttr(this._dynLiveTime, t, PSEmitter.DEF_ATTR.TIME_LIVE);
    }

    protected initParticleDimensions(particle: PSParticle): void {
        var t = this.getCycleTimeFactor();

        if(this._dynSize) {
            particle.width = particle.height = particle.depth 
                = PSUtil.calcDynAttr(this._dynSize, t, PSEmitter.DEF_ATTR.SIZE);
        }
        else {
            particle.width = PSUtil.calcDynAttr(this._dynWidth, t, PSEmitter.DEF_ATTR.WIDTH);
            particle.height = PSUtil.calcDynAttr(this._dynHeight, t, PSEmitter.DEF_ATTR.HEIGHT);
            particle.depth = PSUtil.calcDynAttr(this._dynDepth, t, PSEmitter.DEF_ATTR.DEPTH);
        }
    }

    public getEmissionCount(timeElapsed: number): number {
        this._lastCount = 0;

        if(!this._enable) {
            return 0;
        }

        this._emitterTime += timeElapsed;

        var cycleTotalTime = this._technique.getCycleTotalTime();

        var resultCount = 0;

        if(this._forceEmit) {
            if(this._emitterTime >= this._startTime) {
                resultCount = this._lastCount = Math.floor(this._emissionRate);
                this.setEnable(false);
            }
        }
        else {
            if(this._emitterTime >= this._startTime && this._emitterTime <= this._endTime) {
                this._remainder += this._emissionRate * timeElapsed;
                resultCount = this._lastCount = Math.floor(this._remainder);
                this._remainder -= resultCount;
            }

            if(this._emitterTime > cycleTotalTime) {
                if(this._cycle) {
                    this._emitterTime = 0;
                }
                else {
                    this.setEnable(false);
                }
            }
        }

        return resultCount;
    }
}