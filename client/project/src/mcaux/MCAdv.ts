class MCAdv extends egret.MovieClip {
    public mcst: MCST = MCST.LOAD;

    constructor(movieClipData?: egret.MovieClipData) {
        super(movieClipData);
    }

    public gotoAndPlay(frame: string | number, playTimes: number = 0): void {
        if(this.mcst != MCST.LOAD) {
            return;
        }
        super.gotoAndPlay(frame, playTimes);
    }

    public gotoAndStop(frame: string | number): void {
        if(this.mcst != MCST.LOAD) {
            return;
        }
        super.gotoAndStop(frame);
    }
}