declare namespace h5game {
    class MCAdv extends egret.MovieClip {
        mcst: MCST;
        constructor(movieClipData?: egret.MovieClipData);
        gotoAndPlay(frame: string | number, playTimes?: number): void;
        gotoAndStop(frame: string | number): void;
    }
}
declare namespace h5game {
    class MCCnfMgr {
        private static _instance;
        static getInstance(): MCCnfMgr;
        private _configMap;
        private _manifest;
        init(): void;
        private initManifest(zip);
        private initMCCnf(zip);
        regMCCnf(key: string, config: any): Boolean;
        getMCCnf(key: string): any;
        getHash(key: string): string;
    }
}
declare namespace h5game {
    enum MCST {
        UNINIT = 1,
        LOAD = 2,
        UNLOAD = 3,
    }
    enum MCPST {
        UNINIT = 1,
        UNLOAD = 2,
        LOADING = 3,
        LOADED = 4,
    }
}
declare namespace h5game {
    class MCDataFtryAdv extends egret.MovieClipDataFactory {
        constructor(movieClipDataSet?: any, texture?: egret.Texture);
        protected setTexture(value: egret.Texture): void;
    }
}
declare namespace h5game {
    class MCPool extends h5game.ObjPool {
        private static DEF_RELEASE_TIME;
        private static DEF_AUTO_RECYCLE_INTERVAL;
        private _state;
        private _mcDataFtry;
        private static getAssets(source, callback);
        private static getImagePath(key);
        constructor(name: string);
        protected createObj(key: string): any;
        private reload(texture);
        create(key: string): any;
        release(): void;
        canRelease(): boolean;
    }
}
declare namespace h5game {
    class MCFtry extends h5game.ObjFtry {
        private static _instance;
        static getInstance(): MCFtry;
        createPool(key: string): any;
    }
}
