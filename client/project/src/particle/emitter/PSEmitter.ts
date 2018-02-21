class PSEmitter extends Particle implements PSAttribute {
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

    protected _name: string;
    protected _dir: PSVec3;
    protected _up: PSVec3;
    protected _relativePos: PSVec3;
    protected _emissionRate: number;
    protected _startTime: number;
    protected _endTime: number;
    protected _cycle: boolean;
    protected _forceEmit: boolean;
    protected _liveForever: boolean;
    protected _remainder: number;
    protected _emitterTime: number;
    protected _startColor: PSColor4F;
    protected _endColor: PSColor4F;

    protected _dynLiveTime: PSDynAttr;
    protected _dynAngle: PSDynAttr;
    protected _dynWidth: PSDynAttr;
    protected _dynHeight: PSDynAttr;
    protected _dynDepth: PSDynAttr;
    protected _dynSize: PSDynAttr;
    protected _dynVelocity: PSDynAttr;

	protected _technique: PSTechnique;

    constructor(technique: PSTechnique) {
        super();

        this._technique = technique;
    }

    public setAttribute(key: string, value: any): void {
    }

    public getAttribute(key: string): any {   
    }

	public setName(name: string): void {
        this._name = name;
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

    public setDynVelocity(dynVelocity: PSDynAttr): void {
        this._dynVelocity = dynVelocity;
    }

    public initParticle(particle: Particle): void {
        particle.parent_emitter = this;
        particle.live_forever = this._liveForever;
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

    public initParticlePos(particle: Particle): void {
        particle.position = PSVec3Util.copy(this._relativePos, particle.position);
    }

    public initParticleColor(particle: Particle): void {
		PSColor4FUtil.copy(this._startColor, particle.color);
    }

    public initParticleSpeed(particle: Particle): void {
		var t = this.getCycleTimeFactor();
		var velocity = PSUtil.calcDynAttr(this._dynVelocity, t, 0);
		PSVec3Util.multiply(particle.direction, velocity, particle.direction);
    }

    public initParticleDirection(particle: Particle): void {
        PSVec3Util.copy(this._dir, particle.direction);
    }

    public initParticleLiveTime(particle: Particle): void {
        var t = this.getCycleTimeFactor();

        particle.time_live = particle.total_live 
            = PSUtil.calcDynAttr(this._dynLiveTime, t, PSEmitter.DEF_ATTR.TIME_LIVE);
    }

    public initParticleDimensions(particle: Particle): void {
        var t = this.getCycleTimeFactor();

        particle.width = particle.height = particle.depth 
            = PSUtil.calcDynAttr(this._dynSize, t, PSEmitter.DEF_ATTR.SIZE);
    }

    protected getCycleTimeFactor(): number {
        return this._technique.getCycleTimeFactor();
    }
}