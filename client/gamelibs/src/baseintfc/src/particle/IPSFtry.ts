namespace h5game
{

export interface IPSFtry {
    init(): void;
    //createPool(key: string): any; //todo
    create(key: string): any;
    //recycle(): void; //todo
    //releaseInactPool(): void; //todo
    //profile(): void; //todo
};

}