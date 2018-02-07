namespace h5game
{

export class MapTile {
    public source: string = "";
    public image: eui.Image;

    public get x(): number {
        return this.image.x;
    }

    public get y(): number {
        return this.image.y;
    }

    public set visible(val: boolean) {
        this.image.visible = val;
    }

    public reload(): void {
        this.image.source = this.source;
    }

    public unload(): void {
        this.image.source = "";
    }
}

}