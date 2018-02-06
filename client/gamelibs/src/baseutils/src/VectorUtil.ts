namespace h5game
{

export class VectorUtil {
	public static calcLength(x: number, y: number): number {
		return Math.sqrt(x * x + y * y);
	}

	public static calcNormalize(x: number, y: number, 
		result: [number, number] = null): [number, number] {
		var len = VectorUtil.calcLength(x, y);
		var rx = x / len;
		var ry = y / len;
		if(result) {
			result[0] = rx;
			result[1] = ry;
			return result;
		}
		return [rx, ry];
	}

	public static calcDir(x1: number, y1: number, x2: number, y2: number, 
		result: [number, number] = null): [number, number] {
		var x_len = x2 - x1;
		var y_len = y2 - y1;

		var len = VectorUtil.calcLength(x_len, y_len);
		var rx = 0;
		var ry = 0
		if(len > 0) {
			rx = x_len / len;
			ry = y_len / len;
		}
		if(result) {
			result[0] = rx;
			result[1] = ry;
			return result;
		}
		return [rx, ry];
	}

	public static calcTarPos(x: number, y: number, dir_x: number, dir_y: number, len: number,
		result: [number, number] = null): [number, number] {
		var rx = x + dir_x * len;
		var ry = y + dir_y * len;
		if(result) {
			result[0] = rx;
			result[1] = ry;
			return result;
		}
		return [rx, ry];
	}

	public static radian2Degree(radian) {
		return radian / Math.PI * 180;
	}

	public static degree2Radian(degree) {
		return degree / 180 * Math.PI;
	}

	public static calcRadian(x: number, y: number): number {
		var radian = Math.atan(Math.abs(y / x));
		if(x > 0) {
			if(y > 0) {
				return radian;
			}
			else {
				return 2 * Math.PI - radian;
			}
		}
		else {
			if(y > 0) {
				return Math.PI - radian;
			}
			else {
				return Math.PI + radian;
			}
		}
	}

	public static calcDegree(x: number, y: number): number {
		return VectorUtil.radian2Degree(VectorUtil.calcRadian(x, y));
	}
}

}