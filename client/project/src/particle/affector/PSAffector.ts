class PSAffector {
	private _name: string;
	private _startTime: number = 0;
	private _endTime: number = 1;
    private _affectTime: number = 0;
    private _enable: boolean = true;

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

    getStartTime(): number {
        return this._startTime;
    }

    setEndTime(t: number): void {
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

    public isFitParticle(particle: PSParticle): boolean {
        if(!this._enable) {
            return false;
        }

        if(particle.timeLive <= 0) {
            return false;
        }

        return true;
    }

    public initParticle(particle: PSParticle): void {
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