class NetMgr extends egret.EventDispatcher {
    public static readonly CONNECT: string = "connect";
    public static readonly IO_ERROR: string = "io-error";
    public static readonly CLOSE: string = "close";

    public static readonly CONN_STATE = {
        CLOSE: 1,
        CONNECTING: 2,
        CONNECTED: 3,
    };

    private static _instance: NetMgr = null;
    public static getInstance(): NetMgr {
        if(!NetMgr._instance) {
            NetMgr._instance = new NetMgr();
        }
        return NetMgr._instance;
    }

    private _pomelo:Pomelo = null;
    private _url: string = "";
    private _connStates: {[key: string]: number} = {};

    constructor() {
        super();

        this._pomelo = new Pomelo();
    }

    public connect(host: string, port: number, callback: Function): void {
        var url = "ws://" + host + ":" + port;

        this._url = url;

        var self = this;

        this._connStates[url] = NetMgr.CONN_STATE.CONNECTING;

        this._pomelo.init({host: host, port: port, log: true}, function(response: any): void {

            self._connStates[url] = NetMgr.CONN_STATE.CONNECTED;

            self.dispatchEventWith(NetMgr.CONNECT);

            callback();
        });

        this._pomelo.on('io-error', function(e:any):void {
            self.dispatchEventWith(NetMgr.IO_ERROR);
        });

        this._pomelo.on('close', function(e:any, param:any):void {
            var lastUrl = param;
            var lastState = self._connStates[lastUrl];
            self._connStates[lastUrl] = NetMgr.CONN_STATE.CLOSE;

            self._url = "";
            self._pomelo.removeListener('io-error');
            self._pomelo.removeListener('close');

            if(lastState == NetMgr.CONN_STATE.CONNECTING
                || lastState == NetMgr.CONN_STATE.CONNECTED) {
                self.dispatchEventWith(NetMgr.CLOSE);
            }
        });
    }

    public disconnect(): void {
        this._connStates[this._url] = NetMgr.CONN_STATE.CLOSE;
        this._url = "";
        this._pomelo.removeListener('io-error');
        this._pomelo.removeListener('close');

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