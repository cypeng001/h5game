class PSParticleSystem extends egret.DisplayObject {
    private _liveTime: number = 0;
    private _cycleTotalTime: number = 0;
    private _cycle: boolean;
    private _bound: PSRect;

    private _techniques: PSTechnique[] = [];

    constructor() {
        super();
    }

    public getLiveTime(): number {
        return this._liveTime;
    }

    public setCycleTotalTime(time: number): void {
        this._cycleTotalTime = time;
    };

	public getCycleTotalTime(): number {
        return this._cycleTotalTime;
    }

    public getCycleTimeFactor(): number {
        var t =  this._liveTime / this._cycleTotalTime;
        return t - Math.floor(t);
    }

    public setCycle(cycle: boolean): void {
        this._cycle = cycle;
    }

    public setBound(bound: PSRect): void {
        this._bound = PSRectUtil.copy(bound, this._bound);
    }

    public createTechnique(): PSTechnique {
        var technique = new PSTechnique(this);
        this._techniques.push(technique);
        return technique;
    }
}