class NetMgr extends egret.EventDispatcher {
    public static readonly CONNECT: string = "connect";
    public static readonly IO_ERROR: string = "io-error";
    public static readonly CLOSE: string = "close";

    private static _instance: NetMgr = null;
    public static getInstance(): NetMgr {
        if(!NetMgr._instance) {
            NetMgr._instance = new NetMgr();
        }
        return NetMgr._instance;
    }

    private _pomelo:Pomelo = null;
    private _url: string = "";

    constructor() {
        super();

        this._pomelo = new Pomelo();

        var self = this;

        this._pomelo.on('io-error', function(e:any):void {
            self.dispatchEventWith(NetMgr.IO_ERROR);
        });

        this._pomelo.on('close', function(e:any):void {
            console.log("NetMgr.onClose url:", self._url)
            var targetUrl = self._url;

            if(e && e.currentTarget && e.currentTarget.url) {
                targetUrl = e.currentTarget.url;
                console.log("NetMgr.onClose targetUrl:", targetUrl)
            }

            if(self._url == targetUrl) {
                self.dispatchEventWith(NetMgr.CLOSE);
            }

            self._url = "";
        });
    }

    public connect(host: string, port: number, callback: Function): void {
        this._url = "ws://" + host + ":" + port + "/";

        console.log("NetMgr.connect url:", this._url);

        var self = this;
        this._pomelo.init({host: host, port: port, log: true}, function(response: any): void {
            self.dispatchEventWith(NetMgr.CONNECT);

            callback();
        });
    }

    public disconnect(): void {
        console.log("NetMgr.disconnect url:", this._url);

        this._url = "";

        this._pomelo.disconnect();
    }

    public request(route: string, msg: any, callback: (response: any) => void): void {
        if(window["TMP_TEST"]) {
            return;
        }
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