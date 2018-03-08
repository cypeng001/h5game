class CreateRoleUI extends eui.Component{
    private btnCreate: eui.Button;
    private btnProfession1: eui.Button;
    private btnProfession2: eui.Button;
    private editRoleName: eui.TextInput;

    private _roleId: number = 210;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/createRoleUISkin.exml";
    }

    private uiCompHandler():void {
        this.btnCreate.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("btnCreate TOUCH_TAP");

            var strRoleName = this.editRoleName.text;

            if(strRoleName.length == 0) {
                alert("RoleName is empty");
                return;
            }

            if(strRoleName.length > 9) {
                alert("RoleName is too long");
                return;
            }

            LoginLogic.createRole(strRoleName, this._roleId);
        }, this );

        this.btnProfession1.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("btnProfession1 TOUCH_TAP");
            this._roleId = 210;
        }, this );

        this.btnProfession2.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("btnProfession2 TOUCH_TAP");
            this._roleId = 221;
        }, this );
    }

}