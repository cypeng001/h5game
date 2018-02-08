declare namespace h5game {
    enum IMapCmdN {
        IMCN_CreateNum = 1,
    }
    enum IMapCmdQ {
        IMCQ_GetActor = 1,
    }
    interface IMapLayer {
        notify(cmd: IMapCmdN, params: any): void;
        query(cmd: IMapCmdQ, params: any): any;
    }
}
declare namespace h5game {
    interface IMCFtry {
        init(): void;
        createPool(key: string): any;
        create(key: string): any;
        recycle(): void;
        releaseInactPool(): void;
        profile(): void;
    }
}
declare namespace h5game {
    enum INetMsgReq {
        INMR_queryEntry = 100001,
        INMR_timeSync = 100002,
        INMR_entry = 100003,
        INMR_createPlayer = 100004,
        INMR_enterScene = 100005,
        INMR_changeArea = 100006,
        INMR_move = 100007,
        INMR_dropItem = 100008,
        INMR_useItem = 100009,
        INMR_pickItem = 100010,
        INMR_learnSkill = 100011,
        INMR_upgradeSkill = 100012,
        INMR_attack = 100013,
        INMR_getNewTask = 100014,
        INMR_startTask = 100015,
        INMR_handoverTask = 100016,
        INMR_equip = 100017,
        INMR_unEquip = 100018,
        INMR_loadResource = 100019,
        INMR_loadAreaResource = 100020,
    }
    enum INetMsgNtf {
        INMN_applyJoinTeamReply = 200001,
        INMN_inviteJoinTeamReply = 200002,
        INMN_kickOut = 200003,
        INMN_applyJoinTeam = 200004,
        INMN_inviteJoinTeam = 200005,
        INMN_createTeam = 200006,
        INMN_leaveTeam = 200007,
        INMN_disbandTeam = 200008,
        INMN_changeView = 200009,
        INMN_npcTalk = 200010,
        INMN_useSkill = 200011,
    }
    enum INetMsgOn {
        INMO_onAddEntities = 300001,
        INMO_onRemoveEntities = 300002,
        INMO_onMove = 300003,
        INMO_onChangeArea = 300004,
        INMO_onPickItem = 300005,
        INMO_onRemoveItem = 300006,
        INMO_onDropItems = 300007,
        INMO_onAttack = 300008,
        INMO_onPlayerDialog = 300009,
        INMO_onNPCTalk = 300010,
        INMO_onUpgrade = 300011,
        INMO_onPathCheckout = 300012,
        INMO_onUpdateTaskData = 300013,
        INMO_onTaskCompleted = 300014,
        INMO_onCheckoutTask = 300015,
        INMO_onApplyJoinTeam = 300016,
        INMO_onInviteJoinTeam = 300017,
        INMO_onTeammateLeaveTeam = 300018,
        INMO_onDisbandTeam = 300019,
        INMO_onUpdateTeam = 300020,
        INMO_onTeamCaptainStatusChange = 300021,
        INMO_onTeamMemberStatusChange = 300022,
        INMO_onDragMember2gameCopy = 300023,
    }
}
declare namespace h5game {
    type INetMsgCallback = (response: any) => void;
    type INetMsgReqHdlr = (msg: any, callback: INetMsgCallback) => void;
    type INetMsgNtfHdlr = (msg: any) => void;
    interface INetMsgHdlr {
        regReqHdlr(id: INetMsgReq, INetMsgReqHdlr: any): void;
        regNtfHdlr(id: INetMsgNtf, INetMsgNtfHdlr: any): void;
        requestMsg(id: INetMsgReq, msg: any, callback: INetMsgCallback): void;
        notifyMsg(id: INetMsgNtf, msg: any): void;
        addMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;
        removeMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;
        hasMsgHdlr(id: INetMsgReq | INetMsgOn, callback: INetMsgCallback): boolean;
        clearMsgHdlr(id: INetMsgReq | INetMsgOn): void;
        dispatchMsg(id: INetMsgReq | INetMsgOn, response: any): void;
    }
}
declare namespace h5game {
    enum ILocalMsg {
        ILM_Player_ChangeHp = 100001,
    }
}
declare namespace h5game {
    type ILocalMsgCallback = (msg: any) => void;
    interface ILocalMsgDispatcher {
        addMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;
        removeMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;
        hasMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;
        clearMsgListener(id: ILocalMsg): void;
        dispatchMsg(id: ILocalMsg, msg: any): void;
    }
}
declare namespace h5game {
    interface ICnfMgr {
        init(): void;
        getConfig(configName: string): any;
        getMapConfig(mapID: number): any;
    }
}
