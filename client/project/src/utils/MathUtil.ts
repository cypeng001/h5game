class MathUtil {
	public static randInRange(min: number, max: number): number {
		var range = max - min;   
		var rand = Math.random();   
		return (min + Math.round(rand * range));   
	}

	public static randInRangeFloat(min: number, max: number): number {
		var range = max - min;   
		var rand = Math.random();   
		return (min + rand * range);   
	}

	private static _bezierat2(a: number, b: number, c: number, t: number): number {
		return Math.pow(1-t,2)*a + 
            2*t*(1-t)*b + 
            Math.pow(t,2)*c;
	}
    
	private static _bezierat3(a: number, b: number, c: number, d: number, t: number): number {
		return Math.pow(1-t,3) * a + 
				3*t*(Math.pow(1-t,2))*b + 
				3*Math.pow(t,2)*(1-t)*c +
				Math.pow(t,3)*d;
	}

	public static bezierat2(x1: number, y1: number, 
		x2: number, y2: number, 
		x3: number, y3: number, 
		t: number,
		result: [number, number] = null): [number, number] {
		var rx = MathUtil._bezierat2(x1, x2, x3, t);
		var ry = MathUtil._bezierat2(y1, y2, y3, t);
		if(result) {
			result[0] = rx;
			result[1] = ry;
			return result;
		}
		return [rx, ry];
	}

	public static bezierat3(x1: number, y1: number, 
		x2: number, y2: number, 
		x3: number, y3: number,
		x4: number, y4: number, 
		t: number,
		result: [number, number] = null): [number, number] {
		var rx = MathUtil._bezierat3(x1, x2, x3, x4, t);
		var ry = MathUtil._bezierat3(y1, y2, y3, y4, t);
		if(result) {
			result[0] = rx;
			result[1] = ry;
			return result;
		}
		return [rx, ry];
	}

}