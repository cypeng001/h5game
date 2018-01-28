class GameMsgHandler {
    private static _instance: GameMsgHandler = null;
    public static getInstance(): GameMsgHandler {
        if(!GameMsgHandler._instance) {
            GameMsgHandler._instance = new GameMsgHandler;
        }
        return GameMsgHandler._instance;
    }

    public init(): void {
        NetMgr.getInstance().on('onChangeArea', function(data) {
		});

        NetMgr.getInstance().on('onPlayerDialog', function(data) {
		});

        NetMgr.getInstance().on('onApplyJoinTeam', function(data) {
		});

        NetMgr.getInstance().on('onInviteJoinTeam', function(data) {
		});

        NetMgr.getInstance().on('onDragMember2gameCopy', function(data) {
		});

        NetMgr.getInstance().on('onAddEntities', function(data) {
		});

        NetMgr.getInstance().on('onDropItems', function(data) {
		});

        NetMgr.getInstance().on('onRemoveEntities', function(data) {
		});

        NetMgr.getInstance().on('onMove', function(data) {
		});

        NetMgr.getInstance().on('onTeammateLeaveTeam', function(data) {
		});

        NetMgr.getInstance().on('onDisbandTeam', function(data) {
		});

        NetMgr.getInstance().on('onUpdateTeam', function(data) {
		});

        NetMgr.getInstance().on('onUpdateTeam', function(data) {
		});

        NetMgr.getInstance().on('onTeamCaptainStatusChange', function(data) {
		});

        NetMgr.getInstance().on('onTeamMemberStatusChange', function(data) {
		});

        NetMgr.getInstance().on('onPathCheckout', function(data) {
		});

        NetMgr.getInstance().on('onUpgrade', function(data) {
		});

        NetMgr.getInstance().on('onUpdateTaskData', function(data) {
		});

        NetMgr.getInstance().on('onTaskCompleted', function(data) {
		});

        NetMgr.getInstance().on('onRemoveItem', function(data) {
		});

        NetMgr.getInstance().on('onPickItem', function(data) {
		});

        NetMgr.getInstance().on('onNPCTalk', function(data) {
		});

        NetMgr.getInstance().on('onCheckoutTask', function(data) {
		});

        NetMgr.getInstance().on('onAttack', function(data) {
		});

        NetMgr.getInstance().on('onRevive', function(data) {
		});
    }
}