class NetMgr extends egret.EventDispatcher {
    private static _instance: NetMgr = null;
    public static getInstance(): NetMgr {
        if(!NetMgr._instance) {
            NetMgr._instance = new NetMgr();
        }
        return NetMgr._instance;
    }

    private _pomelo:Pomelo = null;

    constructor() {
        super();

        this._pomelo = new Pomelo();
    }

    public connect(host: string, port: number, callback: Function): void {
        this._pomelo.init({host: host, port: port, log: true}, function(response: any): void {
            callback();
        });
    }

    public disconnect(): void {
        this._pomelo.disconnect();
    }

    public request(route: string, msg: any, callback: Function) {
        this._pomelo.request(route, msg, function(response: any): void {
            callback(response);
        });
    }

}