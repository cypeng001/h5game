class PSAffectorSpline extends PSAffector {
    protected _spline: PSSimpleSpline = new PSSimpleSpline;

    constructor(technique: PSTechnique) {
        super(technique);
    }

    public addPoint(point: PSVec3): void {
        this._spline.addPoint(point);
    }

    public effectParticle(particle: PSParticle, timeElapsed: number): void {
        if (this._spline.getNumPoints() > 0) {
            var timeLeft = particle.totalLive - particle.timeLive;
            var timeFractionPlusDelta = timeLeft / particle.totalLive;
            timeFractionPlusDelta = timeFractionPlusDelta < 1 ? timeFractionPlusDelta : 1;
            this._spline.interpolate(timeFractionPlusDelta, particle.position);
        }
    }

}