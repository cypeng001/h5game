class MainUI extends PanelUILayer {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
        this.skinName = "resource/custom_skins/mainUISkin.exml";
    }

    private onUIComplete():void {
        this.roleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoleBtnTab, this);
        this.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtnTab, this);
        this.petBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetBtnTab, this);
        this.socialBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSocialBtnTab, this);
    }

    public onEnter(): void
    {
        super.onEnter();
    }

    public onExit(): void
    {
        super.onExit();
    }

    protected onRoleBtnTab(): void {
        console.log("onRoleBtnTab");

        UILayerMgr.getInstance().loadUILayer(UILayerID.UIID_ROLE);
    }

    protected onEquipBtnTab(): void {
        console.log("onEquipBtnTab");
    }

    protected onPetBtnTab(): void {
        console.log("onPetBtnTab");
    }

    protected onSocialBtnTab(): void {
        console.log("onSocialBtnTab");
    }

	private roleBtn: eui.Button;
    private equipBtn: eui.Button;
    private petBtn: eui.Button;
    private socialBtn: eui.Button;
	
}