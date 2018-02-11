declare namespace h5game {
    class MCAdv extends egret.MovieClip {
        protected _key: string;
        protected _pool: MCPool;
        protected _mcDatas: {
            [key: string]: egret.MovieClipData;
        };
        mcst: MCST;
        constructor(movieClipData: egret.MovieClipData, key: string, pool: MCPool);
        gotoAndPlay(frame: string | number, playTimes?: number): void;
        gotoAndStop(frame: string | number): void;
        playAnimation(frame: string, playTimes?: number): void;
    }
}
declare namespace h5game {
    class MCCnfMgr {
        private _configMap;
        private _manifest;
        init(): void;
        private initManifest(zip);
        private initMCCnf(zip);
        regMCCnf(key: string, config: any): Boolean;
        getMCCnf(key: string): any;
        getHash(key: string): string;
        getFilelist(key: string): string[];
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
    class MCPool extends ObjPool {
        private static DEF_RELEASE_TIME;
        private static DEF_AUTO_RECYCLE_INTERVAL;
        private _state;
        private _mcDataFtrys;
        private _mcDataCnt;
        private _mcCnfMgr;
        private _loadFileCnt;
        private static getAssets(source, callback);
        private getImagePath(key);
        constructor(name: string, mcCnfMgr: MCCnfMgr);
        protected createObj(key: string, params: any): any;
        protected recycleObj(obj: any): void;
        protected releaseObj(obj: any): void;
        private reload(filename, texture);
        create(key: string, params?: any): any;
        private loadNext();
        private loadComplete();
        release(): void;
        canRelease(): boolean;
        getMCDataCnt(): number;
        createMovieClipData(key: string): egret.MovieClipData;
    }
}
declare namespace h5game {
    class MCFtry extends ObjFtry {
        private _init;
        private _mcCnfMgr;
        init(): void;
        createPool(key: string): any;
    }
}
