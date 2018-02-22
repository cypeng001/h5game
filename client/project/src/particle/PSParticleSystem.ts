class PSParticleSystem extends egret.DisplayObject {
    private _liveTime: number = 0;
    private _cycleTotalTime: number = 0;
    private _cycle: boolean;
    private _bound: PSRect;

    private _techniques: PSTechnique[] = [];

    private _timeStamp: number = 0;
    private _lastTick: number = 0;
    private _startTick: boolean = false;
    private _enable: boolean = true;

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

    public setEnable(enable: boolean): void {
        this._enable = enable;
    }

    public createTechnique(): PSTechnique {
        var technique = new PSTechnique(this);
        this._techniques.push(technique);
        return technique;
    }

    private startTick(): void {
        if(this._startTick) {
            return;
        }
        this._startTick = true;

        this._lastTick = egret.getTimer();

        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private stopTick():void {
        if(!this._startTick) {
            return;
        }
        this._startTick = false;
        
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private update(interval: number): void {
        if(this._enable) {
            return;
        }

        this._liveTime += interval;

        if(this._liveTime > this._cycleTotalTime) {
            if(!this._cycle) {
                this._enable = false;
            }
            this._liveTime = 0;
        }

        for(var i in this._techniques) {
            this._techniques[i].update(interval);
        }
    }

    private onEnterFrame(e:egret.Event): void {  
        var tick = egret.getTimer();
        if(this._lastTick > 0)
        {
            var interval = (tick - this._lastTick) / 1000;
            this.update(interval);
        }
        this._lastTick = tick;
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number): void {
        super.$onAddToStage(stage, nestLevel);

        this.startTick();
    }

    $onRemoveFromStage(): void {
        super.$onRemoveFromStage();
        
        this.stopTick();
    }
}