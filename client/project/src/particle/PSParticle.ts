class PSParticle {
    position: PSVec3 = [0, 0, 0];
    direction: PSVec3 = [1, 0, 0];
    timeLive: number = 0;
    totalLive: number = 1;
    liveForever: boolean = false;
    angle: number = 0;
    color: PSColor4F = [1, 1, 1, 1];
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

    scale: number = 1;

    timeFactor: number = 1;

    emitter: PSEmitter;

    private matrix:egret.Matrix = new egret.Matrix();

    public $getMatrix(regX:number, regY:number):egret.Matrix {
            var matrix = this.matrix;
            matrix.identity();
            if (this.angle % 360) {
                var r = this.angle;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }
            matrix.append(cos * this.scale, sin * this.scale, -sin * this.scale, cos * this.scale, 
                this.position[0], -this.position[1]);

            if (regX || regY) {
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        }
}