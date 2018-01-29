//地图块资源状态类型
enum MapTileState{
    MTS_UNINIT = -1,
    MTS_LDRES = 1,
    MTS_HDRES
};

//地图资源格式类型
enum MapResFormat{
    MRF_NONE,
    MRF_JPG,
    MRF_PNG
};

//地图分区状态类型
enum MapAreaState{
    MAS_OUT_SCREEN = 1,
    MAS_IN_SCREEN = 2,
}

enum MapAreaType{
    MAT_MG = 1,
    MAT_BG = 2,
}