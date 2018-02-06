namespace h5game
{

export class MCFtry extends h5game.ObjFtry {
    private static _instance: MCFtry = null;
    
    public static getInstance(): MCFtry {
        if(!this._instance)
        {
            this._instance = new MCFtry();
        }
        return this._instance;
    }

    public createPool(key: string): any {
        return new MCPool(key);
    }
}

}