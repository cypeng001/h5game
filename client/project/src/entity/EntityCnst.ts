enum EntityType {
    ET_PLAYER       = 1,
};

enum ActorActionState {
    AAS_STANDFRONT       = 1,
    AAS_STANDBACK        = 2,
    AAS_RUNFRONT         = 3,
    AAS_RUNBACK          = 4,
    AAS_ATTACKFRONT      = 5,
    AAS_ATTACKBACK       = 6,
};

enum ActorDir {
    AD_EASTSOUTH        = 1,
    AD_EASTNORTH        = 2,
    AD_WESTSOUTH        = 3,
    AD_WESTNORTH        = 4,
};

var ENTITY_POS_SCALE    = 0.5;