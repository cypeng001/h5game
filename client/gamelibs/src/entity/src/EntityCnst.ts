namespace h5game
{

export enum EntityType {
    ET_PLAYER       = 1,
    ET_MONSTER      = 2,
    ET_NPC          = 3,
    ET_TRANSPORT    = 4,
};

export enum ActorActionState {
    AAS_STANDFRONT       = 1,
    AAS_STANDBACK        = 2,
    AAS_RUNFRONT         = 3,
    AAS_RUNBACK          = 4,
    AAS_ATTACKFRONT      = 5,
    AAS_ATTACKBACK       = 6,
};

export enum ActorDir {
    AD_EASTSOUTH        = 1,
    AD_EASTNORTH        = 2,
    AD_WESTSOUTH        = 3,
    AD_WESTNORTH        = 4,
};

export enum AttackResult {
    SUCCESS             = 1,
    KILLED              = 2,
    MISS                = 3,
    NOT_IN_RANGE        = 4,
    NO_ENOUGH_MP        = 5,
    NOT_COOLDOWN        = 6,
    ATTACKER_CONFUSED   = 7,
};

export enum ActorSpActType {
    ASAT_STAND             = 1,
};

export enum ActorStType {
    AST_NORMAL             = 1,
    AST_ATTACK             = 2,
};

}