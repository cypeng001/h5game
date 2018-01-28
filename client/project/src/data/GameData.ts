class GameData {
    public role_data: RoleData = null;
    public server_data: ServerData = null;
    public plat_data: PlatData = null;

    public uid: number = 0;
    public playerId: number = 0;
    public areaId: number = 0;
    public player: any = null;
    public areaData: any = null;
    public sceneData: any = null;

    public constructor() {
    }

    public init(): void
    {
        this.role_data = new RoleData();
        this.server_data = new ServerData();
        this.plat_data = new PlatData();
    }
}

var g_gameData = new GameData();