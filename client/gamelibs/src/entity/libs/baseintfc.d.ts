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
        INMR_GATE_queryEntry = 100001,
        INMR_TIME_timeSync = 100002,
        INMR_ENTRY_entry = 100003,
        INMR_ROLE_createPlayer = 100004,
        INMR_PLAYER_enterScene = 100005,
        INMR_PLAYER_changeArea = 100006,
        INMR_PLAYER_move = 100007,
        INMR_PLAYER_dropItem = 100008,
        INMR_PLAYER_useItem = 100009,
        INMR_PLAYER_pickItem = 100010,
        INMR_PLAYER_learnSkill = 100011,
        INMR_PLAYER_upgradeSkill = 100012,
        INMR_FIGHT_attack = 100013,
        INMR_TASK_getNewTask = 100014,
        INMR_TASK_startTask = 100015,
        INMR_TASK_handoverTask = 100016,
        INMR_EQUIP_equip = 100017,
        INMR_EQUIP_unEquip = 100018,
        INMR_RESOURCE_loadResource = 100019,
        INMR_RESOURCE_loadAreaResource = 100020,
    }
    enum INetMsgNtf {
        INMN_TEAM_applyJoinTeamReply = 200001,
        INMN_TEAM_inviteJoinTeamReply = 200002,
        INMN_TEAM_kickOut = 200003,
        INMN_TEAM_applyJoinTeam = 200004,
        INMN_TEAM_inviteJoinTeam = 200005,
        INMN_TEAM_createTeam = 200006,
        INMN_TEAM_leaveTeam = 200007,
        INMN_TEAM_disbandTeam = 200008,
        INMN_PLAYER_changeView = 200009,
        INMN_PLAYER_npcTalk = 200010,
        INMN_FIGHT_useSkill = 200011,
    }
    enum INetMsgOn {
        INMO_AREA_onAddEntities = 300001,
        INMO_AREA_onRemoveEntities = 300002,
        INMO_AREA_onMove = 300003,
        INMO_AREA_onChangeArea = 300004,
        INMO_AREA_onPickItem = 300005,
        INMO_AREA_onRemoveItem = 300006,
        INMO_AREA_onDropItems = 300007,
        INMO_FIGHT_onAttack = 300008,
        INMO_PLAYER_onPlayerDialog = 300009,
        INMO_PLAYER_onNPCTalk = 300010,
        INMO_PLAYER_onUpgrade = 300011,
        INMO_PLAYER_onPathCheckout = 300012,
        INMO_TASK_onUpdateTaskData = 300013,
        INMO_TASK_onTaskCompleted = 300014,
        INMO_TASK_onCheckoutTask = 300015,
        INMO_TEAM_onApplyJoinTeam = 300016,
        INMO_TEAM_onInviteJoinTeam = 300017,
        INMO_TEAM_onTeammateLeaveTeam = 300018,
        INMO_TEAM_onDisbandTeam = 300019,
        INMO_TEAM_onUpdateTeam = 300020,
        INMO_TEAM_onTeamCaptainStatusChange = 300021,
        INMO_TEAM_onTeamMemberStatusChange = 300022,
        INMO_TEAM_onDragMember2gameCopy = 300023,
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
declare namespace h5game {
    interface IPSFtry {
        init(): void;
        create(key: string): any;
    }
}
declare namespace h5game {
    class IntfcProxy {
        static regCnfMgr(impl: ICnfMgr): void;
        static getCnfMgr(): ICnfMgr;
        static regMCFtry(impl: IMCFtry): void;
        static getMCFtry(): IMCFtry;
        static regPSFtry(impl: IPSFtry): void;
        static getPSFtry(): IPSFtry;
        static regNetMsgHdlr(impl: INetMsgHdlr): void;
        static getNetMsgHdlr(): INetMsgHdlr;
        static regLocalMsgDispatcher(impl: ILocalMsgDispatcher): void;
        static getLocalMsgDispatcher(): ILocalMsgDispatcher;
        static regGameData(impl: any): void;
        static getGameData(): any;
    }
}
