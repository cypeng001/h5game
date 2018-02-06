namespace h5game
{

export class RESAux {
    public static releaseUnusedRes(): void {
        var codes = egret.BitmapData.$getUnusedList();
        var codeset = {};
        for(var k in codes) {
            codeset[codes[k]] = true;
        }

        var keys = [];

        var texture: egret.Texture = null;
        var bitmapData: egret.BitmapData = null;

        for(var name in RES.host.state) {
            if(RES.host.state[name] == 2) {
                var data = RES.getRes(name);
                if(data instanceof egret.SpriteSheet) {
                    texture = data.$texture;
                    if(texture) {
                        bitmapData = texture.$bitmapData;
                        if(bitmapData && codeset[bitmapData.hashCode]) {
                            keys.push(name);
                        }
                    }
                }
                else if(data instanceof egret.Texture) {
                    bitmapData = data.$bitmapData;
                    if(bitmapData && codeset[bitmapData.hashCode]) {
                        keys.push(name);
                    }
                }
            }
        }

        for(var k in keys) {
            RES.destroyRes(keys[k]);
        }
    }
}

}