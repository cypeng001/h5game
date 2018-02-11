namespace h5game
{

export class Actor extends Entity {
    protected _actionState: number = 0;
    protected _dir: number = ActorActionState.AAS_STANDFRONT;

    protected _sprite: h5game.MCAdv;
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

    protected _mainPlayer: boolean = false;

    protected _spActs: any = [];

    protected _actorSt: ActorState = null;

    constructor() {
        super();

        this._actorSt = new ActorState(this);
    }

    public set hp(val: number) {
        this._hp = val;
    }

    public get hp(): number {
        return this._hp;
    }

    public set maxHp(val: number) {
        this._maxHp = val;
    }

    public get maxHp(): number {
        return this._maxHp;
    }

    public set mp(val: number) {
        this._mp = val;
    }

    public get mp(): number {
        return this._mp;
    }

    public set maxMp(val: number) {
        this._maxMp = val;
    }

    public get maxMp(): number {
        return this._maxMp;
    }

    protected getName(): string {
        return this._name;
    }

    public set mainPlayer(val: boolean) {
        this._mainPlayer = val;
    }

    public get mainPlayer(): boolean {
        return this._mainPlayer;
    }

    public init(data: any, mapLayer: IMapLayer): void {
        super.init(data, mapLayer);
    }

    public release(): void {
        super.release();
    }

    public update(interval: number): void {
        super.update(interval);

        this.updateMove(interval);
        this.updateSpAct(interval);

        this._actorSt.update(interval);
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
        this._hpBar.skinName = "resource/custom_skins/progressbar/actorProgressBarSkin1.exml";
        this._hpBar.width = 64;
        this._hpBar.height = 12;
        this._hpBar.minimum = 0;
        this._hpBar.maximum = this._maxHp;
        this._hpBar.value = this._hp;
        this._hpBar.anchorOffsetX = this._hpBar.width / 2;
        this._hpBar.y = -140;
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
        this._mpBar.visible = false;
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

    protected _setActionState(actionState: number, loop: boolean): void {
        var playTimes = loop ? -1 : 1;

        this._sprite.playAnimation(EntityUtil.actionState2Str(actionState), playTimes);

        var frameRate = this.getActStFrmRate(actionState);
        if(frameRate > 0) {
            this._sprite.frameRate = frameRate;
        }
    }

    public setActionState(actionState: number, loop: boolean): void {
        if(this._actionState == actionState) {
            return;
        }
        this._actionState = actionState;

        this._setActionState(actionState, loop);
    }

    public resetActionState(actionState: number, loop: boolean): void {
        this._actionState = actionState;

        this._setActionState(actionState, loop);
    }

    protected getActStFrmRate(actionState: number): number {
        return EntityUtil.actStFrmRate(this.entityType, actionState);
    }

    public getActFrmCount(actionState: number): number {
        return this._sprite.getFrameCount(EntityUtil.actionState2Str(actionState));
    }

    public getCurActFrmCount(): number {
        return this._sprite.getCurFrmCount();
    }

    public getActStTime(actionState: number): number {
        var frameRate = this.getActStFrmRate(actionState);
        var frameCount = this.getActFrmCount(actionState);
        return frameCount / frameRate;
    }

    public getCurActStTime(): number {
        var frameRate = this.getActStFrmRate(this._actionState);
        var frameCount = this.getCurActFrmCount();
        return frameCount / frameRate;
    }

    public standAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_STANDFRONT;
        }
        else {
            actionState = ActorActionState.AAS_STANDBACK;
        }
        this.setActionState(actionState, true);
    }

    public runAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_RUNFRONT;
        }
        else {
            actionState = ActorActionState.AAS_RUNBACK;
        }
        this.setActionState(actionState, true);
    }

    public attackAct(): void {
        var actionState = 0;
        if(this._dir == ActorDir.AD_EASTSOUTH || this._dir == ActorDir.AD_WESTSOUTH) {
            actionState = ActorActionState.AAS_ATTACKFRONT;
        }
        else {
            actionState = ActorActionState.AAS_ATTACKBACK;
        }
        this.setActionState(actionState, false);
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

    public setTouchEnabled(value: boolean): void {
        this._sprite.touchEnabled = value;
        if(value) {
            this._sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        else {
            this._sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
    }

    protected onTouchTab(event: egret.TouchEvent): void {
        event.stopPropagation();
    }

    protected playSpAct_STAND(data: any): void {
		this.standAct();
	}

    protected playSpAct(spAct: any): void {
		var type = spAct.type;
		var data = spAct.data;
		var param = spAct.param;
		switch(type) {
			case ActorSpActType.ASAT_STAND: {
				this.playSpAct_STAND(data);
				break;
            }
		}
	}

    protected addSpAct(time: number, type: ActorSpActType, data: any = null, param: any = null): void {
        this._spActs.push({
            time: time,
            type: type,
            data: data,
            param: param
        });
    }

    protected updateSpAct(interval: number): void {
        for(var i in this._spActs) {
            var spAct = this._spActs[i];
            spAct.time = spAct.time - interval;
        }

        for(var i in this._spActs) {
            var spAct = this._spActs[i];
            if(spAct.time <= 0) {
                this._spActs.splice(i, 1);
                this.playSpAct(spAct);
                break;
            }
        }
    }

    protected clearSpAct(): void {
        this._spActs = [];
    }

    public execSkill(skillId: number, data: any): void {
        this.attackAct();

        //this.addSpAct(this.getCurActStTime(), ActorSpActType.ASAT_STAND);
        this._actorSt.setNextState(ActorStType.AST_ATTACK, {state_tick: this.getCurActStTime()})

        var resultData = data.result;
        if(resultData.result == AttackResult.SUCCESS) {
            var defActor = this._mapLayer.query(IMapCmdQ.IMCQ_GetActor, [data.target]);
            defActor.hp -= resultData.damage;
            defActor.refreshHpBar();

            var offsetY = -180;
            this._mapLayer.notify(IMapCmdN.IMCN_CreateNum, [defActor.x, defActor.y + offsetY, 0, resultData.damage]);

            if(defActor.mainPlayer) {
                IntfcProxy.getLocalMsgDispatcher().dispatchMsg(ILocalMsg.ILM_Player_ChangeHp, {hp: defActor.hp, maxHp: defActor.maxHp});
            }
        }
    }
}

}