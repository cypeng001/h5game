class PSAffector {
	protected _name: string;
	protected _startTime: number = 0;
	protected _endTime: number = 1;
    protected _affectTime: number = 0;
    protected _enable: boolean = true;

    protected _excludeEmitters: string[] = [];
    protected _excludeEmitterIDs: {[key: number]: boolean} = null;
    protected _excludeEmitterIDsDirty: boolean = true;

    protected _technique: PSTechnique;

    constructor(technique: PSTechnique) {
        this._technique = technique;
    }

    protected getCycleTimeFactor(): number {
        return this._technique.getCycleTimeFactor();
    }

	public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public setStartTime(t: number): void {
        this._startTime = t;
        if (this._startTime < 0) {
            this._startTime = 0;
        }

        if (this._startTime > this._endTime) {
            this._startTime = this._endTime;
        }
    }

    public getStartTime(): number {
        return this._startTime;
    }

    public setEndTime(t: number): void {
        this._endTime = t;
        if (this._endTime > 1) {
            this._endTime = 1;
        }

        if (this._startTime > this._endTime) {
            this._endTime = this._startTime;
        }
    }

    public getEndTime(): number {
        return this._endTime;
    }

    public setEnable(enable: boolean): void {
        this._enable = enable;
    }

    public addExcludeEmitter(emitter: string): void {
        this._excludeEmitters.push(emitter);
        this._excludeEmitterIDsDirty = true;
    }

    protected refreshExcludeEmitters(): void {
        if(!this._excludeEmitterIDsDirty) {
            return;
        }
        this._excludeEmitterIDsDirty = false;

        this._excludeEmitterIDs = null;
        if(this._excludeEmitters.length == 0) {
            return;
        }
        
        for(var i in this._excludeEmitters) {
            var emitter = this._technique.getEmitterByName(this._excludeEmitters[i]);
            if(emitter) {
                if(!this._excludeEmitterIDs) {
                    this._excludeEmitterIDs = {};
                }
                this._excludeEmitterIDs[emitter.id] = true;
            }
        }
    }

    public isFitParticle(particle: PSParticle): boolean {
        if(!this._enable) {
            return false;
        }

        this.refreshExcludeEmitters();
        if(this._excludeEmitterIDs) {
            var emitterID = particle.emitter.id;
            if(this._excludeEmitters[emitterID]) {
                return false;
            }
        }

        if(particle.timeLive <= 0) {
            return false;
        }

        return true;
    }

    public initParticle(particle: PSParticle): void {
        this.effectParticle(particle, 0);
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
    }

    public processParticles(timeElapsed: number): void {
        if(!this._enable) {
            return;
        }
    
        var total = this._technique.getCycleTotalTime();
        this._affectTime += timeElapsed;
        this._affectTime -= Math.floor(this._affectTime / total) * total;

        var startTime = this._startTime * total;
        var endTime = this._endTime * total;
        if(this._affectTime < startTime || this._affectTime > endTime) {
            return;
        }

        var particleList = this._technique.getActiveParticleList();
        for(var i in particleList) {
            var particle = particleList[i];

            if(particle.timeLive == particle.totalLive) {
                continue;
            }

            this.effectParticle(particle, timeElapsed);
        }
    }
}