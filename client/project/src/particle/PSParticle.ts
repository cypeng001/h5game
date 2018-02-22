class PSParticle {
    position: PSVec3;
    direction: PSVec3;
    timeLive: number;
    totalLive: number;
    liveForever: boolean;
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
    rotationRandomValue: number;

    startFrame: number;

    emitter: PSEmitter;
}