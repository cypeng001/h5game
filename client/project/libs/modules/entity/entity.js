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
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var _this = _super.call(this) || this;
            _this._localId = 0;
            _this._entityId = 0;
            _this._data = null;
            _this._localId = Entity._AUTO_LOCAL_ID++;
            if (Entity._AUTO_LOCAL_ID > Entity._AUTO_LOCAL_MAX_ID) {
                Entity._AUTO_LOCAL_ID = 1;
            }
            return _this;
        }
        Object.defineProperty(Entity.prototype, "localId", {
            get: function () {
                return this._localId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "entityId", {
            get: function () {
                return this._entityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "entityType", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Entity.prototype.init = function (data, mapLayer) {
            this._data = data;
            this._mapLayer = mapLayer;
        };
        Entity.prototype.release = function () {
            this._data = null;
            this._mapLayer = null;
        };
        Entity.prototype.update = function (interval) {
        };
        //override
        Entity.prototype.$setY = function (value) {
            var ret = _super.prototype.$setY.call(this, value);
            this.zorder = value;
            return ret;
        };
        Entity._AUTO_LOCAL_ID = 1;
        Entity._AUTO_LOCAL_MAX_ID = 100000;
        return Entity;
    }(egret.DisplayObjectContainer));
    h5game.Entity = Entity;
    __reflect(Entity.prototype, "h5game.Entity");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var Actor = (function (_super) {
        __extends(Actor, _super);
        function Actor() {
            var _this = _super.call(this) || this;
            _this._actionState = 0;
            _this._dir = h5game.ActorActionState.AAS_STANDFRONT;
            _this._moveTarPos = [0, 0];
            _this._moveSpeed = [0, 0];
            _this._moving = false;
            _this._speed = 200;
            _this._spriteScale = 1;
            _this._hp = 0;
            _this._maxHp = 1;
            _this._mp = 0;
            _this._maxMp = 1;
            return _this;
        }
        Object.defineProperty(Actor.prototype, "hp", {
            get: function () {
                return this._hp;
            },
            set: function (val) {
                this._hp = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "mp", {
            get: function () {
                return this._mp;
            },
            set: function (val) {
                this._mp = val;
            },
            enumerable: true,
            configurable: true
        });
        Actor.prototype.getName = function () {
            return this._name;
        };
        Actor.prototype.init = function (data, mapLayer) {
            _super.prototype.init.call(this, data, mapLayer);
        };
        Actor.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        Actor.prototype.update = function (interval) {
            _super.prototype.update.call(this, interval);
            this.updateMove(interval);
        };
        Actor.prototype.initSprite = function () {
        };
        Actor.prototype.initNameLabel = function () {
            this._nameLabel = new eui.Label(this.getName());
            this._nameLabel.width = 100;
            this._nameLabel.height = 20;
            this._nameLabel.textAlign = 'center';
            this._nameLabel.size = 13;
            this._nameLabel.stroke = 1;
            this._nameLabel.strokeColor = 0x333333;
            this._nameLabel.anchorOffsetX = this._nameLabel.width / 2;
            this._nameLabel.verticalAlign = "bottom";
            this._nameLabel.y = -130;
            this.addChild(this._nameLabel);
        };
        Actor.prototype.initHpBar = function () {
            this._hpBar = new eui.ProgressBar();
            this._hpBar.width = 60;
            this._hpBar.height = 10;
            this._hpBar.minimum = 0;
            this._hpBar.maximum = this._maxHp;
            this._hpBar.value = this._hp;
            this._hpBar.anchorOffsetX = this._hpBar.width / 2;
            this._hpBar.y = -170;
            this.addChild(this._hpBar);
        };
        Actor.prototype.refreshHpBar = function () {
            this._hpBar.minimum = 0;
            this._hpBar.maximum = this._maxHp;
            this._hpBar.value = this._hp;
        };
        Actor.prototype.initMpBar = function () {
            this._mpBar = new eui.ProgressBar();
            this._mpBar.width = 60;
            this._mpBar.height = 10;
            this._mpBar.minimum = 0;
            this._mpBar.maximum = this._maxMp;
            this._mpBar.value = this._mp;
            this._mpBar.anchorOffsetX = this._mpBar.width / 2;
            this._mpBar.y = -150;
            this.addChild(this._mpBar);
        };
        Actor.prototype.refreshMpBar = function () {
            this._mpBar.minimum = 0;
            this._mpBar.maximum = this._maxMp;
            this._mpBar.value = this._mp;
        };
        Actor.prototype.setDir = function (dir) {
            this._dir = dir;
        };
        Actor.prototype.setActionState = function (actionState) {
            if (this._actionState == actionState) {
                return;
            }
            this._actionState = actionState;
            this._sprite.gotoAndPlay(h5game.EntityUtil.actionState2Str(actionState), -1);
        };
        Actor.prototype.standAct = function () {
            var actionState = 0;
            if (this._dir == h5game.ActorDir.AD_EASTSOUTH || this._dir == h5game.ActorDir.AD_WESTSOUTH) {
                actionState = h5game.ActorActionState.AAS_STANDFRONT;
            }
            else {
                actionState = h5game.ActorActionState.AAS_STANDBACK;
            }
            this.setActionState(actionState);
        };
        Actor.prototype.runAct = function () {
            var actionState = 0;
            if (this._dir == h5game.ActorDir.AD_EASTSOUTH || this._dir == h5game.ActorDir.AD_WESTSOUTH) {
                actionState = h5game.ActorActionState.AAS_RUNFRONT;
            }
            else {
                actionState = h5game.ActorActionState.AAS_RUNBACK;
            }
            this.setActionState(actionState);
        };
        Actor.prototype.attackAct = function () {
            var actionState = 0;
            if (this._dir == h5game.ActorDir.AD_EASTSOUTH || this._dir == h5game.ActorDir.AD_WESTSOUTH) {
                actionState = h5game.ActorActionState.AAS_ATTACKFRONT;
            }
            else {
                actionState = h5game.ActorActionState.AAS_ATTACKBACK;
            }
            this.setActionState(actionState);
        };
        Actor.prototype.moveTo = function (x, y) {
            if (this.x == x && this.y == y) {
                this.stopMove();
                return;
            }
            this._moving = true;
            this._moveTarPos[0] = x;
            this._moveTarPos[1] = y;
            var dir = h5game.VectorUtil.calcDir(this.x, this.y, x, y);
            this._moveSpeed[0] = dir[0] * this._speed;
            this._moveSpeed[1] = dir[1] * this._speed;
            this.adjustDir(x, y);
            this.runAct();
        };
        Actor.prototype.clearMoveData = function () {
            this._moving = false;
            this._moveTarPos[0] = 0;
            this._moveTarPos[1] = 0;
            this._moveSpeed[0] = 0;
            this._moveSpeed[1] = 0;
        };
        Actor.prototype.stopMove = function () {
            this.clearMoveData();
            this.standAct();
        };
        Actor.prototype.updateMove = function (interval) {
            if (!this._moving) {
                return;
            }
            this.x += this._moveSpeed[0] * interval;
            this.y += this._moveSpeed[1] * interval;
            var dist = h5game.VectorUtil.calcLength(this._moveTarPos[0] - this.x, this._moveTarPos[1] - this.y);
            if (dist < this._speed * interval) {
                this.x = this._moveTarPos[0];
                this.y = this._moveTarPos[1];
                this.clearMoveData();
                this.standAct();
            }
        };
        Actor.prototype.setFlipX = function (flipX) {
            this._sprite.scaleX = flipX ? -this._spriteScale : this._spriteScale;
        };
        Actor.prototype.adjustDir = function (tarX, tarY) {
            var distX = tarX - this.x;
            var distY = tarY - this.y;
            if (distX == 0 && distY == 0) {
                return;
            }
            if (distX > 0) {
                if (distY < 0) {
                    this._dir = h5game.ActorDir.AD_EASTNORTH;
                }
                else {
                    this._dir = h5game.ActorDir.AD_EASTSOUTH;
                }
                this.setFlipX(false);
            }
            else {
                if (distY < 0) {
                    this._dir = h5game.ActorDir.AD_WESTNORTH;
                }
                else {
                    this._dir = h5game.ActorDir.AD_WESTSOUTH;
                }
                this.setFlipX(true);
            }
        };
        Actor.prototype.execSkill = function (skillId, data) {
            this.attackAct();
            var resultData = data.result;
            if (resultData.result == h5game.AttackResult.SUCCESS) {
                this._mapLayer.notify(h5game.IMapCmdN.IMCN_CreateNum, [this.x, this.y, 0, resultData.damage]);
                var defActor = this._mapLayer.query(h5game.IMapCmdQ.IMCQ_GetActor, [data.target]);
                defActor.hp -= resultData.damage;
                defActor.refreshHpBar();
            }
        };
        return Actor;
    }(h5game.Entity));
    h5game.Actor = Actor;
    __reflect(Actor.prototype, "h5game.Actor");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var EntityType;
    (function (EntityType) {
        EntityType[EntityType["ET_PLAYER"] = 1] = "ET_PLAYER";
        EntityType[EntityType["ET_MONSTER"] = 2] = "ET_MONSTER";
        EntityType[EntityType["ET_NPC"] = 3] = "ET_NPC";
    })(EntityType = h5game.EntityType || (h5game.EntityType = {}));
    ;
    var ActorActionState;
    (function (ActorActionState) {
        ActorActionState[ActorActionState["AAS_STANDFRONT"] = 1] = "AAS_STANDFRONT";
        ActorActionState[ActorActionState["AAS_STANDBACK"] = 2] = "AAS_STANDBACK";
        ActorActionState[ActorActionState["AAS_RUNFRONT"] = 3] = "AAS_RUNFRONT";
        ActorActionState[ActorActionState["AAS_RUNBACK"] = 4] = "AAS_RUNBACK";
        ActorActionState[ActorActionState["AAS_ATTACKFRONT"] = 5] = "AAS_ATTACKFRONT";
        ActorActionState[ActorActionState["AAS_ATTACKBACK"] = 6] = "AAS_ATTACKBACK";
    })(ActorActionState = h5game.ActorActionState || (h5game.ActorActionState = {}));
    ;
    var ActorDir;
    (function (ActorDir) {
        ActorDir[ActorDir["AD_EASTSOUTH"] = 1] = "AD_EASTSOUTH";
        ActorDir[ActorDir["AD_EASTNORTH"] = 2] = "AD_EASTNORTH";
        ActorDir[ActorDir["AD_WESTSOUTH"] = 3] = "AD_WESTSOUTH";
        ActorDir[ActorDir["AD_WESTNORTH"] = 4] = "AD_WESTNORTH";
    })(ActorDir = h5game.ActorDir || (h5game.ActorDir = {}));
    ;
    var AttackResult;
    (function (AttackResult) {
        AttackResult[AttackResult["SUCCESS"] = 1] = "SUCCESS";
        AttackResult[AttackResult["KILLED"] = 2] = "KILLED";
        AttackResult[AttackResult["MISS"] = 3] = "MISS";
        AttackResult[AttackResult["NOT_IN_RANGE"] = 4] = "NOT_IN_RANGE";
        AttackResult[AttackResult["NO_ENOUGH_MP"] = 5] = "NO_ENOUGH_MP";
        AttackResult[AttackResult["NOT_COOLDOWN"] = 6] = "NOT_COOLDOWN";
        AttackResult[AttackResult["ATTACKER_CONFUSED"] = 7] = "ATTACKER_CONFUSED";
    })(AttackResult = h5game.AttackResult || (h5game.AttackResult = {}));
    ;
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var EntityProxy = (function () {
        function EntityProxy() {
        }
        EntityProxy.getMCFtry = function () {
            return egret.getImplementation("IMCFtry");
        };
        EntityProxy.getNetMsgHdlr = function () {
            return egret.getImplementation("INetMsgHdlr");
        };
        return EntityProxy;
    }());
    h5game.EntityProxy = EntityProxy;
    __reflect(EntityProxy.prototype, "h5game.EntityProxy");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var EntityUtil = (function () {
        function EntityUtil() {
        }
        EntityUtil.actionState2Str = function (actionState) {
            if (actionState == h5game.ActorActionState.AAS_STANDFRONT) {
                return "standfront";
            }
            else if (actionState == h5game.ActorActionState.AAS_STANDBACK) {
                return "standback";
            }
            else if (actionState == h5game.ActorActionState.AAS_RUNFRONT) {
                return "runfront";
            }
            else if (actionState == h5game.ActorActionState.AAS_RUNBACK) {
                return "runback";
            }
            else if (actionState == h5game.ActorActionState.AAS_ATTACKFRONT) {
                return "attackfront";
            }
            else if (actionState == h5game.ActorActionState.AAS_ATTACKBACK) {
                return "attackback";
            }
            return "standfront";
        };
        return EntityUtil;
    }());
    h5game.EntityUtil = EntityUtil;
    __reflect(EntityUtil.prototype, "h5game.EntityUtil");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster() {
            return _super.call(this) || this;
        }
        Object.defineProperty(Monster.prototype, "entityType", {
            get: function () {
                return h5game.EntityType.ET_MONSTER;
            },
            enumerable: true,
            configurable: true
        });
        Monster.prototype.init = function (data, mapLayer) {
            _super.prototype.init.call(this, data, mapLayer);
            this._entityId = data.entityId;
            this._name = "mon10001";
            this._hp = data.hp;
            this._maxHp = data.maxHp;
            this._speed = data.walkSpeed;
            this.x = data.x;
            this.y = data.y;
            this.initSprite();
            this.initNameLabel();
            this.initHpBar();
            this.standAct();
        };
        Monster.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        Monster.prototype.initSprite = function () {
            this._sprite = h5game.EntityProxy.getMCFtry().create("monster_10001");
            this.addChild(this._sprite);
        };
        return Monster;
    }(h5game.Actor));
    h5game.Monster = Monster;
    __reflect(Monster.prototype, "h5game.Monster");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var Npc = (function (_super) {
        __extends(Npc, _super);
        function Npc() {
            return _super.call(this) || this;
        }
        Object.defineProperty(Npc.prototype, "entityType", {
            get: function () {
                return h5game.EntityType.ET_NPC;
            },
            enumerable: true,
            configurable: true
        });
        Npc.prototype.init = function (data, mapLayer) {
            _super.prototype.init.call(this, data, mapLayer);
            this._entityId = data.entityId;
            this._name = "npc10001";
            this.x = data.x;
            this.y = data.y;
            this.initSprite();
            this.standAct();
        };
        Npc.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        Npc.prototype.initSprite = function () {
            this._sprite = h5game.EntityProxy.getMCFtry().create("npc_10001");
            this.addChild(this._sprite);
        };
        return Npc;
    }(h5game.Actor));
    h5game.Npc = Npc;
    __reflect(Npc.prototype, "h5game.Npc");
})(h5game || (h5game = {}));
var h5game;
(function (h5game) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this._mainPlayer = false;
            return _this;
        }
        Object.defineProperty(Player.prototype, "entityType", {
            get: function () {
                return h5game.EntityType.ET_PLAYER;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.init = function (data, mapLayer) {
            _super.prototype.init.call(this, data, mapLayer);
            this._entityId = data.entityId;
            this._name = data.name;
            this._hp = data.hp;
            this._maxHp = data.maxHp;
            this._mp = data.mp;
            this._maxMp = data.maxMp;
            this._speed = data.walkSpeed;
            this.x = data.x;
            this.y = data.y;
            this.initSprite();
            this.initNameLabel();
            this.initHpBar();
            this.initMpBar();
            this.standAct();
        };
        Player.prototype.release = function () {
            _super.prototype.release.call(this);
        };
        Player.prototype.initSprite = function () {
            this._sprite = h5game.EntityProxy.getMCFtry().create("player_10001");
            this.addChild(this._sprite);
        };
        Object.defineProperty(Player.prototype, "mainPlayer", {
            get: function () {
                return this._mainPlayer;
            },
            set: function (val) {
                this._mainPlayer = val;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.moveTo = function (x, y) {
            _super.prototype.moveTo.call(this, x, y);
            if (this.mainPlayer) {
                h5game.EntityProxy.getNetMsgHdlr().requestMsg(h5game.INetMsgReq.INMR_MOVE, [{ x: this.x, y: this.y }, { x: x, y: y }], null);
            }
        };
        return Player;
    }(h5game.Actor));
    h5game.Player = Player;
    __reflect(Player.prototype, "h5game.Player");
})(h5game || (h5game = {}));
