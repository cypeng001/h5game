class PSEmitterSphere extends PSEmitter {
	protected _radius: number = 0;
	protected _autoDir: boolean = false;

	private _randomVec: PSVec3 = [0, 0, 0];

	constructor(technique: PSTechnique) {
		super(technique);
	}

	public setRadius(radius: number): void {
		this._radius = radius;
	}

	public setAutoDir(autoDir: boolean): void {
		this._autoDir = autoDir;
	}

	protected initParticlePos(particle: PSParticle): void {
		this._randomVec[0] = PSUtil.randInRangeFloat(-1, 1);
		this._randomVec[1] = PSUtil.randInRangeFloat(-1, 1);
		this._randomVec[2] = PSUtil.randInRangeFloat(-1, 1);
		if(PSVec3Util.len(this._randomVec) == 0) {
			PSVec3Util.copy(PSVec3_UNIT_X, this._randomVec);
		}
		PSVec3Util.normalize(this._randomVec);

		var vecTmp = PSVec3Ftry.getInstance().create(1, 0, 0);

		PSVec3Util.multiply(this._randomVec, this._radius, vecTmp);
		PSVec3Util.add(this._relativePos, vecTmp, particle.position);
		
		PSVec3Ftry.getInstance().release(vecTmp);
	}

	protected initParticleDirection(particle: PSParticle): void {
		if(this._autoDir) {
			var angle = this.generateAngle();
			PSVec3Util.rotate(this._randomVec, particle.direction, angle);
		}
		else {
			super.initParticleDirection(particle);
		}
	}
}