class PSRendererBillboard extends PSRenderer {
    private _bitmapNodeList: egret.sys.NormalBitmapNode[] = [];

    constructor(technique: PSTechnique) {
		super(technique);
    }

    public render(renderNode: egret.sys.GroupNode): void {
        this.updateTexture();

        if(!this._texture) {
            return;
        }

        var particleList = this._technique.getActiveParticleList();
        for(var i = 0; i < particleList.length; ++i) {
            var particle = particleList[i];

            var bitmapNode = this._bitmapNodeList[i];
            if(!bitmapNode) {
                bitmapNode = this._bitmapNodeList[i] = new egret.sys.NormalBitmapNode;
                bitmapNode.image = this._texture.$bitmapData;
                bitmapNode.imageWidth = this._texture.$sourceWidth;
                bitmapNode.imageHeight = this._texture.$sourceHeight;
            }
            //bitmapNode.drawImage()
        }
    }
}