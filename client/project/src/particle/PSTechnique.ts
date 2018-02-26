class PSTechnique {
    private _particleSystem: PSParticleSystem;
    private _name: string;
    private _axis: PSVec3;
    private _angle: number = 0;
    private _quota: number = 1;
	private _emittedEmitterQuota: number = 0;
    private _stopEmitted: boolean = false;
    private _enable: boolean = true;

    private _affectors: PSAffector[] = [];
    private _emitters: PSEmitter[] = [];
    private _renderer: PSRenderer = null;

    private _activeParticleList: PSParticle[] = [];
    private _freeParticleList: PSParticle[] = [];

    constructor(particleSystem: PSParticleSystem) {
        this._particleSystem = particleSystem;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public setAxis(axis: PSVec3): void {
        this._axis = PSVec3Util.copy(axis, this._axis);
    }

    public setAngle(angle: number): void {
        this._angle = angle;
    }

    public setQuota(val: number): void {
        this._quota = val;
    }

	public setEmittedEmitterQuota(val: number): void {
        this._emittedEmitterQuota = val;
    }

    public getEmittedEmitterQuota(): number {
        return this._emittedEmitterQuota;
    }

    public setEnable(enable: boolean): void {
        this._enable = enable;
    }

    public getCycleTotalTime(): number {
        return this._particleSystem.getCycleTotalTime();
    }

    public getLiveTime(): number {
        return this._particleSystem.getLiveTime();
    }

    public getCycleTimeFactor(): number {
        return this._particleSystem.getCycleTimeFactor();
    }

    public createAffector(type: string): PSAffector {
        var affector = PSUtil.createAffector(type, this);
        this._affectors.push(affector);
        return affector;
    }

    public createEmitter(type: string): PSEmitter {
        var emitter = PSUtil.createEmitter(type, this);
        this._emitters.push(emitter);
        return emitter;
    }

    public createRenderer(type: string): PSRenderer {
        this._renderer = PSUtil.createRenderer(type, this);
        return this._renderer;
    }

    public getActiveParticleList(): PSParticle[] {
        return this._activeParticleList;
    }

    public update(timeElapsed: number): void {
        if(!this._enable) {
            return;
        }

        this.expire(timeElapsed);

        if(!this._stopEmitted) {
            this.emitParticles(timeElapsed);
        }

        this.triggerAffectors(timeElapsed);
    }

    private expire(timeElapsed: number): void {
        for(var i = this._activeParticleList.length - 1; i >= 0; --i) {
            var particle = this._activeParticleList[i];

            if(!particle.liveForever && particle.timeLive < timeElapsed) {
                this._activeParticleList.splice(i, 1);
                this._freeParticleList.push(particle);
            }
            else {
                particle.timeLive -= timeElapsed;
                if(particle.liveForever && particle.timeLive < 0) {
                    particle.timeLive = particle.totalLive;
                }
            }
        }
    }

    private emitParticles(timeElapsed: number): void {
        var total = 0;
        for(let i in this._emitters) {
            total += this._emitters[i].getEmissionCount(timeElapsed);
        }

        var allow = 0;
        if(this._quota > this._activeParticleList.length) {
            allow = this._quota - this._activeParticleList.length;
        }
        if(allow == 0) {
            return;
        }

        var ratio = 1;
        if(total > allow && total != 0) {
            ratio = allow / total;
        }

        for(let i in this._emitters) {
            var emitter = this._emitters[i];
            this.triggerEmitter(emitter, Math.floor(emitter.getLastCount() * ratio), timeElapsed);
        }
    }

    private triggerAffectors(timeElapsed: number): void {
        for(var i in this._affectors) {
            this._affectors[i].processParticles(timeElapsed);
        }
    }

    private createParticle(): PSParticle {
        var particle: PSParticle = null;
        if(this._freeParticleList.length > 0) {
            particle = this._freeParticleList.pop();
        }
        else {
            particle = new PSParticle;
        }
        
        this._activeParticleList.push(particle);

        return particle
    }

    private triggerEmitter(emitter: PSEmitter, requested: number, timeElapsed: number): void {
        if(!requested) {
            return;
        }

        for(var i = 0; i < requested; ++i) {
            var p = this.createParticle();
            emitter.initParticle(p);

            for(var k in this._affectors) {
                var affector = this._affectors[k];
                if(affector.isFitParticle(p)) {
                    affector.initParticle(p);
                }
            }
        }
    }

    public render(renderNode: egret.sys.GroupNode): void {
        if(!this._enable) {
            return;
        }

        if(!this._renderer) {
            return;
        }
        this._renderer.render(renderNode);
    }
}