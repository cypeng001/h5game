class LoginMsgHandler {
    private static _instance: LoginMsgHandler = null;
    public static getInstance(): LoginMsgHandler {
        if(!LoginMsgHandler._instance) {
            LoginMsgHandler._instance = new LoginMsgHandler;
        }
        return LoginMsgHandler._instance;
    }

    public init(): void {
        NetMgr.getInstance().on('onKick', function() {
			//location.reload();
			//switchManager.selectView("loginPanel");
		});

		NetMgr.getInstance().on('disconnect', function(reason) {
			//location.reload();
			//switchManager.selectView("loginPanel");
		});

		NetMgr.getInstance().on('onUserLeave', function(data){
			/*
            var area = app.getCurArea();
			var playerId = data.playerId;
			area.removePlayer(playerId);
            */
		});
    }
}