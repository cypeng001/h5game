class PSRenderer {
    protected _technique: PSTechnique;

    protected _textureName: string;
    protected _addPowerRatio: number = 0;
    protected _matType: number = 0;

    protected _texture: egret.Texture;
    protected _textureDirty: boolean = true;

    public static getTexturePath(name: string): string {
        return RES.config.resourceRoot + "particle/" + name + ".png";
    }

    constructor(technique: PSTechnique) {
        this._technique = technique;
    }

    public setTextureName(textureName: string): void {
        if(this._textureName == textureName) {
            return;
        }
        this._textureName = textureName;

        this._textureDirty = true;
    }

    public setAddPowerRatio(addPowerRatio: number): void {
        this._addPowerRatio = addPowerRatio;
    }

    public setMatType(matType: number): void {
        this._matType = matType;
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

    public render(renderNode: egret.sys.GroupNode): void {
        
    }
}