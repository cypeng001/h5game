//角色数据
class RoleData {
    public id: number = 0;
    public name: string = "";
    public lv: number = 0;
    public vip: number = 0;
    public map_id: number = 0;
    public pos_x: number = 0;
    public pos_y: number = 0;

    public constructor() {
        //测试数据
        this.map_id = 7002;
    }
}