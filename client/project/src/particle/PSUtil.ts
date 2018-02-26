class PSUtil {
    public static randInRange(min: number, max: number): number {
		var range = max - min;   
		var rand = Math.random();   
		return (min + Math.round(rand * range));   
	}

	public static randInRangeFloat(min: number, max: number): number {
		var range = max - min;   
		var rand = Math.random();   
		return (min + rand * range);   
	}
    
    public static createAffector(type: string, technique: PSTechnique): PSAffector {
        switch(type) {
            case "Rotation": {
                return new PSAffectorRotation(technique);
            }
            case "Scale": {
                return new PSAffectorScale(technique);
            }
            case "Elasticity": {
                return new PSAffectorElasticity(technique);
            }
            case "Randomiser": {
                return new PSAffectorRandomiser(technique);
            }
            case "LinearForce": {
                return new PSAffectorLinearForce(technique);
            }
            case "Color": {
                return new PSAffectorColor(technique);
            }
            case "TexAnim": {
                return new PSAffectorTexAnim(technique);
            }
        }

        return null;
    }

    public static createEmitter(type: string, technique: PSTechnique): PSEmitter {
        switch(type) {
            case "Point": {
                return new PSEmitterPoint(technique);
            }
            case "Sphere": {
                return new PSEmitterSphere(technique);
            }
        }

        return null;
    }

    public static createRenderer(type: string, technique: PSTechnique): PSRenderer {
        switch(type) {
            case "Billboard": {
                return new PSRendererBillboard(technique);
            }
        }

        return null;
    }

    public static calcDynAttr(dyn: PSDynAttr, x: number, defaultValue: number): number {
		if (dyn) {
			return dyn.getValue(x);
		}

		return defaultValue;
	}

    public static createDynAttr(type: string, data: any): PSDynAttr {
        switch(type) {
            case "fixed": {
                return new PSDynAttrFixed(data);
            }
            case "random": {
                return new PSDynAttrRandom(data);
            }
        }
    }
}