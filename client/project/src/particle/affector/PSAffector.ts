class PSAffector implements PSAttribute {
	private _name: string;
	private _start_time: number;
	private _end_time: number;

    protected _technique: PSTechnique;

    constructor(technique: PSTechnique) {
        this._technique = technique;
    }

	public setAttribute(key: string, value: any): void {
	}

	public getAttribute(key: string): any {   
    }

	public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public setStartTime(t: number): void {
        this._start_time = t;
        if (this._start_time < 0) {
            this._start_time = 0;
        }

        if (this._start_time > this._end_time) {
            this._start_time = this._end_time;
        }
    }

    getStartTime(): number {
        return this._start_time;
    }

    setEndTime(t: number): void {
        this._end_time = t;
        if (this._end_time > 1) {
            this._end_time = 1;
        }

        if (this._start_time > this._end_time) {
            this._end_time = this._start_time;
        }
    }

    public getEndTime(): number {
        return this._end_time;
    }

    public initParticle(particle: PSParticle): void {

    }

    public effectParticle(particle: PSParticle, interval: number): void {
        
    }
}