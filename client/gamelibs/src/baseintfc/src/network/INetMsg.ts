namespace h5game
{

export enum INetMsgReq {
    //gateHandler
    INMR_queryEntry   = 100001,

    //timeSyncHandler
    INMR_timeSync,

    //entryHandler
    INMR_entry,
    
    //roleHandler
    INMR_createPlayer,

    //playerHandler
    INMR_enterScene,
    INMR_changeArea,
    INMR_move,
    INMR_dropItem,
    INMR_useItem,
    INMR_pickItem,
    INMR_learnSkill,
    INMR_upgradeSkill,

    //fight
    INMR_attack,

    //taskHandler
    INMR_getNewTask,
    INMR_startTask,
    INMR_handoverTask,

    //equipHandler
    INMR_equip,
    INMR_unEquip,

    //resourceHandler
    INMR_loadResource,
    INMR_loadAreaResource,
}

export enum INetMsgNtf {
    //teamHandler
    INMN_applyJoinTeamReply   = 200001,
    INMN_inviteJoinTeamReply,
    INMN_kickOut,
    INMN_applyJoinTeam,
    INMN_inviteJoinTeam,
    INMN_createTeam,
    INMN_leaveTeam,
    INMN_disbandTeam,

    //playerHandler
    INMN_changeView,
    INMN_npcTalk,

    //fightHandler
    INMN_useSkill,
}

export enum INetMsgOn {
    //areaHandler
    INMO_onAddEntities   = 300001,
    INMO_onRemoveEntities,
    INMO_onMove,
    INMO_onChangeArea,
    INMO_onPickItem,
    INMO_onRemoveItem,
    INMO_onDropItems,

    //fightHandler
    INMO_onAttack,

    //playerHandler
    INMO_onPlayerDialog,
    INMO_onNPCTalk,
    INMO_onUpgrade,
    INMO_onPathCheckout,
    
    //taskHandler
    INMO_onUpdateTaskData,
    INMO_onTaskCompleted,
    INMO_onCheckoutTask,

    //teamHandler
    INMO_onApplyJoinTeam,
    INMO_onInviteJoinTeam,
    INMO_onTeammateLeaveTeam,
    INMO_onDisbandTeam,
    INMO_onUpdateTeam,
    INMO_onTeamCaptainStatusChange,
    INMO_onTeamMemberStatusChange,

    INMO_onDragMember2gameCopy,
    
}

}