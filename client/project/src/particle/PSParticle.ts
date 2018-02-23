class PSParticle {
    position: PSVec3 = [0, 0, 0];
    direction: PSVec3 = [1, 0, 0];
    timeLive: number = 0;
    totalLive: number = 1;
    liveForever: boolean = false;
    angle: number = 0;
    color: PSColor4F = [0, 0, 0, 0];
    //enabled: boolean;
    width: number = 64;
    height: number = 64;
    depth: number = 64;

    left: number = 0;
    top: number = 0;
    right: number = 0;
    bottom: number = 0;
    rotationRandomValue: number = 0;

    startFrame: number = 0;

    emitter: PSEmitter;
}