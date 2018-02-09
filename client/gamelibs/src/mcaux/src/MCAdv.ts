namespace h5game
{
    
export class MCAdv extends egret.MovieClip {
    protected _key: string;
    protected _pool: MCPool = null;
    protected _mcDatas: {[key: string]: egret.MovieClipData} = {};

    public mcst: MCST = MCST.LOAD;

    constructor(movieClipData: egret.MovieClipData, key: string, pool: MCPool) {
        super(movieClipData);

        this._key = key;
        this._pool = pool;
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

    public playAnimation(frame: string, playTimes: number = 0): void {
        if(this.mcst != MCST.LOAD) {
            return;
        }

        if(this._pool.getMCDataCnt() > 1) {
            var mcData = this._mcDatas[frame];
            if(!mcData) {
                mcData = this._mcDatas[frame] = this._pool.createMovieClipData(this._key + "_" + frame);
            }
            this.movieClipData = mcData;
        }

        this.gotoAndPlay(frame, playTimes);
    }
}

}