class PSUtil {
    public static createAffector(type: string, technique: PSTechnique): PSAffector {
        switch(type) {
            case "Rotation": {
                return new PSAffectorRotation(technique);
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
        }
    }
}