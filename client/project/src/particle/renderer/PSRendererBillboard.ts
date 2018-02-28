class PSRendererBillboard extends PSRenderer {
    constructor(technique: PSTechnique) {
		super(technique);
    }

    public render(): void {
        this.updateTexture();
        this.updateFilter();

        if(!this._texture) {
            return;
        }

        var renderNode = this._renderNode;
        renderNode.blendMode = (this._matType == PSRenderer.MAT_TYPE.NORMAL) 
                ? 3     //lighter-in 
                : 0;    //source-over

        var imageWidth = this._texture.$sourceWidth;
        var imageHeight = this._texture.$sourceHeight;

        var particleList = this._technique.getActiveParticleList();
        for(var i = 0, bimapNodeIdx = 0; i < particleList.length; ++i) {
            var particle = particleList[i];

            if(particle.width <= 0 || particle.height <= 0) {
                continue;
            }

            var bitmapNode: egret.sys.BitmapNode = <egret.sys.BitmapNode>(renderNode.getNode(bimapNodeIdx++));
            if(!bitmapNode) {
                bitmapNode = new egret.sys.BitmapNode;
                renderNode.addNode(bitmapNode);
            }

            bitmapNode.image = this._texture.$bitmapData;
            bitmapNode.imageWidth = imageWidth;
            bitmapNode.imageHeight = imageHeight;

            var sourceX = particle.left * imageWidth;
            var sourceY = particle.top * imageHeight;
            var sourceW = (particle.right - particle.left) * imageWidth;
            var sourceH = (particle.bottom - particle.top) * imageHeight;
            bitmapNode.drawImage(sourceX, sourceY, sourceW, sourceH, 
                0, 0, particle.width, particle.height);
            
            bitmapNode.red = particle.color[0];
            bitmapNode.green = particle.color[1];
            bitmapNode.blue = particle.color[2];
            bitmapNode.alpha = particle.color[3];

            bitmapNode.matrix = particle.$getMatrix(particle.width / 2, particle.height / 2);

            bitmapNode.filter = this._filter;
        }
    }
}