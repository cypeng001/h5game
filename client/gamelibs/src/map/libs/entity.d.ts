declare namespace h5game {
    class Entity extends egret.DisplayObjectContainer {
        protected static _AUTO_LOCAL_ID: number;
        protected static _AUTO_LOCAL_MAX_ID: number;
        protected _localId: number;
        protected _entityId: number;
        protected _mapLayer: IMapLayer;
        protected _data: any;
        constructor();
        readonly localId: number;
        readonly entityId: number;
        readonly entityType: number;
        init(data: any, mapLayer: IMapLayer): void;
        release(): void;
        protected update(interval: number): void;
        protected $setY(value: number): boolean;
    }
}
declare namespace h5game {
    class Actor extends Entity {
        protected _actionState: number;
        protected _dir: number;
        protected _sprite: h5game.MCAdv;
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
        protected _mainPlayer: boolean;
        protected _spActs: any;
        protected _actorSt: ActorState;
        constructor();
        hp: number;
        maxHp: number;
        mp: number;
        maxMp: number;
        protected getName(): string;
        mainPlayer: boolean;
        init(data: any, mapLayer: IMapLayer): void;
        release(): void;
        update(interval: number): void;
        protected initSprite(): void;
        protected initNameLabel(): void;
        protected initHpBar(): void;
        protected refreshHpBar(): void;
        protected initMpBar(): void;
        protected refreshMpBar(): void;
        setDir(dir: number): void;
        protected _setActionState(actionState: number, loop: boolean): void;
        setActionState(actionState: number, loop: boolean): void;
        resetActionState(actionState: number, loop: boolean): void;
        protected getActStFrmRate(actionState: number): number;
        getActFrmCount(actionState: number): number;
        getCurActFrmCount(): number;
        getActStTime(actionState: number): number;
        getCurActStTime(): number;
        standAct(): void;
        runAct(): void;
        attackAct(): void;
        moveTo(x: number, y: number): void;
        protected clearMoveData(): void;
        stopMove(): void;
        updateMove(interval: any): void;
        protected setFlipX(flipX: boolean): void;
        adjustDir(tarX: number, tarY: number): void;
        setTouchEnabled(value: boolean): void;
        protected onTouchTab(event: egret.TouchEvent): void;
        protected playSpAct_STAND(data: any): void;
        protected playSpAct(spAct: any): void;
        protected addSpAct(time: number, type: ActorSpActType, data?: any, param?: any): void;
        protected updateSpAct(interval: number): void;
        protected clearSpAct(): void;
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
    enum ActorSpActType {
        ASAT_STAND = 1,
    }
    enum ActorStType {
        AST_NORMAL = 1,
        AST_ATTACK = 2,
    }
}
declare namespace h5game {
    class EntityUtil {
        static actionState2Str(actionState: number): string;
        static actStFrmRate(entityType: number, actionState: number): number;
    }
}
declare namespace h5game {
    class Monster extends Actor {
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: IMapLayer): void;
        release(): void;
        protected initSprite(): void;
        protected onTouchTab(event: egret.TouchEvent): void;
    }
}
declare namespace h5game {
    class Npc extends Actor {
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: IMapLayer): void;
        release(): void;
        protected initSprite(): void;
        protected onTouchTab(event: egret.TouchEvent): void;
    }
}
declare namespace h5game {
    class Player extends Actor {
        constructor();
        readonly entityType: number;
        init(data: any, mapLayer: IMapLayer): void;
        release(): void;
        protected initSprite(): void;
        moveTo(x: number, y: number): void;
        protected onTouchTab(event: egret.TouchEvent): void;
    }
}
declare namespace h5game {
    class ActorState extends BaseState {
        private _actor;
        private _state_tick;
        constructor(actor: Actor);
        protected enterState(next_state: number, next_st_data: any): void;
        protected exitState(state: number, next_state: any): void;
        protected updateState(interval: number): void;
        protected enterState_NORMAL(next_st_data: any): void;
        protected exitState_NORMAL(next_state: number): void;
        protected updateState_NORMAL(interval: number): void;
        protected enterState_ATTACK(next_st_data: any): void;
        protected exitState_ATTACK(next_state: number): void;
        protected updateState_ATTACK(interval: number): void;
    }
}
