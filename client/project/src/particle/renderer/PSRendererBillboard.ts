class PSRendererBillboard extends PSRenderer {

    public static readonly BillboardOrigin = {
        TOP_LEFT: 0,
        TOP_CENTER: 1,
        TOP_RIGHT: 2,
        CENTER_LEFT: 3,
        CENTER: 4,
        CENTER_RIGHT: 5,
        BOTTOM_LEFT: 6,
        BOTTOM_CENTER: 7,
        BOTTOM_RIGHT: 8,
    };

    private _originType: number = PSRendererBillboard.BillboardOrigin.CENTER;

    constructor(technique: PSTechnique) {
		super(technique);
    }

    public setOriginType(originType: number): void {
        this._originType = originType;
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

        renderNode.matrix = this._technique.matrix;
        
        var imageWidth = this._texture.$sourceWidth;
        var imageHeight = this._texture.$sourceHeight;

        var regX = 0;
        var regY = 0;

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

            switch(this._originType) {
                case PSRendererBillboard.BillboardOrigin.TOP_LEFT: {
                    regX = particle.width;
                    regY = particle.height;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.TOP_CENTER: {
                    regX = particle.width / 2;
                    regY = particle.height;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.TOP_RIGHT: {
                    regX = 0;
                    regY = particle.height;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.CENTER_LEFT: {
                    regX = particle.width;
                    regY = particle.height / 2;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.CENTER_RIGHT: {
                    regX = 0;
                    regY = particle.height / 2;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.BOTTOM_LEFT: {
                    regX = particle.width;
                    regY = 0;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.BOTTOM_CENTER: {
                    regX = particle.width / 2;
                    regY = 0;
                    break;
                }
                case PSRendererBillboard.BillboardOrigin.BOTTOM_RIGHT: {
                    regX = 0;
                    regY = 0;
                    break;
                }
                default: {
                    regX = particle.width / 2;
                    regY = particle.height / 2;
                }
            }

            bitmapNode.matrix = particle.$getMatrix(regX, regY);

            bitmapNode.filter = this._filter;
        }
    }
}