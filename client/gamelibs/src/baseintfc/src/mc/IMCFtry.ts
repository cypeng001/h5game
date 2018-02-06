namespace h5game
{

export interface IMCFtry {
    init(): void;
    createPool(key: string): any;
    create(key: string): any;
    recycle(): void;
    releaseInactPool(): void;
    profile(): void;
};

}