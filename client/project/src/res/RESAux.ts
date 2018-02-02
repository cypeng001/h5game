class RESAux {
    public static releaseUnusedTexture(): void {
        var hashCodes = egret.BitmapData.$getUnusedList();
        var keys = [];
        for(var name in RES.host.state) {
            if(RES.host.state[name] == 2) {
                var data = RES.getRes(name);
                if(data instanceof egret.Texture) {
                    var bitmapData = data.$bitmapData;
                    if(hashCodes.indexOf(bitmapData.hashCode) >= 0) {
                        keys.push(name);
                    }
                }
            }
        }

        console.log("releaseUnusedTexture:", keys);

        for(var k in keys) {
            RES.destroyRes(keys[k]);
        }
    }
}