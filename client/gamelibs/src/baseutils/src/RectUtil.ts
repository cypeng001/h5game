namespace h5game
{

export class RectUtil {
	public static isIntersect(rc1_x1: number, rc1_y1: number, rc1_x2: number, rc1_y2: number,
		rc2_x1: number, rc2_y1: number, rc2_x2: number, rc2_y2: number): boolean {
		return !(rc1_x2 < rc2_x1
			|| rc2_x2 < rc1_x1
			|| rc1_y2 < rc2_y1
			|| rc2_y2 < rc1_y1);
	}
}

}