class PSAffectorVortex extends PSAffector {
    protected _rotationVec: PSVec3 = [0, 0, 1];
    protected _quaternion: PSQuaternion = [0, 0, 0, 1];
    protected _dynRotationSpeed: PSDynAttr;

    constructor(technique: PSTechnique) {
		super(technique);
	}

    public setRotationVec(rotationVec: PSVec3): void {
        PSVec3Util.copy(rotationVec, this._rotationVec);
    }

    public setDynRotationSpeed(dynRotationSpeed: PSDynAttr): void {
        this._dynRotationSpeed = dynRotationSpeed;
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        var percent = particle.timeFactor;
        var angle = PSUtil.calcDynAttr(this._dynRotationSpeed, percent, 1) * timeElapsed * Math.PI / 180;
        PSQuaternionUtil.rotationAxis2Quaternion(this._rotationVec, angle, this._quaternion);

        PSQuaternionUtil.quaternionMultiplyVec3(this._quaternion, particle.position, particle.position);

        PSQuaternionUtil.quaternionMultiplyVec3(this._quaternion, particle.direction, particle.direction);

    }
}