declare namespace h5game {
    class Entity extends egret.DisplayObjectContainer {
        protected static _AUTO_LOCAL_ID: number;
        protected static _AUTO_LOCAL_MAX_ID: number;
        protected _localId: number;
        protected _entityId: number;
        protected _mapLayer: h5game.IMapLayer;
        protected _data: any;
        constructor();
        readonly localId: number;
        readonly entityId: number;
        readonly entityType: number;
        init(data: any, mapLayer: h5game.IMapLayer): void;
        release(): void;
        protected update(interval: number): void;
        protected $setY(value: number): boolean;
    }
}
declare namespace h5game {
    class Actor extends Entity {
        protected _actionState: number;
        protected _dir: number;
        protected _sprite: egret.MovieClip;
        protected _nameLabel: eui.Label;
        protected _moveTarPos: [number, number];
        protected _moveSpeed: [number, number];
        protected _moving: boolean;
        protected _speed: number;
        protected _spriteScale: number;
        protected _name: string;
        protected _hp: number;
        protected _maxHp: number;
        protected _mp: number;
        protected _maxMp: number;
        protected _hpBar: eui.ProgressBar;
        protected _mpBar: eui.ProgressBar;
        constructor();
        hp: number;
        mp: number;
        protected getName(): string;
        init(data: any, mapLayer: h5game.IMapLayer): void;
        release(): void;
        update(interval: number): void;
        protected initSprite(): void;
        protected initNameLabel(): void;
        protected initHpBar(): void;
        protected refreshHpBar(): void;
        protected initMpBar(): void;
        protected refreshMpBar(): void;
        setDir(dir: number): void;
        setActionState(actionState: number): void;
        standAct(): void;
        runAct(): void;
        attackAct(): void;
        moveTo(x: number, y: number): void;
        protected clearMoveData(): void;
        stopMove(): void;
        updateMove(interval: any): void;
        protected setFlipX(flipX: boolean): void;
        adjustDir(tarX: number, tarY: number): void;
        execSkill(skillId: number, data: any): void;
    }
}
declare namespace h5game {
    enum EntityType {
        ET_PLAYER = 1,
        ET_MONSTER = 2,
        ET_NPC = 3,
    }
    enum ActorActionState {
        AAS_STANDFRONT = 1,
        AAS_STANDBACK = 2,
        AAS_RUNFRONT = 3,
        AAS_RUNBACK = 4,
        AAS_ATTACKFRONT = 5,
        AAS_ATTACKBACK = 6,
    }
    enum ActorDir {
        AD_EASTSOUTH = 1,
        AD_EASTNORTH = 2,
        AD_WESTSOUTH = 3,
        AD_WESTNORTH = 4,
    }
    enum AttackResult {
        SUCCESS = 1,
        KILLED = 2,
        MISS = 3,
        NOT_IN_RANGE = 4,
        NO_ENOUGH_MP = 5,
        NOT_COOLDOWN = 6,
        ATTACKER_CONFUSED = 7,
    }
}
declare namespace h5game {
    class EntityProxy {
        static getMCFtry(): h5game.IMCFtry;
        static getNetMsgHdlr(): h5game.INetMsgHdlr;
    }
}
declare namespace h5game {
    class EntityUtil {
        static actionState2Str(actionState: number): string;
    }
}
declare namespace h5game {
    class Monster extends Actor {
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: h5game.IMapLayer): void;
        release(): void;
        protected initSprite(): void;
    }
}
declare namespace h5game {
    class Npc extends Actor {
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: h5game.IMapLayer): void;
        release(): void;
        protected initSprite(): void;
    }
}
declare namespace h5game {
    class Player extends Actor {
        protected _mainPlayer: boolean;
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: h5game.IMapLayer): void;
        release(): void;
        protected initSprite(): void;
        mainPlayer: boolean;
        moveTo(x: number, y: number): void;
    }
}
