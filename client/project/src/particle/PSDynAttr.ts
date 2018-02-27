interface PSDynAttr {
    getType(): number;

    getValue(x: number): number;

    getMaxValue(): number;

    getMinValue(): number;
}

enum PSDynAttrType {
    FIXED   = 1,
    RANDOM,
    CURVED,
}

class PSDynAttrFixed implements PSDynAttr {
    private _value: number = 0;

    constructor(data: any) {
        this._value = data;
    }

    public getType(): number {
        return PSDynAttrType.FIXED;
    }

    public getValue(x: number): number {
        return this._value;
    }

    public getMaxValue(): number {
        return this._value;
    }

    public getMinValue(): number {
        return this._value;
    }
}

class PSDynAttrRandom implements PSDynAttr {
    private _min: number = 0;
    private _max: number = 0;

    constructor(data: any) {
        this._min = data[0];
        this._max = data[1];
    }

    public getType(): number {
        return PSDynAttrType.RANDOM;
    }

    public getValue(x: number): number {
        return PSUtil.randInRangeFloat(this._min, this._max);  
    }

    public getMaxValue(): number {
        return this._max;
    }

    public getMinValue(): number {
        return this._min;
    }
}

class PSDynAttrCurved implements PSDynAttr {
    private _min: number = 0;
    private _max: number = 0;
    private _controlPoints: [number, number][] = [];
    private _controlPointsDirty: boolean = true;
    private _lastIndex: number = 0;
    private _lastTime: number = 0;

    constructor(data: any) {
        for(var i = 0; i < data.length; i += 2) {
            this.addControlPoint(data[i], data[i + 1]);
        }
    }

    public getType(): number {
        return PSDynAttrType.CURVED;
    }

    public getValue(x: number): number {
        if (this._controlPoints.length == 0) {
            return 0;
        }

        this.refreshControlPoints();

        var size = this._controlPoints.length;
        if (this._lastTime >= x) {
            this._lastIndex = 0;
        }
        this._lastTime = x;

        var index = this.findNearestCPIdx(x);
        this._lastIndex = index + 1;
        if(this._lastIndex >= size) {
            this._lastIndex = size;
            return this._controlPoints[size - 1][1];
        }

        var cp1 = this._controlPoints[index];
        var cp2 = this._controlPoints[index + 1];

        var t = (x - cp1[0]) / (cp2[0] - cp1[0]);
        return cp1[1] + (cp2[1] - cp1[1]) * t;
    }

    public getMaxValue(): number {
        this.refreshControlPoints();
        return this._max;
    }

    public getMinValue(): number {
        this.refreshControlPoints();
        return this._min;
    }

    public addControlPoint(x: number, y: number): void {
        this._controlPoints.push([x, y]);
        this._controlPointsDirty = true;
    }

    private findNearestCPIdx(x: number): number {
        var size = this._controlPoints.length;
        var index = this._lastIndex;
        for (; index < size; ++index) {
            if (x < this._controlPoints[index][0]) {
                if (index == 0) {
                    return index;
                }
                else {
                    return (index - 1);
                }
            }
        }

        return index - 1;
    }

    private refreshControlPoints(): void {
        if(!this._controlPointsDirty) {
            return;
        }
        this._controlPointsDirty = false;

        this._controlPoints.sort(function(cp1, cp2) {
            var t1 = cp1[0];
            var t2 = cp2[0];
            if(t1 > t2) {
                return 1;
            }
            else if(t1 < t2) {
                return -1;
            }
            return 0;
        });

        this._min = this._max = 0;
        
        if(this._controlPoints.length == 0) {
            return;
        }

        this._min = this._max = this._controlPoints[0][1];
        for(var i = 1; i < this._controlPoints.length; ++i) {
            var val = this._controlPoints[i][1];
            if(val < this._min) {
                this._min = val;
            }
            if(val > this._max) {
                this._max = val;
            }
        }
    }
}