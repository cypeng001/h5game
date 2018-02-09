class NetMsgHdlr implements h5game.INetMsgHdlr {
    private static WARN_CB_COUNT: number = 10;

    private _msgCallbacks: {[key: number]: h5game.INetMsgCallback[]} = {};

    private _reqHdlrs: {[key: number]: h5game.INetMsgReqHdlr} = {};
    private _ntfHdlrs: {[key: number]: h5game.INetMsgNtfHdlr} = {};

    regReqHdlr(id: h5game.INetMsgReq, reqHdlr: h5game.INetMsgReqHdlr): void {
        if(this._reqHdlrs[id]) {
            console.warn("NetMsgHdlr.regReqHdlr id already exist", id);
            return;
        }
        this._reqHdlrs[id] = reqHdlr;
    }

    regNtfHdlr(id: h5game.INetMsgNtf, ntfHdlr: h5game.INetMsgNtfHdlr): void {
        if(this._ntfHdlrs[id]) {
            console.warn("NetMsgHdlr.regNtfHdlr id already exist", id);
            return;
        }
        this._ntfHdlrs[id] = ntfHdlr;
    }

    requestMsg(id: h5game.INetMsgReq, msg: any, callback: h5game.INetMsgCallback): void {
        var reqHdlr = this._reqHdlrs[id];
        if(!reqHdlr) {
            console.warn("NetMsgHdlr.requestMsg id invalid", id);
            return;
        }

        var self = this;
        reqHdlr(msg, function(response: any): void {
            self.dispatchMsg(id, response);
            h5game.BaseUtil.callFunc(callback, response);
        });
    }

    notifyMsg(id: h5game.INetMsgNtf, msg: any): void {
        var ntfHdlr = this._ntfHdlrs[id];
        if(!ntfHdlr) {
            console.warn("NetMsgHdlr.notifyMsg id invalid", id);
            return;
        }

        ntfHdlr(msg);
    }

    addMsgHdlr(id: h5game.INetMsgReq | h5game.INetMsgOn, callback: h5game.INetMsgCallback): boolean {
        if(!id) {
            console.warn("NetMsgHdlr.addMsgHdlr id is invalid", id);
            return false;
        }
        
        if(this.hasMsgHdlr(id, callback)) {
            console.warn("NetMsgHdlr.addMsgHdlr id already exist", id);
            return false;
        }

        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            cblist = this._msgCallbacks[id] = [];
        }

        cblist.push(callback);

        if(cblist.length > NetMsgHdlr.WARN_CB_COUNT) {
            console.warn("NetMsgHdlr.addMsgHdlr cblist is to many, forget to NetMsgHdlr.removeMsgHdlr?", id);
        }

        return true;
    }

    removeMsgHdlr(id: h5game.INetMsgReq | h5game.INetMsgOn, callback: h5game.INetMsgCallback): boolean {
        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            return false;
        }

        for(var i in cblist) {
            if(cblist[i] == callback) {
                cblist.splice(parseInt(i), 1);
                return true;
            }
        }

        return true;
    }

    hasMsgHdlr(id: h5game.INetMsgReq | h5game.INetMsgOn, callback: h5game.INetMsgCallback): boolean {
        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            return false;
        }

        for(var i in cblist) {
            if(cblist[i] == callback) {
                return true;
            }
        }

        return false;
    }

    clearMsgHdlr(id: h5game.INetMsgReq | h5game.INetMsgOn): void {
        delete this._msgCallbacks[id];
    }

    dispatchMsg(id: h5game.INetMsgReq | h5game.INetMsgOn, response: any): void {
        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            return;
        }

        for(var k in cblist) {
            cblist[k](response);
        }
    }
}