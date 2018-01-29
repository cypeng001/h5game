class NetMgr extends egret.EventDispatcher {
    public static IO_ERROR: string = "io-error";
    public static CLOSE: string = "close";

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

        var self = this;
        this._pomelo.on('io-error', function(e:any):void {
            self.dispatchEventWith(NetMgr.IO_ERROR);
        });

        this._pomelo.on('close', function(e:any):void {
            self.dispatchEventWith(NetMgr.CLOSE);
        });
    }

    public connect(host: string, port: number, callback: Function): void {
        this._pomelo.init({host: host, port: port, log: true}, function(response: any): void {
            callback();
        });
    }

    public disconnect(): void {
        this._pomelo.disconnect();
    }

    public request(route: string, msg: any, callback: (response: any) => void): void {
        this._pomelo.request(route, msg, function(response: any): void {
            callback(response);
        });
    }

    public notify(route: string, msg: any): void {
        this._pomelo.notify(route, msg);
    }

    public on(route:string, callback: (response:any)=>void): void {
        this._pomelo.on(route, function(response: any): void {
            callback(response);
        })
    }

}