class LoginLogic {
    public static authEntry(): void {
        var host = GlobalConfig.GATE_HOST;
        var port = GlobalConfig.GATE_PORT;
        LoginLogic.connectToGateSrv(host, port);
    }

    private static connectToGateSrv(host: string, port: number): void {
        NetMgr.getInstance().connect(host, port, () => {
            LoginLogic.queryEntry(g_gameData.platData.uid);
        });
    }

    private static queryEntry(uid: number): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_queryEntry, 
            {uid: uid}, 
            (response) => {
            
            NetMgr.getInstance().disconnect();

            if(response.code === 2001) {
                alert('Servers error!');
                return;
            }

            var host = response.host;
            var port = response.port;
            LoginLogic.connectToGameSrv(host, port);
        }); 

    }

    private static connectToGameSrv(host: string, port: number): void {
        NetMgr.getInstance().connect(host, port, function(): void {
            LoginLogic.entry(g_gameData.platData.token);
        });
    }

    private static entry(token: string): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_entry, 
            {token: token}, 
            (response) => {

            if (response.code == 1001) {
                alert('Login fail!');
                return;
            } else if (response.code == 1003) {
                alert('Username not exists!');
                return;
            }

            if (response.code != 200) {
                alert('Login Fail!');
                return;
            }

            //LoginLogic.loadAreaResource();
            LoginLogic.enterScene();
        });
    }

    /*
    private static loadAreaResource(): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_loadAreaResource, null, (response: any) => {
            LoginLogic.enterScene();
        });
    }
    */

    private static enterScene(): void {
        h5game.IntfcProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_enterScene, null, (response: any) => {
            GameApp.getInstance().loadScene(SceneType.ST_MainScene, null);
        });
    }
}