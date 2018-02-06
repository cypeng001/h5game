interface IMCFtry {
    createPool(key: string): any;
    create(key: string): any;
    recycle(): void;
    releaseInactPool(): void;
    profile(): void;
};