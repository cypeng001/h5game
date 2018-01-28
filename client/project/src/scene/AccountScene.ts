//账号场景类
class AccountScene extends Scene
{
    private _bg: egret.Bitmap;
    private _layer: eui.Component;

    public constructor()
    {
        super();
    }

    public getSceneType(): number
    {
        return SceneType.ST_AccountScene;
    }

    //override
    public onEnter(): void
    {
        super.onEnter();

        this.initBg();

        this.switchLayer(AccountLayerType.ALT_Login);
    }

    //override
    public onExit(): void
    {
        this.clearBg();
        this.clearLayer();

        super.onExit();
    }

    private initBg(): void
    {
        this._bg = new egret.Bitmap(RES.getRes("account_bg_jpg"));
        this.addChild( this._bg );
    }

    private clearBg(): void
    {
        if(this._bg)
        {
            if(this._bg.parent)
            {
                this._bg.parent.removeChild(this._bg);
            }
            this._bg = null;
        }
    }

    private clearLayer(): void
    {
        if(this._layer)
        {
            if(this._layer.parent)
            {
                this._layer.parent.removeChild(this._layer);
            }
            this._layer = null;
        }
    }

    private switchLayer(type: number): void
    {
        this.clearLayer();

        switch(type)
        {
            case AccountLayerType.ALT_Login:
                this._layer = new LoginUI();
                break;
            /*
            case AccountLayerType.ALT_Register:
                this._layer = new RegisterUI();
                break;
            case AccountLayerType.ALT_CreateRole:
                this._layer = new CreateRoleUI();
                break;
            case AccountLayerType.ALT_ServerList:
                this._layer = new ServerListUI();
                break;
            case AccountLayerType.ALT_EnterGame:
                this._layer = new EnterGameUI();
                break;
            */
        }
        this.addChild(this._layer);

        this._layer.addEventListener( GameEvents.EVT_ACCOUNT_SWITCH_LAYER, ( evt:egret.Event )=>{
            console.log( "EVT_ACCOUNT_SWITCH_LAYER:", evt.data );
            this.switchLayer( evt.data );
        }, this );
    }
}