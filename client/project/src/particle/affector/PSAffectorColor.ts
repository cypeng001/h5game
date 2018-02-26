class PSAffectorColor extends PSAffector {
    private _colors: {time: number, color: PSColor4F}[] = [];
    private _colorsDirty: boolean = true;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public addColor(time: number, color: PSColor4F): void {
        this._colors.push({
            time: time,
            color: color,
        });
        this._colorsDirty = true;
    }

    private refreshColors(): void {
        if(!this._colorsDirty) {
            return;
        }
        this._colorsDirty = false;

        this._colors.sort(function(c1, c2) {
            var t1 = c1.time;
            var t2 = c2.time;
            if(t1 > t2) {
                return 1;
            }
            else if(t1 < t2) {
                return -1;
            }
            return 0;
        });
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        this.refreshColors();

        if(this._colors.length <= 0) {
            return;
        }

        var timeFactor = particle.timeFactor;

        var c1 = this._colors[0];
        var c2 = this._colors[this._colors.length - 1];

        if(timeFactor <= c1.time) {
            PSColor4FUtil.copy(c1.color, particle.color);
            return;
        }
        if(timeFactor >= c2.time) {
            PSColor4FUtil.copy(c2.color, particle.color);
            return;
        }

        for(var index = 0; index < this._colors.length; ++index) {
            var c = this._colors[index];
            if(c.time > timeFactor) {
                c1 = this._colors[index - 1];
                c2 = c;
                break;
            }
        }

        var result = particle.color;

        PSColor4FUtil.sub(c2.color, c1.color, result);
        PSColor4FUtil.scale(result, (timeFactor - c1.time) / (c2.time - c1.time), result);
        PSColor4FUtil.add(result, c1.color, particle.color);
    }
}