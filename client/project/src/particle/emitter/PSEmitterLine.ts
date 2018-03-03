class PSEmitterLine extends PSEmitter {
	protected _startPoint: PSVec3 = [0, 0, 0];
	protected _endPoint: PSVec3 = [0, 0, 0];
	protected _lineDir: PSVec3 = [0, 0, 0];
	protected _lineNormalizeDir: PSVec3 = [0, 0, 0];
	protected _lastCreatePos: PSVec3 = [0, 0, 0];
	protected _randomized: boolean = true;
	protected _increment: number = 0.5;

	constructor(technique: PSTechnique) {
		super(technique);
	}

	public setStartPoint(startPoint: PSVec3): void {
		PSVec3Util.copy(startPoint, this._startPoint);
		PSVec3Util.copy(startPoint, this._lastCreatePos);

		PSVec3Util.add(this._startPoint, this._lineDir, this._endPoint);
	}

	public setLineDir(lineDir: PSVec3): void {
		PSVec3Util.copy(lineDir, this._lineDir);
		PSVec3Util.copy(lineDir, this._lineNormalizeDir);
		PSVec3Util.normalize(this._lineNormalizeDir);

		PSVec3Util.add(this._startPoint, this._lineDir, this._endPoint);
	}

	public setRandomized(randomized: boolean): void {
		this._randomized = randomized;
	}

	public setIncrement(increment: number): void {
		this._increment = increment;
	}

	protected initParticlePos(particle: PSParticle): void {
		var posTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var dirTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var lineDirRandTmp = PSVec3Ftry.getInstance().create(0, 0, 0);
		var incrementDirTmp = PSVec3Ftry.getInstance().create(0, 0, 0);

		if (this._randomized) {
			PSVec3Util.multiply(this._lineDir, PSUtil.randInRangeFloat(0, 1), lineDirRandTmp);
			PSVec3Util.add(this._startPoint, lineDirRandTmp, posTmp);
			PSVec3Util.add(this._relativePos, posTmp, particle.position);
		}
		else {
			PSVec3Util.multiply(this._lineNormalizeDir, this._increment, incrementDirTmp);
			PSVec3Util.add(this._lastCreatePos, incrementDirTmp, posTmp);
			PSVec3Util.add(this._relativePos, posTmp, particle.position);
			PSVec3Util.copy(posTmp, this._lastCreatePos);

			PSVec3Util.sub(this._lastCreatePos, this._endPoint, dirTmp);

			var need_turn_around = true;
			if(PSVec3Util.len(dirTmp) > 0) {
				var d = PSVec3Util.dot(this._lineNormalizeDir, dirTmp);
				if (d <= 0) {
					need_turn_around = false;
				}
			}
			if(need_turn_around) {
				PSVec3Util.copy(this._startPoint, this._lastCreatePos);
			}
		}

		PSVec3Ftry.getInstance().release(posTmp);
		PSVec3Ftry.getInstance().release(dirTmp);
		PSVec3Ftry.getInstance().release(lineDirRandTmp);
		PSVec3Ftry.getInstance().release(incrementDirTmp);
	}
}