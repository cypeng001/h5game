/**
 * Created by egret on 2016/1/26.
 */

class LoginUI extends eui.Component{

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tLoginUI uiCompHandler" );

        this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            var username = this.editUserName.text;
            var password = this.editPassword.text;
        
            this.requestLogin(username, password);
        }, this );

        this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("LoginUI.btnRegister TOUCH_TAP"); 

            this.dispatchEventWith(GameEvents.EVT_ACCOUNT_SWITCH_LAYER, false, AccountLayerType.ALT_Register);
        }, this );

        var username = egret.localStorage.getItem("username");
        var password = egret.localStorage.getItem("password");
        if(username && password) {
            this.editUserName.text = username;
            this.editPassword.text = password;
        }
    }

    private requestLogin(username: string, password: string): void {
         console.log("requestLogin", username, password); 

         h5game.PhpUtil.post(window["SERVER_CNF"]["PLAT_URL"] + "login", {username: username, password: password}, 
            (data) => {
                console.log("testPhp data:", data);

                if (data.code === 501) {
                    alert('Username or password is invalid!');
                    return;
                }

                if (data.code !== 200) {
                    alert('Username is not exists!');
                    return;
                }

                egret.localStorage.setItem("username", username);
                egret.localStorage.setItem("password", password);

                g_gameData.platData.uid = data.uid;
                g_gameData.platData.token = data.token;

                LoginLogic.authEntry();
            },
            (event) => {
                console.log("testPhp error event:", event);
            },
            this);
    }

    private btnLogin: eui.Button;
    private btnRegister: eui.Button;
    private editUserName: eui.TextInput;
    private editPassword: eui.TextInput;
}