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
        INetMsgReq[INetMsgReq["INMR_queryEntry"] = 100001] = "INMR_queryEntry";
        //timeSyncHandler
        INetMsgReq[INetMsgReq["INMR_timeSync"] = 100002] = "INMR_timeSync";
        //entryHandler
        INetMsgReq[INetMsgReq["INMR_entry"] = 100003] = "INMR_entry";
        //roleHandler
        INetMsgReq[INetMsgReq["INMR_createPlayer"] = 100004] = "INMR_createPlayer";
        //playerHandler
        INetMsgReq[INetMsgReq["INMR_enterScene"] = 100005] = "INMR_enterScene";
        INetMsgReq[INetMsgReq["INMR_changeArea"] = 100006] = "INMR_changeArea";
        INetMsgReq[INetMsgReq["INMR_move"] = 100007] = "INMR_move";
        INetMsgReq[INetMsgReq["INMR_dropItem"] = 100008] = "INMR_dropItem";
        INetMsgReq[INetMsgReq["INMR_useItem"] = 100009] = "INMR_useItem";
        INetMsgReq[INetMsgReq["INMR_pickItem"] = 100010] = "INMR_pickItem";
        INetMsgReq[INetMsgReq["INMR_learnSkill"] = 100011] = "INMR_learnSkill";
        INetMsgReq[INetMsgReq["INMR_upgradeSkill"] = 100012] = "INMR_upgradeSkill";
        //fight
        INetMsgReq[INetMsgReq["INMR_attack"] = 100013] = "INMR_attack";
        //taskHandler
        INetMsgReq[INetMsgReq["INMR_getNewTask"] = 100014] = "INMR_getNewTask";
        INetMsgReq[INetMsgReq["INMR_startTask"] = 100015] = "INMR_startTask";
        INetMsgReq[INetMsgReq["INMR_handoverTask"] = 100016] = "INMR_handoverTask";
        //equipHandler
        INetMsgReq[INetMsgReq["INMR_equip"] = 100017] = "INMR_equip";
        INetMsgReq[INetMsgReq["INMR_unEquip"] = 100018] = "INMR_unEquip";
        //resourceHandler
        INetMsgReq[INetMsgReq["INMR_loadResource"] = 100019] = "INMR_loadResource";
        INetMsgReq[INetMsgReq["INMR_loadAreaResource"] = 100020] = "INMR_loadAreaResource";
    })(INetMsgReq = h5game.INetMsgReq || (h5game.INetMsgReq = {}));
    var INetMsgNtf;
    (function (INetMsgNtf) {
        //teamHandler
        INetMsgNtf[INetMsgNtf["INMN_applyJoinTeamReply"] = 200001] = "INMN_applyJoinTeamReply";
        INetMsgNtf[INetMsgNtf["INMN_inviteJoinTeamReply"] = 200002] = "INMN_inviteJoinTeamReply";
        INetMsgNtf[INetMsgNtf["INMN_kickOut"] = 200003] = "INMN_kickOut";
        INetMsgNtf[INetMsgNtf["INMN_applyJoinTeam"] = 200004] = "INMN_applyJoinTeam";
        INetMsgNtf[INetMsgNtf["INMN_inviteJoinTeam"] = 200005] = "INMN_inviteJoinTeam";
        INetMsgNtf[INetMsgNtf["INMN_createTeam"] = 200006] = "INMN_createTeam";
        INetMsgNtf[INetMsgNtf["INMN_leaveTeam"] = 200007] = "INMN_leaveTeam";
        INetMsgNtf[INetMsgNtf["INMN_disbandTeam"] = 200008] = "INMN_disbandTeam";
        //playerHandler
        INetMsgNtf[INetMsgNtf["INMN_changeView"] = 200009] = "INMN_changeView";
        INetMsgNtf[INetMsgNtf["INMN_npcTalk"] = 200010] = "INMN_npcTalk";
        //fightHandler
        INetMsgNtf[INetMsgNtf["INMN_useSkill"] = 200011] = "INMN_useSkill";
    })(INetMsgNtf = h5game.INetMsgNtf || (h5game.INetMsgNtf = {}));
    var INetMsgOn;
    (function (INetMsgOn) {
        //areaHandler
        INetMsgOn[INetMsgOn["INMO_onAddEntities"] = 300001] = "INMO_onAddEntities";
        INetMsgOn[INetMsgOn["INMO_onRemoveEntities"] = 300002] = "INMO_onRemoveEntities";
        INetMsgOn[INetMsgOn["INMO_onMove"] = 300003] = "INMO_onMove";
        INetMsgOn[INetMsgOn["INMO_onChangeArea"] = 300004] = "INMO_onChangeArea";
        INetMsgOn[INetMsgOn["INMO_onPickItem"] = 300005] = "INMO_onPickItem";
        INetMsgOn[INetMsgOn["INMO_onRemoveItem"] = 300006] = "INMO_onRemoveItem";
        INetMsgOn[INetMsgOn["INMO_onDropItems"] = 300007] = "INMO_onDropItems";
        //fightHandler
        INetMsgOn[INetMsgOn["INMO_onAttack"] = 300008] = "INMO_onAttack";
        //playerHandler
        INetMsgOn[INetMsgOn["INMO_onPlayerDialog"] = 300009] = "INMO_onPlayerDialog";
        INetMsgOn[INetMsgOn["INMO_onNPCTalk"] = 300010] = "INMO_onNPCTalk";
        INetMsgOn[INetMsgOn["INMO_onUpgrade"] = 300011] = "INMO_onUpgrade";
        INetMsgOn[INetMsgOn["INMO_onPathCheckout"] = 300012] = "INMO_onPathCheckout";
        //taskHandler
        INetMsgOn[INetMsgOn["INMO_onUpdateTaskData"] = 300013] = "INMO_onUpdateTaskData";
        INetMsgOn[INetMsgOn["INMO_onTaskCompleted"] = 300014] = "INMO_onTaskCompleted";
        INetMsgOn[INetMsgOn["INMO_onCheckoutTask"] = 300015] = "INMO_onCheckoutTask";
        //teamHandler
        INetMsgOn[INetMsgOn["INMO_onApplyJoinTeam"] = 300016] = "INMO_onApplyJoinTeam";
        INetMsgOn[INetMsgOn["INMO_onInviteJoinTeam"] = 300017] = "INMO_onInviteJoinTeam";
        INetMsgOn[INetMsgOn["INMO_onTeammateLeaveTeam"] = 300018] = "INMO_onTeammateLeaveTeam";
        INetMsgOn[INetMsgOn["INMO_onDisbandTeam"] = 300019] = "INMO_onDisbandTeam";
        INetMsgOn[INetMsgOn["INMO_onUpdateTeam"] = 300020] = "INMO_onUpdateTeam";
        INetMsgOn[INetMsgOn["INMO_onTeamCaptainStatusChange"] = 300021] = "INMO_onTeamCaptainStatusChange";
        INetMsgOn[INetMsgOn["INMO_onTeamMemberStatusChange"] = 300022] = "INMO_onTeamMemberStatusChange";
        INetMsgOn[INetMsgOn["INMO_onDragMember2gameCopy"] = 300023] = "INMO_onDragMember2gameCopy";
    })(INetMsgOn = h5game.INetMsgOn || (h5game.INetMsgOn = {}));
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    ;
})(h5game || (h5game = {}));
