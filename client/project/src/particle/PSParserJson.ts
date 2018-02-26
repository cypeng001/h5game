class PSParserJson {
    public static parse(data: any): PSParticleSystem {
        var particleSystem = new PSParticleSystem;
        for(var key in data) {
            var val = data[key];
            switch(key) {
                case "Techniques": {
                    var techniques = val;
                    for(let i in techniques) {
                        PSParserJson.parseTechnique(particleSystem, techniques[i]);
                    }
                }
                break;
                case "cycle": {
                    particleSystem.setCycle(val);
                }
                break;
                case "bound": {
                    particleSystem.setBound(val);
                }
                break;
            }
        }
        return particleSystem;
    }

    private static parseTechnique(particleSystem: PSParticleSystem, data: any): void {
        var technique = particleSystem.createTechnique();
        for(var key in data) {
            var val = data[key];
            switch(key) {
                case "Renderer": {
                    PSParserJson.parseRenderer(technique, val);
                }
                break;
                case "Emitter": {
                    var emitters = val;
                    for(let i in emitters) {
                        PSParserJson.parseEmitter(technique, emitters[i]);
                    }
                }
                break;
                case "Affectors": {
                    var affectors = val;
                    for(let i in affectors) {
                        PSParserJson.parseAffector(technique, affectors[i]);
                    }
                }
                break;
                case "name": {
                    technique.setName(val);
                }
                break;
                case "enable": {
                    technique.setEnable(val);
                }
                break;
                case "axis": {
                    technique.setAxis(val);
                }
                break;
                case "angle": {
                    technique.setAngle(val);
                }
                break;
                case "quota": {
                    technique.setQuota(val);
                }
                break;
            }
        }
    }

    private static parseRendererBaseAttr(renderer: PSRenderer, attrType: string, attrVal: any): void {
        switch(attrType) {
            case "textureName": {
                renderer.setTextureName(attrVal);
            }
            break;
            case "addPowerRatio": {
                renderer.setAddPowerRatio(attrVal);
            }
            break;
            case "matType": {
                renderer.setMatType(attrVal);
            }
            break;
        }
    }

    private static parseRendererBillboardAttr(renderer: PSRenderer, attrType: string, attrVal: any): void {
        var rendererImpl = <PSRendererBillboard>renderer;
        PSParserJson.parseRendererBaseAttr(renderer, attrType, attrVal);
    }

    private static parseRenderer(technique: PSTechnique, data: any): void {
        var type = data.type;
        var renderer = technique.createRenderer(type);
        var parseRendererAttrFunc = null;
        switch(type) {
            case "Billboard":
            parseRendererAttrFunc = PSParserJson.parseRendererBillboardAttr;
        }
        for(var key in data) {
            if(key != "type") {
                parseRendererAttrFunc(renderer, key, data[key]);
            }
        }
    }

    private static parseEmitterBaseAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        switch(attrType) {
            case "name": {
                emitter.setName(attrVal);
            }
            break;
            case "cycleTime": {
                emitter.setCycleTime(attrVal[0], attrVal[1]);
            }
            break;
            case "forceEmit": {
                emitter.setForceEmit(attrVal);
            }
            break;
            case "liveForever": {
                emitter.setLiveForever(attrVal);
            }
            break;
            case "cycle": {
                emitter.setCycle(attrVal);
            }
            break;
            case "liveTime": {
                emitter.setDynLiveTime(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "angle": {
                emitter.setDynAngle(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "width": {
                emitter.setDynWidth(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "height": {
                emitter.setDynHeight(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "depth": {
                emitter.setDynDepth(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "size": {
                emitter.setDynSize(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "useAllSize": {
                emitter.setUseAllSize(attrVal);
            }
            break;
            case "velocity": {
                emitter.setDynVelocity(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "direction": {
                emitter.setDirection(attrVal);
            }
            break;
        }
    }

    private static parseEmitterPointAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterPoint>emitter;

        PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
    }

    private static parseEmitterSphereAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterSphere>emitter;

        switch(attrType) {
            case "sphereRadius": {
                emitterImpl.setRadius(attrVal);
            }
            break;
            case "sphereAutoDir": {
                emitterImpl.setAutoDir(attrVal);
            }
            break;

            default: {
                PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
            }
        }
    }

    private static parseEmitter(technique: PSTechnique, data: any): void {
        var type = data.type;
        var emitter = technique.createEmitter(type);
        var parserEmitterAttrFunc = null;
        switch(type) {
            case "Point":
            parserEmitterAttrFunc = PSParserJson.parseEmitterPointAttr;
            break;
            case "Sphere":
            parserEmitterAttrFunc = PSParserJson.parseEmitterSphereAttr;
            break;
        }
        for(var key in data) {
            if(key != "type") {
                parserEmitterAttrFunc(emitter, key, data[key]);
            }
        }
    }

    private static parseAffectorBaseAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        switch(attrType) {
            case "name": {
                affector.setName(attrVal);
            }
        }
    }

    private static parseAffectorTexAnimAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorTexAnim>affector;
        switch(attrType) {
            case "timeStep": {
                affectorImpl.setTimeStep(attrVal);
            }
            break;
            case "col": {
                affectorImpl.setCol(attrVal);
            }
            break;
            case "row": {
                affectorImpl.setRow(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorRotationAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorRotation>affector;
        switch(attrType) {
            case "rotationSpeed": {
                affectorImpl.setDynSpeed(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "rotationStartAngle": {
                affectorImpl.setDynStartAngle(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorElasticityAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorElasticity>affector;
        switch(attrType) {
            case "distanceFactor": {
                affectorImpl.setDistanceFactor(attrVal);
            }
            break;
            case "reverseLimit": {
                affectorImpl.setReverseLimit(attrVal);
            }
            break;
            case "timeStart": {
                affectorImpl.setTimeStart(attrVal);
            }
            break;
            case "reverseFactor": {
                affectorImpl.setReverseFactor(attrVal);
            }
            break;
            case "offsetRadius": {
                affectorImpl.setOffsetRadius(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffector(technique: PSTechnique, data: any): void {
        var type = data.type;
        var affector = technique.createAffector(type);
        var parserAffectorAttrFunc = null;
        switch(type) {
            case "TexAnim":
            parserAffectorAttrFunc = PSParserJson.parseAffectorTexAnimAttr;
            break;
            case "Rotation":
            parserAffectorAttrFunc = PSParserJson.parseAffectorRotationAttr;
            break;
            case "Elasticity":
            parserAffectorAttrFunc = PSParserJson.parseAffectorElasticityAttr;
            break;
        }
        for(var key in data) {
            if(key != "type") {
                parserAffectorAttrFunc(affector, key, data[key]);
            }
        }
    }
}