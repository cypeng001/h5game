class PSEmitterCircle extends PSEmitter {
	protected _random: boolean = true;
	protected _step: number = 10;
	protected _circleAngle: number = 0;
	protected _xRadius: number = 32;
	protected _zRadius: number = 32;
	protected _xWidth: number = 1;
	protected _zWidth: number = 1;
	protected _x: number = 0;
	protected _z: number = 0;
	protected _autoDirection: boolean = false;
	protected _tempVec: PSVec3 = [0, 0, 0];
	protected _fanStartAngle: number = 0;
	protected _fanEndAngle: number = 360;
	
	constructor(technique: PSTechnique) {
		super(technique);
	}

	public setRandom(random: boolean): void {
		this._random = random;
	}

	public setStep(step: number): void {
		this._step = step;
	}

	public setXRadius(xRadius: number): void {
		this._xRadius = xRadius;
	}

	public setZRadius(zRadius: number): void {
		this._zRadius = zRadius;
	}

	public setXWidth(xWidth: number): void {
		this._xWidth = xWidth;
	}

	public setZWidth(zWidth: number): void {
		this._zWidth = zWidth;
	}

	public setCircleAngle(circleAngle: number): void {
		this._circleAngle = circleAngle;
	}

	public setAutoDirection(autoDirection: boolean): void {
		this._autoDirection = autoDirection;
	}

	public setFanStartAngle(fanStartAngle: number): void {
		this._fanStartAngle = fanStartAngle;
	}

	public setFanEndAngle(fanEndAngle: number): void {
		this._fanEndAngle = fanEndAngle;
	}

	protected initParticlePos(particle: PSParticle): void {
		var m = this._fanEndAngle;
		var angle = 0, x_off_width = 0, z_off_width = 0;
		if (this._random) {
			var temp_angle = this._fanEndAngle - this._fanStartAngle;
			angle = PSUtil.randInRangeFloat(0, temp_angle) + this._fanStartAngle;
			x_off_width = PSUtil.randInRangeFloat(0, this._xWidth);
			z_off_width = PSUtil.randInRangeFloat(0, this._zWidth);
		}
		else {
			this._circleAngle += this._step;
			this._circleAngle = this._circleAngle > 360 ? this._circleAngle - 360 : this._circleAngle;
			angle = this._circleAngle;
		}

		angle = angle * Math.PI / 180;
		this._x = (this._xRadius - x_off_width) * Math.cos(angle);
		this._z = (this._zRadius - z_off_width) * Math.sin(angle) ;

		PSVec3Util.set(this._tempVec, this._x, this._z, 0);

		var tmpVec = PSVec3Ftry.getInstance().create(this._tempVec[0], -this._tempVec[1], this._tempVec[2]);
		PSVec3Util.add(this._relativePos, tmpVec, particle.position);

		PSVec3Ftry.getInstance().release(tmpVec);
	}

	protected initParticleDirection(particle): void {
		if (this._autoDirection) {
			PSVec3Util.normalize(this._tempVec);
			PSVec3Util.set(particle.direction, this._tempVec[0], -this._tempVec[1], this._tempVec[2]);
		}
		else {
			super.initParticleDirection(particle);
		}
	}

}