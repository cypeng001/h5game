declare namespace h5game {
    class BaseUtil {
        static callFunc(func: Function, params: any): void;
    }
}
declare namespace h5game {
    class MathUtil {
        static randInRange(min: number, max: number): number;
        static randInRangeFloat(min: number, max: number): number;
        private static _bezierat2(a, b, c, t);
        private static _bezierat3(a, b, c, d, t);
        static bezierat2(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: number, result?: [number, number]): [number, number];
        static bezierat3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, t: number, result?: [number, number]): [number, number];
    }
}
declare namespace h5game {
    class PhpUtil {
        private static param_count(param);
        private static param_2_str(param);
        static post(url: string, param: Object, handleFunc: Function, errorFunc: Function, thisObject: Object): void;
    }
}
declare namespace h5game {
    class RectUtil {
        static isIntersect(rc1_x1: number, rc1_y1: number, rc1_x2: number, rc1_y2: number, rc2_x1: number, rc2_y1: number, rc2_x2: number, rc2_y2: number): boolean;
    }
}
declare namespace h5game {
    class VectorUtil {
        static calcLength(x: number, y: number): number;
        static calcNormalize(x: number, y: number, result?: [number, number]): [number, number];
        static calcDir(x1: number, y1: number, x2: number, y2: number, result?: [number, number]): [number, number];
        static calcTarPos(x: number, y: number, dir_x: number, dir_y: number, len: number, result?: [number, number]): [number, number];
        static radian2Degree(radian: any): number;
        static degree2Radian(degree: any): number;
        static calcRadian(x: number, y: number): number;
        static calcDegree(x: number, y: number): number;
    }
}
