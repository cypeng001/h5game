var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var h5game;
(function (h5game) {
    var MapArea = (function () {
        function MapArea(_mapLayer) {
            this.x = 0;
            this.y = 0;
            this.state = h5game.MapAreaState.MAS_OUT_SCREEN;
            this._mapLayer = null;
            this._mapTiles = [];
            this._mapLayer = _mapLayer;
        }
        MapArea.prototype.addMapTile = function (mapTile) {
            this._mapTiles.push(mapTile);
        };
        MapArea.prototype.isInScreen = function (x, y, w, h) {
            return h5game.RectUtil.isIntersect(this.x, this.y, this.x + MapArea.DEF_SIZE, this.y + MapArea.DEF_SIZE, x, y, x + w, y + h);
        };
        MapArea.prototype.refresh = function (x, y, w, h) {
            var k;
            for (k in this._mapTiles) {
                var mapTile = this._mapTiles[k];
                if (h5game.RectUtil.isIntersect(x, y, x + w, y + h, mapTile.x, mapTile.y, mapTile.x + h5game.MapTileLayer.DEF_TILE_SIZE, mapTile.y + h5game.MapTileLayer.DEF_TILE_SIZE)) {
                    mapTile.visible = true;
                    mapTile.reload();
                }
                else {
                    mapTile.visible = false;
                    mapTile.unload();
                }
            }
        };
        MapArea.prototype.unload = function () {
            var k;
            for (k in this._mapTiles) {
                var mapTile = this._mapTiles[k];
                mapTile.visible = false;
                mapTile.unload();
            }
        };
        MapArea.DEF_SIZE = 1024;
        return MapArea;
    }());
    h5game.MapArea = MapArea;
    __reflect(MapArea.prototype, "h5game.MapArea");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MapAreaState;
    (function (MapAreaState) {
        MapAreaState[MapAreaState["MAS_OUT_SCREEN"] = 1] = "MAS_OUT_SCREEN";
        MapAreaState[MapAreaState["MAS_IN_SCREEN"] = 2] = "MAS_IN_SCREEN";
    })(MapAreaState = h5game.MapAreaState || (h5game.MapAreaState = {}));
    ;
    h5game.MAP_AREA_SIZE = 1024;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MapLayer = (function (_super) {
        __extends(MapLayer, _super);
        function MapLayer() {
            var _this = _super.call(this) || this;
            _this._entityLayer = null;
            _this._mapTileLayer = null;
            _this._numLayer = null;
            _this._map_cnf = null;
            _this._city_cnf = null;
            _this._map_id = 0;
            _this._width = 0;
            _this._height = 0;
            _this._tile_width = 0;
            _this._tile_height = 0;
            _this._curPlayer = null;
            _this._aoiPlayers = {};
            _this._monsters = {};
            _this._npcs = {};
            _this._lastRefreshPt = [0, 0];
            _this._mapAreas = {};
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.onTouchCancel, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTab, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.initMsgHandler();
            return _this;
        }
        MapLayer.prototype.loadMap = function (mapId) {
            var city_cnf = h5game.IntfcProxy.getCnfMgr().getConfig("city")[mapId];
            var map_cnf = h5game.IntfcProxy.getCnfMgr().getMapConfig(mapId);
            this._map_id = mapId;
            this._map_cnf = map_cnf;
            this._city_cnf = city_cnf;
            this._width = map_cnf.map_width;
            this._height = map_cnf.map_height;
            this._tile_width = map_cnf.map_tile_width;
            this._tile_height = map_cnf.map_tile_height;
            this._mapTileLayer = new h5game.MapTileLayer();
            this.addChild(this._mapTileLayer);
            this._mapTileLayer.loadMap(mapId);
            this._entityLayer = new egret.DisplayObjectContainer();
            this.addChild(this._entityLayer);
            this._numLayer = new egret.DisplayObjectContainer();
            this.addChild(this._numLayer);
            this.initMapArea();
        };
        MapLayer.prototype.initMapArea = function () {
            var col = Math.ceil(this._width / h5game.MapArea.DEF_SIZE);
            var row = Math.ceil(this._height / h5game.MapArea.DEF_SIZE);
            for (var j = 1; j <= row; ++j) {
                for (var i = 1; i <= col; ++i) {
                    var mapArea = new h5game.MapArea(this);
                    mapArea.x = (i - 1) * h5game.MapArea.DEF_SIZE;
                    mapArea.y = (j - 1) * h5game.MapArea.DEF_SIZE;
                    this._mapAreas[(j - 1) * col + i] = mapArea;
                }
            }
            var self = this;
            this._mapTileLayer.forEachMapTile(function (mapTile, index, array) {
                self.addMapTileToMapArea(mapTile);
            });
        };
        MapLayer.prototype.addMapTileToMapArea = function (mapTile) {
            var mapArea = this.getMapAreaByPos(mapTile.x, mapTile.y);
            mapArea.addMapTile(mapTile);
        };
        MapLayer.prototype.getMapAreaByPos = function (pos_x, pos_y) {
            var i = Math.floor(pos_x / h5game.MapArea.DEF_SIZE) + 1;
            var j = Math.floor(pos_y / h5game.MapArea.DEF_SIZE) + 1;
            var col = Math.ceil(this._width / h5game.MapArea.DEF_SIZE);
            var index = (j - 1) * col + i;
            return this._mapAreas[index];
        };
        MapLayer.prototype.refreshMapArea = function () {
            var x = -this.x + MapLayer.DEF_LOGIC_WIDTH / 2;
            var y = -this.y + MapLayer.DEF_LOGIC_HEIGHT / 2;
            var dx = MapLayer.DEF_LOGIC_WIDTH * 0.25;
            var dy = MapLayer.DEF_LOGIC_HEIGHT * 0.25;
            if (Math.abs(this._lastRefreshPt[0] - x) < dx
                && Math.abs(this._lastRefreshPt[1] - y) < dy) {
                return;
            }
            this._lastRefreshPt[0] = x;
            this._lastRefreshPt[1] = y;
            var sw = MapLayer.DEF_LOGIC_WIDTH + dx * 2;
            var sh = MapLayer.DEF_LOGIC_HEIGHT + dy * 2;
            var sx = x - MapLayer.DEF_LOGIC_WIDTH / 2 - dx;
            var sy = y - MapLayer.DEF_LOGIC_HEIGHT / 2 - dy;
            for (var i in this._mapAreas) {
                var mapArea = this._mapAreas[i];
                if (mapArea.isInScreen(sx, sy, sw, sh)) {
                    mapArea.refresh(sx, sy, sw, sh);
                    mapArea.state = h5game.MapAreaState.MAS_IN_SCREEN;
                }
                else {
                    var lastState = mapArea.state;
                    if (lastState != h5game.MapAreaState.MAS_OUT_SCREEN) {
                        mapArea.unload();
                        mapArea.state = h5game.MapAreaState.MAS_OUT_SCREEN;
                    }
                }
            }
        };
        MapLayer.prototype.initEntities = function (data) {
            this.initCurPlayer(data.curPlayer);
            for (var k in data.entities.mob) {
                var mobData = data.entities.mob[k];
                this.createMonster(mobData);
            }
            for (var k in data.entities.npc) {
                var npcData = data.entities.npc[k];
                this.createNpc(npcData);
            }
        };
        MapLayer.prototype.update = function (interval) {
            this._curPlayer.update(interval);
            for (var k in this._aoiPlayers) {
                var player = this._aoiPlayers[k];
                player.update(interval);
            }
            for (var k in this._monsters) {
                var monster = this._monsters[k];
                monster.update(interval);
            }
            for (var k in this._npcs) {
                var npc = this._npcs[k];
                npc.update(interval);
            }
            this.updateCamera(this._curPlayer.x, this._curPlayer.y);
            this._mapTileLayer.update(interval);
        };
        MapLayer.prototype.updateCamera = function (cameraX, cameraY) {
            this.x = Math.max(Math.min(0, -(cameraX - MapLayer.DEF_LOGIC_WIDTH / 2)), -(this._width - MapLayer.DEF_LOGIC_WIDTH));
            this.y = Math.max(Math.min(0, -(cameraY - MapLayer.DEF_LOGIC_HEIGHT / 2)), -(this._height - MapLayer.DEF_LOGIC_HEIGHT));
            this.refreshMapArea();
        };
        MapLayer.prototype.onTouchBegin = function (event) {
        };
        MapLayer.prototype.onTouchCancel = function (event) {
        };
        MapLayer.prototype.onTouchEnd = function (event) {
        };
        MapLayer.prototype.onTouchTab = function (event) {
            var localPt = this.globalToLocal(event.stageX, event.stageY);
            this._curPlayer.moveTo(localPt.x, localPt.y);
        };
        MapLayer.prototype.onTouchMove = function (event) {
        };
        MapLayer.prototype._createPlayer = function (data) {
            var player = new h5game.Player();
            player.init(data, this);
            this._entityLayer.addChild(player);
            return player;
        };
        MapLayer.prototype.initCurPlayer = function (data) {
            var player = this._createPlayer(data);
            player.mainPlayer = true;
            this._curPlayer = player;
        };
        MapLayer.prototype.createAoiPlayer = function (data) {
            if (this._aoiPlayers[data.entityId]) {
                console.warn("createAoiPlayer player already exist", JSON.stringify(data));
                return;
            }
            var player = this._createPlayer(data);
            this._aoiPlayers[data.entityId] = player;
            return player;
        };
        MapLayer.prototype.removeAoiPlayer = function (entityId) {
            var player = this.getAoiPlayer(entityId);
            if (!player) {
                return;
            }
            player.release();
            if (player.parent) {
                player.parent.removeChild(player);
            }
            delete this._aoiPlayers[entityId];
        };
        MapLayer.prototype.getAoiPlayer = function (entityId) {
            return this._aoiPlayers[entityId];
        };
        MapLayer.prototype.createMonster = function (data) {
            if (this._monsters[data.entityId]) {
                console.warn("createMonster monster already exist", JSON.stringify(data));
                return;
            }
            var monster = new h5game.Monster();
            monster.init(data, this);
            this._entityLayer.addChild(monster);
            this._monsters[data.entityId] = monster;
            return monster;
        };
        MapLayer.prototype.removeMonster = function (entityId) {
            var monster = this.getMonster(entityId);
            if (!monster) {
                return;
            }
            monster.release();
            if (monster.parent) {
                monster.parent.removeChild(monster);
            }
            delete this._monsters[entityId];
        };
        MapLayer.prototype.getMonster = function (entityId) {
            return this._monsters[entityId];
        };
        MapLayer.prototype.createNpc = function (data) {
            if (this._npcs[data.entityId]) {
                console.warn("createNpc npc already exist", JSON.stringify(data));
                return;
            }
            var npc = new h5game.Npc();
            npc.init(data, this);
            this._entityLayer.addChild(npc);
            this._npcs[data.entityId] = npc;
            return npc;
        };
        MapLayer.prototype.removeNpc = function (entityId) {
            var npc = this.getNpc(entityId);
            if (!npc) {
                return;
            }
            npc.release();
            if (npc.parent) {
                npc.parent.removeChild(npc);
            }
            delete this._npcs[entityId];
        };
        MapLayer.prototype.getNpc = function (entityId) {
            return this._npcs[entityId];
        };
        MapLayer.prototype.getEntity = function (entityId) {
            if (this._curPlayer.entityId == entityId) {
                return this._curPlayer;
            }
            var entity = null;
            entity = this._aoiPlayers[entityId];
            if (entity) {
                return entity;
            }
            entity = this._monsters[entityId];
            if (entity) {
                return entity;
            }
            entity = this._npcs[entityId];
            if (entity) {
                return entity;
            }
            return null;
        };
        MapLayer.prototype.removeEntity = function (entityId) {
            var entity = this.getEntity(entityId);
            if (!entity) {
                return;
            }
            if (entity.entityType == h5game.EntityType.ET_PLAYER) {
                this.removeAoiPlayer(entityId);
            }
            else if (entity.entityType == h5game.EntityType.ET_MONSTER) {
                this.removeMonster(entityId);
            }
            else if (entity.entityType == h5game.EntityType.ET_NPC) {
                this.removeNpc(entityId);
            }
        };
        MapLayer.prototype.getActor = function (entityId) {
            var entity = this.getEntity(entityId);
            if (!entity) {
                return null;
            }
            if (!(entity.entityType == h5game.EntityType.ET_PLAYER
                || entity.entityType == h5game.EntityType.ET_MONSTER
                || entity.entityType == h5game.EntityType.ET_NPC)) {
                return null;
            }
            return entity;
        };
        MapLayer.prototype.createNum = function (x, y, status, value) {
            var container = new egret.DisplayObjectContainer;
            container.x = x;
            container.y = y;
            this._numLayer.addChild(container);
            /*
            var label = new eui.Label;
            label.size = 30;
            label.stroke = 1;
            label.strokeColor = 0x333333;
            label.text = value.toString();
            label.width = 100;
            label.anchorOffsetX = label.width / 2;
            container.addChild(label);
            */
            var label = new eui.BitmapLabel;
            label.font = "font_pz_zi_j1_fnt";
            label.letterSpacing = -3;
            label.text = value.toString();
            label.width = 100;
            label.anchorOffsetX = label.width / 2;
            container.addChild(label);
            egret.Tween.get(container).to({ y: y - 20 }, 500).
                wait(500).
                call(function () {
                if (container.parent) {
                    container.parent.removeChild(container);
                }
            });
        };
        MapLayer.prototype.MsgHandler_onAddEntities = function (data) {
            if (data.mob) {
                for (var k in data.mob) {
                    var mobData = data.mob[k];
                    this.createMonster(mobData);
                }
            }
            if (data.npc) {
                for (var k in data.npc) {
                    var npcData = data.npc[k];
                    this.createNpc(npcData);
                }
            }
        };
        MapLayer.prototype.MsgHandler_onRemoveEntities = function (data) {
            if (data.entities) {
                for (var k in data.entities) {
                    var entityId = data.entities[k];
                    this.removeEntity(entityId);
                }
            }
        };
        MapLayer.prototype.MsgHandler_onMove = function (data) {
            var path = data.path;
            var actor = this.getActor(data.entityId);
            if (!actor) {
                return;
            }
            actor.moveTo(path[1].x, path[1].y);
        };
        MapLayer.prototype.MsgHandler_onAttack = function (data) {
            var skillId = data.skillId;
            var atkActor = this.getActor(data.attacker);
            var defActor = this.getActor(data.target);
            if (!atkActor || !defActor) {
                return;
            }
            atkActor.stopMove();
            atkActor.adjustDir(defActor.x, defActor.y);
            atkActor.execSkill(skillId, data);
        };
        MapLayer.prototype.initMsgHandler = function () {
            var self = this;
            h5game.IntfcProxy.getNetMsgHdlr().addMsgHdlr(h5game.INetMsgOn.INMO_AREA_onAddEntities, function (data) {
                self.MsgHandler_onAddEntities(data);
            });
            h5game.IntfcProxy.getNetMsgHdlr().addMsgHdlr(h5game.INetMsgOn.INMO_AREA_onRemoveEntities, function (data) {
                self.MsgHandler_onRemoveEntities(data);
            });
            h5game.IntfcProxy.getNetMsgHdlr().addMsgHdlr(h5game.INetMsgOn.INMO_AREA_onMove, function (data) {
                self.MsgHandler_onMove(data);
            });
            h5game.IntfcProxy.getNetMsgHdlr().addMsgHdlr(h5game.INetMsgOn.INMO_FIGHT_onAttack, function (data) {
                self.MsgHandler_onAttack(data);
            });
        };
        MapLayer.prototype.notify = function (cmd, params) {
            switch (cmd) {
                case h5game.IMapCmdN.IMCN_CreateNum:
                    {
                        this.createNum.apply(this, params);
                    }
                    break;
            }
        };
        MapLayer.prototype.query = function (cmd, params) {
            switch (cmd) {
                case h5game.IMapCmdQ.IMCQ_GetActor:
                    {
                        return this.getActor.apply(this, params);
                    }
            }
        };
        MapLayer.DEF_LOGIC_WIDTH = 640;
        MapLayer.DEF_LOGIC_HEIGHT = 1066;
        return MapLayer;
    }(egret.DisplayObjectContainer));
    h5game.MapLayer = MapLayer;
    __reflect(MapLayer.prototype, "h5game.MapLayer");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MapTile = (function () {
        function MapTile() {
            this.source = "";
        }
        Object.defineProperty(MapTile.prototype, "x", {
            get: function () {
                return this.image.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapTile.prototype, "y", {
            get: function () {
                return this.image.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapTile.prototype, "visible", {
            set: function (val) {
                this.image.visible = val;
            },
            enumerable: true,
            configurable: true
        });
        MapTile.prototype.reload = function () {
            this.image.source = this.source;
        };
        MapTile.prototype.unload = function () {
            this.image.source = "";
        };
        return MapTile;
    }());
    h5game.MapTile = MapTile;
    __reflect(MapTile.prototype, "h5game.MapTile");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var MapTileLayer = (function (_super) {
        __extends(MapTileLayer, _super);
        function MapTileLayer() {
            var _this = _super.call(this) || this;
            _this.map_id = 0;
            _this.map_cnf = null;
            _this.city_cnf = null;
            _this._widht = 0;
            _this._height = 0;
            _this._ver = "";
            _this._mapTiles = [];
            return _this;
        }
        MapTileLayer.getImagePath = function (mapId, x, y) {
            return "resource/map/" + mapId + "/" + x + "X" + y + ".jpg";
        };
        MapTileLayer.prototype.update = function (interval) {
        };
        MapTileLayer.prototype.loadMap = function (mapId) {
            var city_cnf = h5game.IntfcProxy.getCnfMgr().getConfig("city")[mapId];
            var map_cnf = h5game.IntfcProxy.getCnfMgr().getMapConfig(mapId);
            this.map_id = mapId;
            this.map_cnf = map_cnf;
            this.city_cnf = city_cnf;
            this._widht = city_cnf.width;
            this._height = city_cnf.height;
            this._ver = city_cnf.ver ? city_cnf.ver : "";
            this.createMapTile();
        };
        MapTileLayer.prototype.createMapTile = function () {
            var tile_size = MapTileLayer.DEF_TILE_SIZE;
            var tile_w = Math.floor((this._widht - 1) / tile_size + 1);
            var tile_h = Math.floor((this._height - 1) / tile_size + 1);
            for (var i = 1; i <= tile_h; i++) {
                for (var j = 1; j <= tile_w; j++) {
                    var imagePath = MapTileLayer.getImagePath(this.map_cnf.map_res, i, j);
                    if (this._ver && this._ver.length) {
                        imagePath += ("?v=" + this._ver);
                    }
                    var image = new eui.Image();
                    image.x = tile_size * (j - 1);
                    image.y = tile_size * (i - 1);
                    this.addChild(image);
                    var mapTile = new h5game.MapTile();
                    mapTile.source = imagePath;
                    mapTile.image = image;
                    this._mapTiles.push(mapTile);
                }
            }
        };
        MapTileLayer.prototype.forEachMapTile = function (cb) {
            this._mapTiles.forEach(cb);
        };
        MapTileLayer.DEF_TILE_SIZE = 512;
        return MapTileLayer;
    }(egret.DisplayObjectContainer));
    h5game.MapTileLayer = MapTileLayer;
    __reflect(MapTileLayer.prototype, "h5game.MapTileLayer");
})(h5game || (h5game = {}));
