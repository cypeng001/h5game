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

    public setValue(value: number): void {
        this._value = value;
    }
}