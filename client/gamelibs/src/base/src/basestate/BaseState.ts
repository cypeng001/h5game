namespace h5game
{

export class BaseState {
    protected cur_state: number = -1;
    protected next_state: number = -1;
    protected next_st_data: any = null;

    public getCurState(): number {
	    return this.cur_state;
    }

    public clearCurState(): void {
        this.cur_state = -1
    }

    public update(interval: number): void {
        if(this.next_state > 0) {
            var next_state = this.next_state;
            var next_st_data = this.next_st_data;
            this.next_state = -1;
            this.next_st_data = null;

            this.exitState(this.cur_state, next_state);
            this.cur_state = next_state;
            this.enterState(next_state, next_st_data);
        }
        else {
            this.updateState(interval);
        }
    }

    protected enterState(next_state: number, next_st_data: any): void {
    }

    protected exitState(state: number, next_state: any): void {
    }

    protected updateState(interval: number): void {
    }

    public setNextState(next_state: number, next_st_data: any): void {
        this.next_state = next_state;
        this.next_st_data = next_st_data;
    }

}

}