class Actor extends Entity {
    protected _actionState: number = 0;
    protected _dir: number = ActorActionState.AAS_STANDFRONT;

    protected _sprite: egret.MovieClip;
    protected _nameLabel: eui.Label;

    protected _moveTarPos: [number, number] = [0, 0];
    protected _moveSpeed: [number, number] = [0, 0];
    protected _moving: boolean = false;

    protected _speed: number = 200;
    protected _spriteScale: number = 1;

    constructor() {
        super();
    }

    protected getName(): string {
        return "actor";
    }

    public init(data: any): void {
        super.init(data);
    }

    public release(): void {
        super.release();
    }

    public update(interval: number): void {
        super.update(interval);

        this.updateMove(interval);
    }

    protected initSprite(): void {

    }

    protected initNameLabel(): void {
        this._nameLabel = new eui.Label(this.getName());

		this._nameLabel.width = 100;
		this._nameLabel.height = 20;
		this._nameLabel.textAlign = 'center';
		this._nameLabel.size = 13;
		this._nameLabel.stroke = 1;
		this._nameLabel.strokeColor = 0x333333;
		this._nameLabel.anchorOffsetY = 60;
		this._nameLabel.anchorOffsetX = this._nameLabel.width / 2;
		this._nameLabel.verticalAlign = "bottom";
		this._nameLabel.scaleX = this._nameLabel.scaleY = 0.8;

		this.addChild(this._nameLabel);
    }

    public setDir(dir: number): void {
        this._dir = dir;
    }

    public setActionState(actionState: number): void {
        if(this._actionState == actionState) {
            return;
        }
        this._actionState = actionState;

        this._sprite.gotoAndPlay(EntityUtil.actionState2Str(actionState), -1);
    }

    public standAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_STANDFRONT;
        }
        else {
            actionState = ActorActionState.AAS_STANDBACK;
        }
        this.setActionState(actionState);
    }

    public runAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_RUNFRONT;
        }
        else {
            actionState = ActorActionState.AAS_RUNBACK;
        }
        this.setActionState(actionState);
    }

    public attackAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_ATTACKFRONT;
        }
        else {
            actionState = ActorActionState.AAS_ATTACKBACK;
        }
        this.setActionState(actionState);
    }

    public moveTo(x: number, y: number): void {
        if(this.x == x && this.y == y) {
            this.stopMove();
            return;
        }

        this._moving = true;
        this._moveTarPos[0] = x;
        this._moveTarPos[1] = y;
        
        var dir = VectorUtil.calcDir(this.x, this.y, x, y);
        this._moveSpeed[0] = dir[0] * this._speed;
        this._moveSpeed[1] = dir[1] * this._speed;

        this.adjustDir(x, y);

        this.runAct();
    }

    protected clearMoveData(): void {
        this._moving = false;
        this._moveTarPos[0] = 0;
        this._moveTarPos[1] = 0;
        this._moveSpeed[0] = 0;
        this._moveSpeed[1] = 0;
    }

    public stopMove(): void {
        this.clearMoveData();
        this.standAct();
    }

    public updateMove(interval): void {
        if(!this._moving) {
            return;
        }

        this.x += this._moveSpeed[0] * interval;
        this.y += this._moveSpeed[1] * interval;

        var dist = VectorUtil.calcLength(this._moveTarPos[0] - this.x, this._moveTarPos[1] - this.y);
        if(dist < this._speed * interval) {
            this.x = this._moveTarPos[0];
            this.y = this._moveTarPos[1];

            this.clearMoveData();
            this.standAct();
        }
    }

    protected setFlipX(flipX: boolean): void {
        this._sprite.scaleX = flipX ? -this._spriteScale : this._spriteScale;
    }

    protected adjustDir(target_pos_x: number, target_pos_y: number): void {
        var x_distance = target_pos_x - this.x
	    var y_distance = target_pos_y - this.y

        if(x_distance == 0 && y_distance == 0) {
            return;
        }

        if(x_distance > 0) {
            if(y_distance < 0) {
                this._dir = ActorDir.AD_EASTNORTH;
            }
            else {
                this._dir = ActorDir.AD_EASTSOUTH;
            }

            this.setFlipX(false);
        }
        else {
            if(y_distance < 0) {
                this._dir = ActorDir.AD_WESTNORTH;
            }
            else {
                this._dir = ActorDir.AD_WESTSOUTH;
            }

            this.setFlipX(true);
        }
    }
}