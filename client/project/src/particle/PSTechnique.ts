class PSTechnique {
    private _particleSystem: PSParticleSystem;
    private _name: string;
    private _axis: PSVec3;
    private _angle: number;
    private _affectors: PSAffector[] = [];
    private _emitters: PSEmitter[] = [];
    private _renderer: PSRenderer = null;

    constructor(particleSystem: PSParticleSystem) {
        this._particleSystem = particleSystem;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public setAxis(axis: PSVec3): void {
        this._axis = PSVec3Util.copy(axis, this._axis);
    }

    public setAngle(angle: number): void {
        this._angle = angle;
    }

    public getCycleTimeFactor(): number {
        return this._particleSystem.getCycleTimeFactor();
    }

    public createAffector(type: string): PSAffector {
        var affector = PSUtil.createAffector(type, this);
        this._affectors.push(affector);
        return affector;
    }

    public createEmitter(type: string): PSEmitter {
        var emitter = PSUtil.createEmitter(type, this);
        this._emitters.push(emitter);
        return emitter;
    }

    public createRenderer(type: string): PSRenderer {
        this._renderer = PSUtil.createRenderer(type, this);
        return this._renderer;
    }

    public update(interval: number): void {
        this.emitParticles(interval);
    }

    private emitParticles(interval: number): void {

    }

    private createParticle(): PSParticle {
        return new PSParticle;
    }

    private triggerEmitter(emitter: PSEmitter, requested: number, interval: number): void {
        if(!requested) {
            return;
        }

        for(var i = 0; i < requested; ++i) {
            var p = this.createParticle();
            emitter.initParticle(p);

            for(var k in this._affectors) {
                this._affectors[k].initParticle(p);
            }
        }
    }
}