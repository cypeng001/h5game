class RegisterUI extends eui.Component{
    private btnReturn: eui.Button;
    private btnRegister: eui.Button;
    private editUserName: eui.TextInput;
    private editPassword1: eui.TextInput;
    private editPassword2: eui.TextInput;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/registerUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tRegisterUI uiCompHandler" );

        this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            console.log("RegisterUI.btnReturn TOUCH_TAP"); 

            GameApp.getInstance().switchAccountSceneLayer(AccountLayerType.ALT_Login);
        }, this );

        this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            var strUserName = this.editUserName.text;
            var strPassword1 = this.editPassword1.text;
            var strPassword2 = this.editPassword2.text;

            if(strPassword1 != strPassword2) {
                alert("password1 != password2 ");
                return;
            }
            
            this.requestRegister(strUserName, strPassword1);
        }, this );
    }

    private requestRegister(username: string, password: string): void{
        h5game.PhpUtil.post(window["SERVER_CNF"]["PLAT_URL"] + "register", {name: username, password: password}, 
            (data) => {
                console.log("requestRegister data:", data);

                if (data.code === 501) {
                    alert('Username already exists!');
                    return;
                }

                if (data.code !== 200) {
                    alert('Register fail!');
                    return;
                }

                egret.localStorage.setItem("username", username);
                egret.localStorage.setItem("password", password);

                var gameData = h5game.IntfcProxy.getGameData();
                gameData.platData.uid = data.uid;
                gameData.platData.token = data.token;

                LoginLogic.authEntry();
            },
            (event) => {
                console.log("requestRegister error event:", event);
            },
            this);
    }
}