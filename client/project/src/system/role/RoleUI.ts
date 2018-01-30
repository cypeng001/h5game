class RoleUI extends PanelUILayer {

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.onUIComplete, this );
        this.skinName = "resource/custom_skins/roleUISkin.exml";
    }

    private onUIComplete():void {
        this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("RoleUI.btnClose TOUCH_TAP"); 

            UILayerMgr.getInstance().releaseUILayer(this);
        }, this );
    }

    private btnClose: eui.Button;
}