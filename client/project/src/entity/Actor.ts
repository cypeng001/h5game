class Actor extends Entity {
    protected _actionState: number = 0;
    protected _dir: number = ActorActionState.AAS_STANDFRONT;

    constructor() {
        super();
    }

    public init(data: any): void {
        super.init(data);
    }

    public release(): void {
        super.release();
    }

    public setActionState(actionState: number): void {
        if(this._actionState == actionState) {
            return;
        }
        this._actionState = actionState;

        this._sprite.gotoAndPlay(EntityUtil.actionState2Str(actionState), -1);
    }

    public setDir(dir: number): void {
        this._dir = dir;
    }

    public standAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_SOUNDEAST || this._dir == ActorDir.AD_SOUNDWEST) {
            actionState = ActorActionState.AAS_STANDFRONT;
        }
        else {
            actionState = ActorActionState.AAS_STANDBACK;
        }
        this.setActionState(actionState);
    }

    public runAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_SOUNDEAST || this._dir == ActorDir.AD_SOUNDWEST) {
            actionState = ActorActionState.AAS_RUNFRONT;
        }
        else {
            actionState = ActorActionState.AAS_RUNBACK;
        }
        this.setActionState(actionState);
    }
}