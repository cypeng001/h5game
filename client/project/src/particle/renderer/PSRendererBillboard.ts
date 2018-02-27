class PSRendererBillboard extends PSRenderer {
    private _bitmapNodeList: egret.sys.BitmapNode[] = [];

    constructor(technique: PSTechnique) {
		super(technique);
    }

    public render(renderNode: egret.sys.GroupNode): void {
        this.updateTexture();
        this.updateFilter();

        if(!this._texture) {
            return;
        }

        var imageWidth = this._texture.$sourceWidth;
        var imageHeight = this._texture.$sourceHeight;

        var particleList = this._technique.getActiveParticleList();
        for(var i = 0; i < particleList.length; ++i) {
            var particle = particleList[i];

            if(particle.width <= 0 || particle.height <= 0) {
                continue;
            }

            var bitmapNode = this._bitmapNodeList[i];
            if(!bitmapNode) {
                bitmapNode = this._bitmapNodeList[i] = new egret.sys.BitmapNode;
                (<egret.sys.GroupNode>renderNode).addNode(bitmapNode);
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