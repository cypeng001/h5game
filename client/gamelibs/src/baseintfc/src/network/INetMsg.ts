namespace h5game
{

export enum INetMsgReq {
    //gateHandler
    INMR_GATE_queryEntry   = 100001,

    //timeSyncHandler
    INMR_TIME_timeSync,

    //entryHandler
    INMR_ENTRY_entry,
    
    //roleHandler
    INMR_ROLE_createPlayer,

    //playerHandler
    INMR_PLAYER_enterScene,
    INMR_PLAYER_changeArea,
    INMR_PLAYER_move,
    INMR_PLAYER_dropItem,
    INMR_PLAYER_useItem,
    INMR_PLAYER_pickItem,
    INMR_PLAYER_learnSkill,
    INMR_PLAYER_upgradeSkill,

    //fight
    INMR_FIGHT_attack,

    //taskHandler
    INMR_TASK_getNewTask,
    INMR_TASK_startTask,
    INMR_TASK_handoverTask,

    //equipHandler
    INMR_EQUIP_equip,
    INMR_EQUIP_unEquip,

    //resourceHandler
    INMR_RESOURCE_loadResource,
    INMR_RESOURCE_loadAreaResource,
}

export enum INetMsgNtf {
    //teamHandler
    INMN_TEAM_applyJoinTeamReply   = 200001,
    INMN_TEAM_inviteJoinTeamReply,
    INMN_TEAM_kickOut,
    INMN_TEAM_applyJoinTeam,
    INMN_TEAM_inviteJoinTeam,
    INMN_TEAM_createTeam,
    INMN_TEAM_leaveTeam,
    INMN_TEAM_disbandTeam,

    //playerHandler
    INMN_PLAYER_changeView,
    INMN_PLAYER_npcTalk,

    //fightHandler
    INMN_FIGHT_useSkill,
}

export enum INetMsgOn {
    //areaHandler
    INMO_AREA_onAddEntities   = 300001,
    INMO_AREA_onRemoveEntities,
    INMO_AREA_onMove,
    INMO_AREA_onChangeArea,
    INMO_AREA_onPickItem,
    INMO_AREA_onRemoveItem,
    INMO_AREA_onDropItems,

    //fightHandler
    INMO_FIGHT_onAttack,

    //playerHandler
    INMO_PLAYER_onPlayerDialog,
    INMO_PLAYER_onNPCTalk,
    INMO_PLAYER_onUpgrade,
    INMO_PLAYER_onPathCheckout,
    
    //taskHandler
    INMO_TASK_onUpdateTaskData,
    INMO_TASK_onTaskCompleted,
    INMO_TASK_onCheckoutTask,

    //teamHandler
    INMO_TEAM_onApplyJoinTeam,
    INMO_TEAM_onInviteJoinTeam,
    INMO_TEAM_onTeammateLeaveTeam,
    INMO_TEAM_onDisbandTeam,
    INMO_TEAM_onUpdateTeam,
    INMO_TEAM_onTeamCaptainStatusChange,
    INMO_TEAM_onTeamMemberStatusChange,

    INMO_TEAM_onDragMember2gameCopy,
    
}

}