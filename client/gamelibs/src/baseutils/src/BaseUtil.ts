namespace h5game
{

export class BaseUtil {
    public static callFunc(func: Function, params: any): void {
        if(func) {
            func(params);
        }
    }
}

}