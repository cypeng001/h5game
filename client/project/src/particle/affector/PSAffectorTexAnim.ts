class PSAffectorTexAnim extends PSAffector {
    private _time_step: number = 0.2;
	private _row: number = 1;
	private _col: number = 1;
    private _num: number = 1;
    private _cycle: boolean = false;
    private _forward: boolean = true;
    private _texCoords: PSRect[] = null;
    private _texCoordsDirty: boolean = true;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setTimeStep(time_step: number): void {
        this._time_step = time_step;
    }

    public setRow(row: number): void {
        row = (row != 0 ? row : 1);
        if(this._row == row) {
            return;
        }
        this._row = row;

        this._texCoordsDirty = true;
    }

    public setCol(col: number): void {
        col = (col != 0 ? col : 1);
        if(this._col == col) {
            return;
        }
        this._col = col;

        this._texCoordsDirty = true;
    }

    public setCycle(cycle: boolean): void {
        this._cycle = cycle;
    }

    public setForward(forward: boolean): void {
        this._forward = forward;
    }

    private updateTexCoords(): void {
        if(!this._texCoordsDirty) {
            return;
        }
        this._texCoordsDirty = false;

        this._num = this._col * this._row;
        
        this._texCoords = [];

        for(var v = 0; v < this._row; ++v ) {
            var top = v / this._row;
            var bottom = (v + 1) / this._row;
            for(var u = 0; u < this._col; ++u ) {
                var left = u / this._col;
                var bottom = bottom;
                var right = (u + 1) / this._col;
                var top = top;
                var r: PSRect = [left, top, right, bottom]
                this._texCoords.push(r);
            }
        }
    }

    public initParticle(particle: PSParticle): void {
        particle.startFrame = 0;
        this.effectParticle(particle, 0);
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        this.updateTexCoords();

        var index = Math.floor((particle.totalLive - particle.timeLive) / this._time_step);

        if(!this._cycle) {
            if(index >= this._num) {
                index = this._num - 1;
            }
        }

        if(this._forward) {
            index = (particle.startFrame + index) % this._num;
        }
        else {
            index = (particle.startFrame - index + this._num) % this._num;
        }

        var r = this._texCoords[index];
        particle.left = r[0];
        particle.top = r[1];
        particle.right = r[2];
        particle.bottom = r[3];
    }
}