type PSColor4F = [number, number, number, number];  //[a, r, g, b]

type PSVec2 = [number, number]; //[x, y]
type PSVec3 = [number, number, number]; //[x, y, z]
type PSVec4 = [number, number, number, number]; //[x, y, z, w]
type PSRect = [number, number, number, number]; //[l, t, r, b]
type PSMatrix4 = [number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number];
type PSQuaternion = [number, number, number, number]; //[x, y, z, w]

var PSVec2_UNIT_X: PSVec2 = [1, 0];
var PSVec2_UNIT_Y: PSVec2 = [0, 1];

var PSVec3_UNIT_X: PSVec3 = [1, 0, 0];
var PSVec3_UNIT_Y: PSVec3 = [0, 1, 0];
var PSVec3_UNIT_Z: PSVec3 = [0, 0, 1];

var PSMatrix4_UNIT: PSMatrix4 = [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1];

var PSQuaternion_UNIT: PSQuaternion = [0, 0, 0, 1];

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

    public static set(dst: PSVec3, x: number, y: number, z: number): void {
        dst[0] = x;
        dst[1] = y;
        dst[2] = z;
    }

    public static equal(v1: PSVec3, v2: PSVec3): boolean {
        return v1[0] == v2[0] && v1[1] == v2[1] && v1[2] == v2[2]
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

class PSMatrix4Util {
    public static copy(src: PSMatrix4, dst: PSMatrix4): PSRect {
        if(!dst) {
            dst = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
        };

        for(var i = 0; i < 16; ++i) {
            dst[i] = src[i];
        }
        return dst;
    }

    public static transformVec4(m: PSMatrix4, v: PSVec4, dst: PSVec4): void {
        dst[0] = v[0] * m[0] + v[1] * m[4] + v[2] * m[8] + v[3] * m[12];
        dst[1] = v[0] * m[1] + v[1] * m[5] + v[2] * m[9] + v[3] * m[13];
        dst[2] = v[0] * m[2] + v[1] * m[6] + v[2] * m[10] + v[3] * m[14];
        dst[3] = v[0] * m[3] + v[1] * m[7] + v[2] * m[11] + v[3] * m[15];
    }
}

class PSQuaternionUtil {
    public static copy(src: PSQuaternion, dst: PSQuaternion): PSQuaternion {
        if(!dst) {
            dst = [0, 0, 0, 1];
        };
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    };

    public static identity(quaternion: PSQuaternion): void {
        quaternion[0] = 0;
        quaternion[1] = 0;
        quaternion[2] = 0;
        quaternion[3] = 1;
    }

    public static rotationAxis2Quaternion(v: PSVec3, angle: number, ret: PSQuaternion): void {
        var rad = angle * 0.5;
        var scale = Math.sin(rad);
        ret[0] = v[0] * scale;
        ret[1] = v[1] * scale;
        ret[2] = v[2] * scale;
        ret[3] = Math.cos(rad);
    }

    public static quaternionMultiplyVec3(q: PSQuaternion, v: PSVec3, ret: PSVec3): void {
        var uvTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
        var uuvTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
        var qvecTmp = PSVec3Ftry.getInstance().create(0, 0, 0);

        qvecTmp[0] = q[0];
        qvecTmp[1] = q[1];
        qvecTmp[2] = q[2];

        PSVec3Util.cross(qvecTmp, v, uvTmp);

        PSVec3Util.cross(qvecTmp, uvTmp, uuvTmp);

        PSVec3Util.multiply(uvTmp, 2 * q[3], uvTmp);
        PSVec3Util.multiply(uuvTmp, 2, uuvTmp);

        PSVec3Util.add(v, uvTmp, ret);
        PSVec3Util.add(ret, uuvTmp, ret);
        
        PSVec3Ftry.getInstance().release(uvTmp);
        PSVec3Ftry.getInstance().release(uuvTmp);
        PSVec3Ftry.getInstance().release(qvecTmp);
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

class PSVec4Ftry {
    private static _instance: PSVec4Ftry = null;

    public static getInstance(): PSVec4Ftry {
        if(!PSVec4Ftry._instance) {
            PSVec4Ftry._instance = new PSVec4Ftry;
        }
        return PSVec4Ftry._instance;
    }

    private _pool: PSVec4[] = [];
    private _retainCount: number = 0;

    public constructor() {
        egret.startTick(() => {
            if(this.getRetainCount() != 0) {
                console.warn("PSVec4Ftry retainCount != 0, forget to release?", this.getRetainCount());
            }
            return false;
        }, this);
    }

    public create(x: number, y: number, z: number, w: number): PSVec4 {
        var ret: PSVec4;
        if(this._pool.length > 0) {
            ret = this._pool.pop();
            ret[0] = x;
            ret[1] = y;
            ret[2] = z;
            ret[3] = w;
        }
        else {
            ret = [x, y, z, w];
        }
        this._retainCount++;

        if(this._pool.length > 10) {
            console.warn("PSVec4Ftry.create pool is to large, forget to release?", this._pool.length);
        }

        return ret;
    }

    public release(v: PSVec4): void {
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

class PSMatrix4Ftry {
    private static _instance: PSMatrix4Ftry = null;

    public static getInstance(): PSMatrix4Ftry {
        if(!PSMatrix4Ftry._instance) {
            PSMatrix4Ftry._instance = new PSMatrix4Ftry;
        }
        return PSMatrix4Ftry._instance;
    }

    private _pool: PSMatrix4[] = [];
    private _retainCount: number = 0;

    public constructor() {
        egret.startTick(() => {
            if(this.getRetainCount() != 0) {
                console.warn("PSMatrix4Ftry retainCount != 0, forget to release?", this.getRetainCount());
            }
            return false;
        }, this);
    }

    public create(): PSMatrix4 {
        var ret: PSMatrix4;
        if(this._pool.length > 0) {
            ret = this._pool.pop();
            PSMatrix4Util.copy(PSMatrix4_UNIT, ret);
        }
        else {
            ret = [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1];
        }
        this._retainCount++;

        if(this._pool.length > 10) {
            console.warn("PSMatrix4Ftry.create pool is to large, forget to release?", this._pool.length);
        }

        return ret;
    }

    public release(v: PSMatrix4): void {
        this._retainCount--;
        this._pool.push(v);
    }

    public getRetainCount(): number {
        return this._retainCount;
    }
}

class PSQuaternionFtry {
    private static _instance: PSQuaternionFtry = null;

    public static getInstance(): PSQuaternionFtry {
        if(!PSQuaternionFtry._instance) {
            PSQuaternionFtry._instance = new PSQuaternionFtry;
        }
        return PSQuaternionFtry._instance;
    }

    private _pool: PSQuaternion[] = [];
    private _retainCount: number = 0;

    public constructor() {
        egret.startTick(() => {
            if(this.getRetainCount() != 0) {
                console.warn("PSQuaternionFtry retainCount != 0, forget to release?", this.getRetainCount());
            }
            return false;
        }, this);
    }

    public create(x: number, y: number, z: number, w: number): PSQuaternion {
        var ret: PSQuaternion;
        if(this._pool.length > 0) {
            ret = this._pool.pop();
	    ret[0] = x;
            ret[1] = y;
            ret[2] = z;
            ret[3] = w;
        }
        else {
            ret = [x, y, z, w];
        }
        this._retainCount++;

        if(this._pool.length > 10) {
            console.warn("PSQuaternionFtry.create pool is to large, forget to release?", this._pool.length);
        }

        return ret;
    }

    public release(v: PSQuaternion): void {
        this._retainCount--;
        this._pool.push(v);
    }

    public getRetainCount(): number {
        return this._retainCount;
    }
}