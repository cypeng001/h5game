class LocalMsgDispatcher implements h5game.ILocalMsgDispatcher {
    private static WARN_CB_COUNT: number = 10;

    private _msgCallbacks: {[key: number]: h5game.ILocalMsgCallback[]} = {};

    addMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
        if(this.hasMsgListener(id, callback)) {
            return false;
        }

        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            cblist = this._msgCallbacks[id] = [];
        }

        cblist.push(callback);

        if(cblist.length > LocalMsgDispatcher.WARN_CB_COUNT) {
            console.warn("LocalMsgDispatcher.addMsgListener cblist is to many, forget to LocalMsgDispatcher.removeMsgListener?", id);
        }

        return true;
    }

    removeMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
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

    hasMsgListener(id: h5game.ILocalMsg, callback: h5game.ILocalMsgCallback): boolean {
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

    clearMsgListener(id: h5game.ILocalMsg): void {
        delete this._msgCallbacks[id];
    }

    dispatchMsg(id: h5game.ILocalMsg, msg: any): void {
        var cblist = this._msgCallbacks[id];
        if(!cblist) {
            return;
        }

        for(var k in cblist) {
            cblist[k](msg);
        }
    }
}