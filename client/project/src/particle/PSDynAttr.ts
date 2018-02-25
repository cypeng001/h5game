interface PSDynAttr {
    getValue(x: number): number;

    getMaxValue(): number;

    getMinValue(): number;
}

class PSDynAttrFixed implements PSDynAttr {
    private _value: number = 0;

    constructor(data: any) {
        this._value = data;
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