namespace h5game
{

export class ActorState extends BaseState {
    private _actor: Actor = null;
    private _state_tick: number = 0;

    constructor(actor: Actor) {
        super();

        this._actor = actor;
    }

    protected enterState(next_state: number, next_st_data: any): void {
        if(next_state == ActorStType.AST_NORMAL) {
            this.enterState_NORMAL(next_st_data);
        }
        else if(next_state == ActorStType.AST_ATTACK) {
            this.enterState_ATTACK(next_st_data);
        }
    }

    protected exitState(state: number, next_state: any): void {
        if(state == ActorStType.AST_NORMAL) {
            this.exitState_NORMAL(next_state);
        }
        else if(state == ActorStType.AST_ATTACK) {
            this.exitState_ATTACK(next_state);
        }
    }

    protected updateState(interval: number): void {
        if(this.cur_state == ActorStType.AST_NORMAL) {
            this.updateState_NORMAL(interval);
        }
        else if(this.cur_state == ActorStType.AST_ATTACK) {
            this.updateState_ATTACK(interval);
        }
    }

    protected enterState_NORMAL(next_st_data: any): void {
    }

    protected exitState_NORMAL(next_state: number): void {
    }

    protected updateState_NORMAL(interval: number): void {
    }

    protected enterState_ATTACK(next_st_data: any): void {
        this._state_tick = next_st_data.state_tick;
    }

    protected exitState_ATTACK(next_state: number): void {
        this._actor.standAct();
    }

    protected updateState_ATTACK(interval: number): void {
        this._state_tick -= interval;
        if(this._state_tick < 0) {
            this.setNextState(ActorStType.AST_NORMAL, null);
        }
    }

}

}