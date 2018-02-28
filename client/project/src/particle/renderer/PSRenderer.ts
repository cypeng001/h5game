class PSRenderer {
    public static MAT_TYPE = {
        NORMAL: 0,
        COLOR_ENHANCE: 1,
    };

    protected _technique: PSTechnique;
    protected _renderNode: egret.sys.GroupNode;

    protected _textureName: string;
    protected _enhanceAlpha: number = 0;
    protected _matType: number = PSRenderer.MAT_TYPE.NORMAL;

    protected _texture: egret.Texture;
    protected _textureDirty: boolean = true;

    protected _filter: egret.ColorEnhanceFilter;
    protected _fliterDirty: boolean = true;

    public static getTexturePath(name: string): string {
        return RES.config.resourceRoot + "particle/" + name + ".png";
    }

    constructor(technique: PSTechnique) {
        this._technique = technique;
        this._renderNode = new egret.sys.GroupNode;
    }

    public setTextureName(textureName: string): void {
        if(this._textureName == textureName) {
            return;
        }
        this._textureName = textureName;

        this._textureDirty = true;
    }

    public setEnhanceAlpha(enhanceAlpha: number): void {
        this._enhanceAlpha = enhanceAlpha;

        this._fliterDirty = true;
    }

    public setMatType(matType: number): void {
        this._matType = matType;

        this._fliterDirty = true;
    }

    protected updateTexture(): void {
        if(!this._textureDirty) {
            return;
        }
        this._textureDirty = false;

        var adapter = egret.getImplementation("eui.IAssetAdapter");
        adapter.getAsset(PSRenderer.getTexturePath(this._textureName), (content) => {
            this._texture = content;
        }, this);
    }

    protected updateFilter(): void {
        if(!this._fliterDirty) {
            return;
        }
        this._fliterDirty = false;

        if(this._matType == PSRenderer.MAT_TYPE.COLOR_ENHANCE) {
            this._filter = new egret.ColorEnhanceFilter(this._enhanceAlpha);
        }
        else {
            this._filter = null;
        }
    }

    public render(): void {
        
    }

    public getRenderNode(): egret.sys.GroupNode {
        return this._renderNode;
    }
}