class PSEmitterBox extends PSEmitter {
	protected _boxSize: PSVec3 = [0, 0, 0];
	protected _boxDir: PSVec3 = [0, 0, 1];
	protected _boxUp: PSVec3 = [0, 1, 0];
	protected _boxRangeDirty: boolean = true;
	protected _rangeX: PSVec3 = [0, 0, 0];
	protected _rangeY: PSVec3 = [0, 0, 0];
	protected _rangeZ: PSVec3 = [0, 0, 0];
	
	constructor(technique: PSTechnique) {
		super(technique);
	}

	public setBoxSize(size: PSVec3): void {
		if(PSVec3Util.equal(size, this._boxSize)) {
			return;
		}
		PSVec3Util.copy(size, this._boxSize);
		this._boxRangeDirty = true;
	}

	public setBoxWidth(width: number): void {
		if(this._boxSize[0] == width) {
			return;
		}
		this._boxSize[0] = width;
		this._boxRangeDirty = true;
	}

	public setBoxHeight(height: number): void {
		if(this._boxSize[1] == height) {
			return;
		}
		this._boxSize[1] = height;
		this._boxRangeDirty = true;
	}

	public setBoxDepth(depth: number): void {
		if(this._boxSize[2] == depth) {
			return;
		}
		this._boxSize[2] = depth;
		this._boxRangeDirty = true;
	}

	public setBoxDir(dir: PSVec3): void {
		if(PSVec3Util.equal(dir, this._boxDir)) {
			return;
		}
		PSVec3Util.copy(dir, this._boxDir);
		this._boxRangeDirty = true;
	}

	public setBoxUp(up: PSVec3): void {
		if(PSVec3Util.equal(up, this._boxUp)) {
			return;
		}
		PSVec3Util.copy(up, this._boxUp);
		this._boxRangeDirty = true;
	}

	protected refreshBoxRange(): void {
		if(!this._boxRangeDirty) {
			return;
		}
		this._boxRangeDirty = false;

		var leftTmp = PSVec3Ftry.getInstance().create(0, 0, 0);

		PSVec3Util.cross(this._boxUp, this._boxDir, leftTmp);

		PSVec3Util.multiply(leftTmp, this._boxSize[0] * 0.5, this._rangeX);
		PSVec3Util.multiply(this._boxUp, this._boxSize[1] * 0.5, this._rangeY);
		PSVec3Util.multiply(this._boxDir, this._boxSize[2] * 0.5, this._rangeZ);

		PSVec3Ftry.getInstance().release(leftTmp);
	}

	protected initParticlePos(particle: PSParticle): void {
		this.refreshBoxRange();

		var xOffTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var yOffTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var zOffTmp = PSVec3Ftry.getInstance().create(0, 0, 0);

		var v1Tmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var offsetTmp = PSVec3Ftry.getInstance().create(0, 0, 0);

		PSVec3Util.multiply(this._rangeX, PSUtil.randInRangeFloat(-1, 1), xOffTmp);
		PSVec3Util.multiply(this._rangeY, PSUtil.randInRangeFloat(-1, 1), yOffTmp);
		PSVec3Util.multiply(this._rangeZ, PSUtil.randInRangeFloat(-1, 1), zOffTmp);

		PSVec3Util.add(xOffTmp, yOffTmp, v1Tmp);
		PSVec3Util.add(v1Tmp, zOffTmp, offsetTmp);
		PSVec3Util.add(this._relativePos, offsetTmp, particle.position);

		PSVec3Ftry.getInstance().release(xOffTmp);
		PSVec3Ftry.getInstance().release(yOffTmp);
		PSVec3Ftry.getInstance().release(zOffTmp);

		PSVec3Ftry.getInstance().release(v1Tmp);
		PSVec3Ftry.getInstance().release(offsetTmp);
	}
}