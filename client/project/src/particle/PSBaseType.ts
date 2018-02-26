type PSColor4F = [number, number, number, number];  //[a, r, g, b]

type PSVec2 = [number, number]; //[x, y]
type PSVec3 = [number, number, number]; //[x, y, z]
type PSRect = [number, number, number, number]; //[l, t, r, b]

var PSVec2_UNIT_X: PSVec2 = [1, 0];
var PSVec2_UNIT_Y: PSVec2 = [0, 1];

var PSVec3_UNIT_X: PSVec3 = [1, 0, 0];
var PSVec3_UNIT_Y: PSVec3 = [0, 1, 0];
var PSVec3_UNIT_Z: PSVec3 = [0, 0, 1];

class PSColor4FUtil {
    public static copy(src: PSColor4F, dst: PSColor4F): PSColor4F {
        if(!dst) {
            dst = [0, 0, 0, 0];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    }
    
    public static add(v1: PSColor4F, v2: PSColor4F, ret: PSColor4F): void {
        ret[0] = v1[0] + v2[0];
        ret[1] = v1[1] + v2[1];
        ret[2] = v1[2] + v2[2];
        ret[3] = v1[3] + v2[3];
    }

    public static sub(v1: PSColor4F, v2: PSColor4F, ret: PSColor4F): void {
        ret[0] = v1[0] - v2[0];
        ret[1] = v1[1] - v2[1];
        ret[2] = v1[2] - v2[2];
        ret[3] = v1[3] - v2[3];
    }

    public static scale(v: PSColor4F, factor: number, ret: PSColor4F): void {
        ret[0] = v[0] * factor;
        ret[1] = v[1] * factor;
        ret[2] = v[2] * factor;
        ret[3] = v[3] * factor;
    }

    public static multiply(v1: PSColor4F, v2: PSColor4F, ret: PSColor4F): void {
        ret[0] = v1[0] * v2[0];
        ret[1] = v1[1] * v2[1];
        ret[2] = v1[2] * v2[2];
        ret[3] = v1[3] * v2[3];
    }
}

class PSVec2Util {
    public static copy(src: PSVec2, dst: PSVec2): PSVec2 {
        if(!dst) {
            dst = [0, 0];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        return dst;
    }

    public static len(v: PSVec2): number {
        var x = v[0];
        var y = v[1];
        return Math.sqrt(x * x + y * y);
    }

    public static normalize(v: PSVec2): void {
        var l = PSVec2Util.len(v);
        v[0] = v[0] / l;
        v[1] = v[1] / l;
    }
}

class PSVec3Util {
    public static copy(src: PSVec3, dst: PSVec3): PSVec3 {
        if(!dst) {
            dst = [0, 0, 0];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        return dst;
    }

    public static len(v: PSVec3): number {
        var x = v[0];
        var y = v[1];
        var z = v[2];
        return Math.sqrt(x * x + y * y + z * z);
    }

    public static normalize(v: PSVec3): void {
        var l = PSVec3Util.len(v);
        v[0] = v[0] / l;
        v[1] = v[1] / l;
        v[2] = v[2] / l;
    }

    public static multiply(v: PSVec3, factor: number, ret: PSVec3): void {
        ret[0] = v[0] * factor;
        ret[1] = v[1] * factor;
        ret[2] = v[2] * factor;
    }

    public static add(v1: PSVec3, v2: PSVec3, ret: PSVec3): void {
        ret[0] = v1[0] + v2[0];
        ret[1] = v1[1] + v2[1];
        ret[2] = v1[2] + v2[2];
    }

    public static sub(v1: PSVec3, v2: PSVec3, ret: PSVec3): void {
        ret[0] = v1[0] - v2[0];
        ret[1] = v1[1] - v2[1];
        ret[2] = v1[2] - v2[2];
    }

    public static cross(v1: PSVec3, v2: PSVec3, ret: PSVec3): void {
        ret[0] = (v1[1] * v2[2]) - (v1[2] * v2[1]);
        ret[1] = (v1[2] * v2[0]) - (v1[0] * v2[2]);
        ret[2] = (v1[0] * v2[1]) - (v1[1] * v2[0]);
    }

    public static dot(v1: PSVec3, v2: PSVec3): number {
        return (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);
    }

    public static perpendicular(src: PSVec3, dst: PSVec3): void {
        PSVec3Util.cross(src, PSVec3_UNIT_X, dst);
        var l = PSVec3Util.len(dst);
        if(l == 0) {
            PSVec3Util.cross(src, PSVec3_UNIT_Y, dst);
        }
        PSVec3Util.normalize(dst);
    }

    public static rotate(src: PSVec3, dst: PSVec3, angle: number): void {
        var radian = angle / 180 * Math.PI;
        var s = Math.sin(radian);
        var c = Math.cos(radian);
        var x = src[0];
        var y = src[1];
        dst[0] = c * x - s * y;
        dst[1] = s * x + c * y;
    }
}

class PSRectUtil {
    public static copy(src: PSRect, dst: PSRect): PSRect {
        if(!dst) {
            dst = [0, 0, 0, 0];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    }
}

class PSVec3Ftry {
    private static _instance: PSVec3Ftry = null;

    public static getInstance(): PSVec3Ftry {
        if(!PSVec3Ftry._instance) {
            PSVec3Ftry._instance = new PSVec3Ftry;
        }
        return PSVec3Ftry._instance;
    }

    private _pool: PSVec3[] = [];
    private _retainCount: number = 0;

    public constructor() {
        egret.startTick(() => {
            if(this.getRetainCount() != 0) {
                console.warn("PSVec3Ftry retainCount != 0, forget to release?", this.getRetainCount());
            }
            return false;
        }, this);
    }

    public create(x: number, y: number, z: number): PSVec3 {
        var ret: PSVec3;
        if(this._pool.length > 0) {
            ret = this._pool.pop();
            ret[0] = x;
            ret[1] = y;
            ret[2] = z;
        }
        else {
            ret = [x, y, z];
        }
        this._retainCount++;

        if(this._pool.length > 10) {
            console.warn("PSVec3Ftry.create pool is to large, forget to release?", this._pool.length);
        }

        return ret;
    }

    public release(v: PSVec3): void {
        this._retainCount--;
        this._pool.push(v);
    }

    public getRetainCount(): number {
        return this._retainCount;
    }
}

class PSColor4FFtry {
    private static _instance: PSColor4FFtry = null;

    public static getInstance(): PSColor4FFtry {
        if(!PSColor4FFtry._instance) {
            PSColor4FFtry._instance = new PSColor4FFtry;
        }
        return PSColor4FFtry._instance;
    }

    private _pool: PSColor4F[] = [];
    private _retainCount: number = 0;

    public constructor() {
        egret.startTick(() => {
            if(this.getRetainCount() != 0) {
                console.warn("PSColor4FFtry retainCount != 0, forget to release?", this.getRetainCount());
            }
            return false;
        }, this);
    }

    public create(r: number, g: number, b: number, a: number): PSColor4F {
        var ret: PSColor4F;
        if(this._pool.length > 0) {
            ret = this._pool.pop();
            ret[0] = r;
            ret[1] = g;
            ret[2] = b;
	    ret[3] = a;
        }
        else {
            ret = [r, g, b, a];
        }
        this._retainCount++;

        if(this._pool.length > 10) {
            console.warn("PSColor4FFtry.create pool is to large, forget to release?", this._pool.length);
        }

        return ret;
    }

    public release(v: PSColor4F): void {
        this._retainCount--;
        this._pool.push(v);
    }

    public getRetainCount(): number {
        return this._retainCount;
    }
}