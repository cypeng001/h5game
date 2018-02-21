class PSRenderer implements PSAttribute {
    private static ATTR = {
        TEXTURE_NAME: "texture_name",
    }

    protected _technique: PSTechnique;

    private _textureName: string;
    private _addPowerRatio: number;

    constructor(technique: PSTechnique) {
        this._technique = technique;
    }

    public setTextureName(textureName: string): void {
        this._textureName = textureName;
    }

    public setAddPowerRatio(addPowerRatio: number): void {
        this._addPowerRatio = addPowerRatio;
    }


    public setAttribute(key: string, value: any): void {
        switch(key) {
            case PSRenderer.ATTR.TEXTURE_NAME: {
                this._textureName = value;
                break;
            }
        }
    }

    public getAttribute(key: string): any {
        
    }
}