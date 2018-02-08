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
            //NetMgr.getInstance().request('gate.gateHandler.queryEntry', { uid: uid}, (data) => {
            GameProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_queryEntry, { uid: uid}, (data) => {
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
        var self = this;

        NetMgr.getInstance().connect(host, port, function(): void {
            //NetMgr.getInstance().request('connector.entryHandler.entry', {token: token}, (data) => {
            GameProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_entry, {token: token}, (data) => {
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

                self.afterLogin(data);

            });
        });
    }

    private afterLogin(data: any): void {
        var userData = data.user;
        var playerData = data.player;

        console.log("afterLogin userData:", userData);
        console.log("afterLogin playerData:", playerData);

        var areaId = playerData.areaId;
        //var areas = {1: {map: {id: 'jiangnanyewai.png', width: 3200, height: 2400}, id: 1}};

        if (!!userData) {
            g_gameData.uid = userData.id;
        }
        g_gameData.playerId = playerData.id;
        g_gameData.areaId = areaId;
        g_gameData.player = playerData;

        GameProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_loadAreaResource, null, () => {
            GameProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_enterScene, null, () => {
                GameApp.getInstance().loadScene(SceneType.ST_MainScene, null);
            });
        });

        /*
        SceneMsgHdlr.reqLoadAreaResource(function(data) {
            SceneMsgHdlr.reqEnterScene(null);
        });
        */
    }
}