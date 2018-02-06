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

    protected _name: string;
    protected _hp: number = 0;
    protected _maxHp: number = 1;
    protected _mp: number = 0;
    protected _maxMp: number = 1;

    protected _hpBar: eui.ProgressBar;
    protected _mpBar: eui.ProgressBar;

    constructor() {
        super();
    }

    public set hp(val: number) {
        this._hp = val;
    }

    public get hp(): number {
        return this._hp;
    }

    public set mp(val: number) {
        this._mp = val;
    }

    public get mp(): number {
        return this._mp;
    }

    protected getName(): string {
        return this._name;
    }

    public init(data: any, mapLayer: h5game.IMapLayer): void {
        super.init(data, mapLayer);
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
		this._nameLabel.anchorOffsetX = this._nameLabel.width / 2;
		this._nameLabel.verticalAlign = "bottom";
        this._nameLabel.y = -130;

		this.addChild(this._nameLabel);
    }

    protected initHpBar(): void {
        this._hpBar = new eui.ProgressBar();
        this._hpBar.width = 60;
        this._hpBar.height = 10;
        this._hpBar.minimum = 0;
        this._hpBar.maximum = this._maxHp;
        this._hpBar.value = this._hp;
        this._hpBar.anchorOffsetX = this._hpBar.width / 2;
        this._hpBar.y = -170;
        this.addChild(this._hpBar);
    }

    protected refreshHpBar(): void {
        this._hpBar.minimum = 0;
        this._hpBar.maximum = this._maxHp;
        this._hpBar.value = this._hp;
    }

    protected initMpBar(): void {
        this._mpBar = new eui.ProgressBar();
        this._mpBar.width = 60;
        this._mpBar.height = 10;
        this._mpBar.minimum = 0;
        this._mpBar.maximum = this._maxMp;
        this._mpBar.value = this._mp;
        this._mpBar.anchorOffsetX = this._mpBar.width / 2;
        this._mpBar.y = -150;
        this.addChild(this._mpBar);
    }

    protected refreshMpBar(): void {
        this._mpBar.minimum = 0;
        this._mpBar.maximum = this._maxMp;
        this._mpBar.value = this._mp;
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
        
        var dir = h5game.VectorUtil.calcDir(this.x, this.y, x, y);
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

        var dist = h5game.VectorUtil.calcLength(this._moveTarPos[0] - this.x, this._moveTarPos[1] - this.y);
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

    public adjustDir(tarX: number, tarY: number): void {
        var distX = tarX - this.x
	    var distY = tarY - this.y

        if(distX == 0 && distY == 0) {
            return;
        }

        if(distX > 0) {
            if(distY < 0) {
                this._dir = ActorDir.AD_EASTNORTH;
            }
            else {
                this._dir = ActorDir.AD_EASTSOUTH;
            }

            this.setFlipX(false);
        }
        else {
            if(distY < 0) {
                this._dir = ActorDir.AD_WESTNORTH;
            }
            else {
                this._dir = ActorDir.AD_WESTSOUTH;
            }

            this.setFlipX(true);
        }
    }

    public execSkill(skillId: number, data: any): void {
        this.attackAct();

        var resultData = data.result;
        if(resultData.result == AttackResult.SUCCESS) {
            this._mapLayer.notify(h5game.IMapCmdN.IMCN_CreateNum, [this.x, this.y, 0, resultData.damage]);

            var defActor = this._mapLayer.query(h5game.IMapCmdQ.IMCQ_GetActor, data.target);
            defActor.hp -= resultData.damage;
            defActor.refreshHpBar();
        }
    }
}