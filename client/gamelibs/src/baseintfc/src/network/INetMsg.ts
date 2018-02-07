namespace h5game
{

export enum INetMsgReq {
    INMR_MOVE   = 1,
}

export enum INetMsgNtf {
    INMN_NONE   = 1,
}

export enum INetMsgOn {
    INMO_onAddEntities   = 1,
    INMO_onRemoveEntities,
    INMO_onMove,
    INMO_onAttack,
}

}