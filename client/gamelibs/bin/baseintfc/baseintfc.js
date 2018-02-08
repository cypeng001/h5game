var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var h5game;
(function (h5game) {
    var IMapCmdN;
    (function (IMapCmdN) {
        IMapCmdN[IMapCmdN["IMCN_CreateNum"] = 1] = "IMCN_CreateNum";
    })(IMapCmdN = h5game.IMapCmdN || (h5game.IMapCmdN = {}));
    ;
    var IMapCmdQ;
    (function (IMapCmdQ) {
        IMapCmdQ[IMapCmdQ["IMCQ_GetActor"] = 1] = "IMCQ_GetActor";
    })(IMapCmdQ = h5game.IMapCmdQ || (h5game.IMapCmdQ = {}));
    ;
    ;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    ;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var INetMsgReq;
    (function (INetMsgReq) {
        //gateHandler
        INetMsgReq[INetMsgReq["INMR_GATE_queryEntry"] = 100001] = "INMR_GATE_queryEntry";
        //timeSyncHandler
        INetMsgReq[INetMsgReq["INMR_TIME_timeSync"] = 100002] = "INMR_TIME_timeSync";
        //entryHandler
        INetMsgReq[INetMsgReq["INMR_ENTRY_entry"] = 100003] = "INMR_ENTRY_entry";
        //roleHandler
        INetMsgReq[INetMsgReq["INMR_ROLE_createPlayer"] = 100004] = "INMR_ROLE_createPlayer";
        //playerHandler
        INetMsgReq[INetMsgReq["INMR_PLAYER_enterScene"] = 100005] = "INMR_PLAYER_enterScene";
        INetMsgReq[INetMsgReq["INMR_PLAYER_changeArea"] = 100006] = "INMR_PLAYER_changeArea";
        INetMsgReq[INetMsgReq["INMR_PLAYER_move"] = 100007] = "INMR_PLAYER_move";
        INetMsgReq[INetMsgReq["INMR_PLAYER_dropItem"] = 100008] = "INMR_PLAYER_dropItem";
        INetMsgReq[INetMsgReq["INMR_PLAYER_useItem"] = 100009] = "INMR_PLAYER_useItem";
        INetMsgReq[INetMsgReq["INMR_PLAYER_pickItem"] = 100010] = "INMR_PLAYER_pickItem";
        INetMsgReq[INetMsgReq["INMR_PLAYER_learnSkill"] = 100011] = "INMR_PLAYER_learnSkill";
        INetMsgReq[INetMsgReq["INMR_PLAYER_upgradeSkill"] = 100012] = "INMR_PLAYER_upgradeSkill";
        //fight
        INetMsgReq[INetMsgReq["INMR_FIGHT_attack"] = 100013] = "INMR_FIGHT_attack";
        //taskHandler
        INetMsgReq[INetMsgReq["INMR_TASK_getNewTask"] = 100014] = "INMR_TASK_getNewTask";
        INetMsgReq[INetMsgReq["INMR_TASK_startTask"] = 100015] = "INMR_TASK_startTask";
        INetMsgReq[INetMsgReq["INMR_TASK_handoverTask"] = 100016] = "INMR_TASK_handoverTask";
        //equipHandler
        INetMsgReq[INetMsgReq["INMR_EQUIP_equip"] = 100017] = "INMR_EQUIP_equip";
        INetMsgReq[INetMsgReq["INMR_EQUIP_unEquip"] = 100018] = "INMR_EQUIP_unEquip";
        //resourceHandler
        INetMsgReq[INetMsgReq["INMR_RESOURCE_loadResource"] = 100019] = "INMR_RESOURCE_loadResource";
        INetMsgReq[INetMsgReq["INMR_RESOURCE_loadAreaResource"] = 100020] = "INMR_RESOURCE_loadAreaResource";
    })(INetMsgReq = h5game.INetMsgReq || (h5game.INetMsgReq = {}));
    var INetMsgNtf;
    (function (INetMsgNtf) {
        //teamHandler
        INetMsgNtf[INetMsgNtf["INMN_TEAM_applyJoinTeamReply"] = 200001] = "INMN_TEAM_applyJoinTeamReply";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_inviteJoinTeamReply"] = 200002] = "INMN_TEAM_inviteJoinTeamReply";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_kickOut"] = 200003] = "INMN_TEAM_kickOut";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_applyJoinTeam"] = 200004] = "INMN_TEAM_applyJoinTeam";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_inviteJoinTeam"] = 200005] = "INMN_TEAM_inviteJoinTeam";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_createTeam"] = 200006] = "INMN_TEAM_createTeam";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_leaveTeam"] = 200007] = "INMN_TEAM_leaveTeam";
        INetMsgNtf[INetMsgNtf["INMN_TEAM_disbandTeam"] = 200008] = "INMN_TEAM_disbandTeam";
        //playerHandler
        INetMsgNtf[INetMsgNtf["INMN_PLAYER_changeView"] = 200009] = "INMN_PLAYER_changeView";
        INetMsgNtf[INetMsgNtf["INMN_PLAYER_npcTalk"] = 200010] = "INMN_PLAYER_npcTalk";
        //fightHandler
        INetMsgNtf[INetMsgNtf["INMN_FIGHT_useSkill"] = 200011] = "INMN_FIGHT_useSkill";
    })(INetMsgNtf = h5game.INetMsgNtf || (h5game.INetMsgNtf = {}));
    var INetMsgOn;
    (function (INetMsgOn) {
        //areaHandler
        INetMsgOn[INetMsgOn["INMO_AREA_onAddEntities"] = 300001] = "INMO_AREA_onAddEntities";
        INetMsgOn[INetMsgOn["INMO_AREA_onRemoveEntities"] = 300002] = "INMO_AREA_onRemoveEntities";
        INetMsgOn[INetMsgOn["INMO_AREA_onMove"] = 300003] = "INMO_AREA_onMove";
        INetMsgOn[INetMsgOn["INMO_AREA_onChangeArea"] = 300004] = "INMO_AREA_onChangeArea";
        INetMsgOn[INetMsgOn["INMO_AREA_onPickItem"] = 300005] = "INMO_AREA_onPickItem";
        INetMsgOn[INetMsgOn["INMO_AREA_onRemoveItem"] = 300006] = "INMO_AREA_onRemoveItem";
        INetMsgOn[INetMsgOn["INMO_AREA_onDropItems"] = 300007] = "INMO_AREA_onDropItems";
        //fightHandler
        INetMsgOn[INetMsgOn["INMO_FIGHT_onAttack"] = 300008] = "INMO_FIGHT_onAttack";
        //playerHandler
        INetMsgOn[INetMsgOn["INMO_PLAYER_onPlayerDialog"] = 300009] = "INMO_PLAYER_onPlayerDialog";
        INetMsgOn[INetMsgOn["INMO_PLAYER_onNPCTalk"] = 300010] = "INMO_PLAYER_onNPCTalk";
        INetMsgOn[INetMsgOn["INMO_PLAYER_onUpgrade"] = 300011] = "INMO_PLAYER_onUpgrade";
        INetMsgOn[INetMsgOn["INMO_PLAYER_onPathCheckout"] = 300012] = "INMO_PLAYER_onPathCheckout";
        //taskHandler
        INetMsgOn[INetMsgOn["INMO_TASK_onUpdateTaskData"] = 300013] = "INMO_TASK_onUpdateTaskData";
        INetMsgOn[INetMsgOn["INMO_TASK_onTaskCompleted"] = 300014] = "INMO_TASK_onTaskCompleted";
        INetMsgOn[INetMsgOn["INMO_TASK_onCheckoutTask"] = 300015] = "INMO_TASK_onCheckoutTask";
        //teamHandler
        INetMsgOn[INetMsgOn["INMO_TEAM_onApplyJoinTeam"] = 300016] = "INMO_TEAM_onApplyJoinTeam";
        INetMsgOn[INetMsgOn["INMO_TEAM_onInviteJoinTeam"] = 300017] = "INMO_TEAM_onInviteJoinTeam";
        INetMsgOn[INetMsgOn["INMO_TEAM_onTeammateLeaveTeam"] = 300018] = "INMO_TEAM_onTeammateLeaveTeam";
        INetMsgOn[INetMsgOn["INMO_TEAM_onDisbandTeam"] = 300019] = "INMO_TEAM_onDisbandTeam";
        INetMsgOn[INetMsgOn["INMO_TEAM_onUpdateTeam"] = 300020] = "INMO_TEAM_onUpdateTeam";
        INetMsgOn[INetMsgOn["INMO_TEAM_onTeamCaptainStatusChange"] = 300021] = "INMO_TEAM_onTeamCaptainStatusChange";
        INetMsgOn[INetMsgOn["INMO_TEAM_onTeamMemberStatusChange"] = 300022] = "INMO_TEAM_onTeamMemberStatusChange";
        INetMsgOn[INetMsgOn["INMO_TEAM_onDragMember2gameCopy"] = 300023] = "INMO_TEAM_onDragMember2gameCopy";
    })(INetMsgOn = h5game.INetMsgOn || (h5game.INetMsgOn = {}));
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var ILocalMsg;
    (function (ILocalMsg) {
        //Player
        ILocalMsg[ILocalMsg["ILM_Player_ChangeHp"] = 100001] = "ILM_Player_ChangeHp";
    })(ILocalMsg = h5game.ILocalMsg || (h5game.ILocalMsg = {}));
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    ;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var IntfcProxy = (function () {
        function IntfcProxy() {
        }
        IntfcProxy.regCnfMgr = function (impl) {
            egret.registerImplementation("ICnfMgr", impl);
        };
        IntfcProxy.getCnfMgr = function () {
            return egret.getImplementation("ICnfMgr");
        };
        IntfcProxy.regMCFtry = function (impl) {
            egret.registerImplementation("IMCFtry", impl);
        };
        IntfcProxy.getMCFtry = function () {
            return egret.getImplementation("IMCFtry");
        };
        IntfcProxy.regNetMsgHdlr = function (impl) {
            egret.registerImplementation("INetMsgHdlr", impl);
        };
        IntfcProxy.getNetMsgHdlr = function () {
            return egret.getImplementation("INetMsgHdlr");
        };
        IntfcProxy.regLocalMsgDispatcher = function (impl) {
            egret.registerImplementation("ILocalMsgDispatcher", impl);
        };
        IntfcProxy.getLocalMsgDispatcher = function () {
            return egret.getImplementation("ILocalMsgDispatcher");
        };
        IntfcProxy.regGameData = function (impl) {
            egret.registerImplementation("IGameData", impl);
        };
        IntfcProxy.getGameData = function () {
            return egret.getImplementation("IGameData");
        };
        return IntfcProxy;
    }());
    h5game.IntfcProxy = IntfcProxy;
    __reflect(IntfcProxy.prototype, "h5game.IntfcProxy");
})(h5game || (h5game = {}));
