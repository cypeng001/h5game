class GameData {
    public platData: PlatData = null;
    public serverData: ServerData = null;
    public role_data: RoleData = null;
    
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
        this.serverData = new ServerData();
        this.platData = new PlatData();
        this.role_data = new RoleData();
    }
}

var g_gameData = new GameData();