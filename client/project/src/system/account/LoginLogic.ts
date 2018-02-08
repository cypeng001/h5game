class LoginLogic {
    private static uid: string;
    private static token: string;
    private static game_host: string;
    private static game_port: number;

    public static authEntry(uid: string, token: string): void {
        LoginLogic.uid = uid;
        LoginLogic.token = token;

        LoginLogic.connectToGateSrv(GlobalConfig.GATE_HOST, GlobalConfig.GATE_PORT);
    }

    private static connectToGateSrv(host: string, port: number): void {
        NetMgr.getInstance().connect(host, port, () => {
            LoginLogic.queryEntry(LoginLogic.uid);
        });
    }

    private static queryEntry(uid: string): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_queryEntry, 
            {uid: uid}, 
            (data) => {
            
            NetMgr.getInstance().disconnect();

            if(data.code === 2001) {
                alert('Servers error!');
                return;
            }

            LoginLogic.game_host = data.host;
            LoginLogic.game_port = data.port;

            LoginLogic.connectToGameSrv(LoginLogic.game_host, LoginLogic.game_port);
        }); 

    }

    private static connectToGameSrv(host: string, port: number): void {
        NetMgr.getInstance().connect(host, port, function(): void {
            LoginLogic.entry(LoginLogic.token);
        });
    }

    private static entry(token: string): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_entry, 
            {token: token}, 
            (data) => {

            var player = data.player;

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

            var userData = data.user;
            var playerData = data.player;

            var areaId = playerData.areaId;

            if (!!userData) {
                g_gameData.uid = userData.id;
            }
            g_gameData.playerId = playerData.id;
            g_gameData.areaId = areaId;
            g_gameData.player = playerData;

            LoginLogic.loadAreaResource();
        });
    }

    private static loadAreaResource(): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_loadAreaResource, null, (response: any) => {
            LoginLogic.enterScene();
        });
    }

    private static enterScene(): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_enterScene, null, (response: any) => {
            GameApp.getInstance().loadScene(SceneType.ST_MainScene, null);
        });
    }
}