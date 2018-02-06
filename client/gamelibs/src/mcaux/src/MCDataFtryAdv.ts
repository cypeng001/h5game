namespace h5game
{

export class MCDataFtryAdv extends egret.MovieClipDataFactory {
    constructor(movieClipDataSet?: any, texture?: egret.Texture) {
        super(movieClipDataSet, texture);
    }

    protected setTexture(value: egret.Texture): void {
        super.setTexture(value);

        if(this.enableCache) {
            for(var k in this.$mcDataCache) {
                var mcdata: egret.MovieClipData = <egret.MovieClipData>this.$mcDataCache[k];
                mcdata.spriteSheet = this.$spriteSheet;
            }
        }
    }
}

}