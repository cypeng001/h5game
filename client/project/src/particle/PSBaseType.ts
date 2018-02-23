type PSColor4F = [number, number, number, number];  //[a, r, g, b]

type PSVec2 = [number, number]; //[x, y]
type PSVec3 = [number, number, number]; //[x, y, z]
type PSRect = [number, number, number, number]; //[l, t, r, b]

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
    
    public static multiply(v1: PSColor4F, v2: PSColor4F, ret: PSColor4F): void {
        ret[0] = v1[0] * v2[0];
        ret[1] = v1[1] * v2[1];
        ret[2] = v1[2] * v2[2];
        ret[3] = v1[3] * v2[3];
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

    public static multiply(v: PSVec3, factor: number, ret: PSVec3): void {
        ret[0] = v[0] * factor;
        ret[0] = v[1] * factor;
        ret[0] = v[2] * factor;
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