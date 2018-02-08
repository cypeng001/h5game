class GlobalConfig {
    public static GATE_HOST: string;
    public static GATE_PORT: number;

    public static init(): void {
        GlobalConfig.GATE_HOST = window["SERVER_CNF"]["GATE_HOST"];
        GlobalConfig.GATE_PORT = window["SERVER_CNF"]["GATE_PORT"];
    }
}