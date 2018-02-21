class PSAffectorTexAnim extends PSAffector {
    private _time_step: number;
	private _row: number;
	private _col: number;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setTimeStep(time_step: number): void {
        this._time_step = time_step;
    }

    public getTimeStep(): number {
        return this._time_step;
    }

    public setRow(row: number): void {
        this._row = (row != 0 ? row : 1);
    }

    public getRow(): number {
        return this._row;
    }

    public setCol(col: number): void {
        this._col = (col != 0 ? col : 1);
    }

    public getCol(): number {
        return this._col;
    }
}