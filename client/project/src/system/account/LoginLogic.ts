class LoginLogic extends egret.EventDispatcher {
    private static _instance: LoginLogic = null;
    public static getInstance(): LoginLogic {
        if(!LoginLogic._instance) {
            LoginLogic._instance = new LoginLogic();
        }
        return LoginLogic._instance;
    }

    constructor() {
        super();
    }

    public authEntry(uid: string, token: string, callback: Function) {
        var self = this;
        self.queryEntry(uid, function(host, port) {
            self.entry(host, port, token, callback);
        });
    }

    private queryEntry(uid: string, callback: Function) {
        var self = this;
	
        NetMgr.getInstance().connect(window["SERVER_CNF"]["GATE_HOST"], window["SERVER_CNF"]["GATE_PORT"], function(): void {
            NetMgr.getInstance().request('gate.gateHandler.queryEntry', { uid: uid}, (data) => {
                NetMgr.getInstance().disconnect();

                if(data.code === 2001) {
                    alert('Servers error!');
                    return;
                }

                callback(data.host, data.port);
            }); 
        });

    }

    private entry(host: string, port: number, token: string, callback: Function): void {
        NetMgr.getInstance().connect(host, port, function(): void {
            NetMgr.getInstance().request('connector.entryHandler.entry', {token: token}, (data) => {
                console.log("connector.entryHandler.entry cb data:", data);
                var player = data.player;
                if (callback) {
                    callback(data.code);
                }

                if (data.code == 1001) {
                    alert('Login fail!');
                    return;
                } else if (data.code == 1003) {
                    alert('Username not exists!');
                    return;
                }

                if (data.code != 200) {
                    alert('Login Fail!');
                    return;
                }

            });
        });
    }
}