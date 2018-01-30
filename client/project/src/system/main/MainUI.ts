class MainUI extends PanelUILayer {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComp, this);
        this.skinName = "resource/custom_skins/mainUISkin.exml";
    }

    private onUIComp():void {
        this.roleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoleBtnTab, this);
        this.equipmentBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipmentBtnTab, this);
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
    }

    protected onEquipmentBtnTab(): void {
        console.log("onEquipmentBtnTab");
    }

    protected onPetBtnTab(): void {
        console.log("onPetBtnTab");
    }

    protected onSocialBtnTab(): void {
        console.log("onSocialBtnTab");
    }

	private roleBtn: eui.Button;
    private equipmentBtn: eui.Button;
    private petBtn: eui.Button;
    private socialBtn: eui.Button;
	
}