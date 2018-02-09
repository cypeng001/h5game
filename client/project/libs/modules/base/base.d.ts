declare namespace h5game {
    class ObjPool {
        protected _name: string;
        protected _actPool: any[];
        protected _inactPool: any[];
        protected _lastActiveTick: number;
        protected _lastRecycleTick: number;
        protected _autoRecycleInterval: number;
        constructor(name: string);
        protected createObj(key: string, params: any): any;
        protected recycleObj(obj: any): void;
        protected releaseObj(obj: any): void;
        protected canRecycleObj(obj: any): any;
        create(key: string, params: any): any;
        recycle(): void;
        protected autoRecycle(): void;
        release(): void;
        canRelease(): boolean;
        profile(): void;
    }
}
declare namespace h5game {
    class ObjFtry {
        protected _poolMap: {};
        constructor();
        createPool(key: string): any;
        getPool(key: string): any;
        create(key: string, params?: any): any;
        recycle(): void;
        releaseInactPool(): void;
        profile(): void;
    }
}
