
//场景类型
enum SceneType {
    ST_StartScene       = 1,
    ST_AccountScene     = 2,
    ST_LoadingScene     = 3,
    ST_MainScene        = 4,
    ST_FbScene          = 5
};

//场景管理器切换场景操作类型
enum SceneMgrOP {
    SMOP_SwitchScene    = 1,
    SMOP_LoadScene      = 2
};

//登录页面类型
enum AccountLayerType {
    ALT_Login           = 1,
    ALT_Register        = 2,
    ALT_CreateRole      = 3,
    ALT_ServerList      = 4,
    ALT_EnterGame       = 5,
};