class PSParticle {
    position: PSVec3;
    direction: PSVec3;
    time_live: number;
    total_live: number;
    live_forever: boolean;
    angle: number;
    color: PSColor4F;
    enabled: boolean;
    width: number;
    height: number;
    depth: number;

    left: number;
    top: number;
    right: number;
    bottom: number;
    rotation_random_value: number;

    start_frame: number;

    parent_emitter: PSEmitter;
}