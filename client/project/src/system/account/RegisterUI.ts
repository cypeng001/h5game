/**
 * Created by egret on 2016/1/26.
 */

class RegisterUI extends eui.Component{

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/registerUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tRegisterUI uiCompHandler" );

        this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("RegisterUI.btnReturn TOUCH_TAP"); 

            this.dispatchEventWith(GameEvents.EVT_ACCOUNT_SWITCH_LAYER, false, AccountLayerType.ALT_Login);
        }, this );

        this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            var strUserName = this.editUserName.text;
            var strPassword1 = this.editPassword1.text;
            var strPassword2 = this.editPassword2.text;
            
            this.requestRegister(strUserName,strPassword1,strPassword2);
        }, this );
    }

    private requestRegister(UserName:string,PassWord1:string,PassWord2:string):void{
         console.log("requestRegister",UserName,PassWord1,PassWord2); 

    }

    private btnReturn: eui.Button;
    private btnRegister: eui.Button;
    private editUserName: eui.TextInput;
    private editPassword1: eui.TextInput;
    private editPassword2: eui.TextInput;
}