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
                case "cycleTotalTime": {
                    particleSystem.setCycleTotalTime(val);
                }
                break;
                case "bound": {
                    particleSystem.setBound(val);
                }
                break;
                default: {
                    console.log("PSParserJson.parse invalid key", key);
                }
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
                case "Emitters": {
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
                case "particleQuota": {
                    technique.setParticleQuota(val);
                }
                break;
                case "defWidth": {
                    technique.setDefaultWidth(val);
                }
                break;
                case "defHeight": {
                    technique.setDefaultHeight(val);
                }
                break;
                case "defDepth": {
                    technique.setDefaultDepth(val);
                }
                break;
                case "position": {
                    technique.setPosition(val);
                }
                break;
                default: {
                    console.log("PSParserJson.parseTechnique invalid key", key);
                }
            }
        }
    }

    private static parseRendererBaseAttr(renderer: PSRenderer, attrType: string, attrVal: any): void {
        switch(attrType) {
            case "textureName": {
                renderer.setTextureName(attrVal);
            }
            break;
            case "enhanceAlpha": {
                renderer.setEnhanceAlpha(attrVal);
            }
            break;
            case "matType": {
                renderer.setMatType(attrVal);
            }
            break;
            default: {
                console.log("PSParserJson.parseRendererBaseAttr invalid attrType", attrType);
            }
        }
    }

    private static parseRendererBillboardAttr(renderer: PSRenderer, attrType: string, attrVal: any): void {
        var rendererImpl = <PSRendererBillboard>renderer;
        switch(attrType) {
            case "originType": {
                rendererImpl.setOriginType(attrVal);
            }
            break;
            default: {
                PSParserJson.parseRendererBaseAttr(renderer, attrType, attrVal);
            }
        }
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
            case "startTime": {
                emitter.setStartTime(attrVal);
            }
            break;
            case "endTime": {
                emitter.setEndTime(attrVal);
            }
            break;
            case "emissionRate": {
                emitter.setEmissionRate(attrVal);
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
            case "velocity": {
                emitter.setDynVelocity(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "position": {
                emitter.setPosition(attrVal);
            }
            break;
            case "direction": {
                emitter.setDirection(attrVal);
            }
            break;
            case "startColor": {
                emitter.setStartColor(attrVal);
            }
            break;
            case "endColor": {
                emitter.setEndColor(attrVal);
            }
            break;
            default: {
                console.log("PSParserJson.parseEmitterBaseAttr invalid attrType", attrType);
            }
        }
    }

    private static parseEmitterPointAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterPoint>emitter;

        PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
    }

    private static parseEmitterLineAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterLine>emitter;

        switch(attrType) {
            case "startPoint": {
                emitterImpl.setStartPoint(attrVal);
            }
            break;
            case "lineDir": {
                emitterImpl.setLineDir(attrVal);
            }
            break;
            case "randomized": {
                emitterImpl.setRandomized(attrVal);
            }
            break;
            case "increment": {
                emitterImpl.setIncrement(attrVal);
            }
            break;
            default: {
                PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
            }
        }
    }

    private static parseEmitterBoxAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterBox>emitter;

        switch(attrType) {
            case "boxSize": {
                emitterImpl.setBoxSize(attrVal);
            }
            break;
            case "boxWidth": {
                emitterImpl.setBoxWidth(attrVal);
            }
            break;
            case "boxHeight": {
                emitterImpl.setBoxHeight(attrVal);
            }
            break;
            case "boxDepth": {
                emitterImpl.setBoxDepth(attrVal);
            }
            break;
            case "boxUp": {
                emitterImpl.setBoxUp(attrVal);
            }
            break;
            case "boxDir": {
                emitterImpl.setBoxDir(attrVal);
            }
            break;
            default: {
                PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
            }
        }
    }

    private static parseEmitterCircleAttr(emitter: PSEmitter, attrType: string, attrVal: any): void {
        var emitterImpl = <PSEmitterCircle>emitter;
        switch(attrType) {
            case "circleRandom": {
                emitterImpl.setRandom(attrVal);
            }
            break;
            case "circleStep": {
                emitterImpl.setStep(attrVal);
            }
            break;
            case "circleXRadius": {
                emitterImpl.setXRadius(attrVal);
            }
            break;
            case "circleZRadius": {
                emitterImpl.setZRadius(attrVal);
            }
            break;
            case "circleXWidth": {
                emitterImpl.setXWidth(attrVal);
            }
            break;
            case "circleZWidth": {
                emitterImpl.setZWidth(attrVal);
            }
            break;
            case "circleAngle": {
                emitterImpl.setCircleAngle(attrVal);
            }
            break;
            case "circleAutoDirection": {
                emitterImpl.setAutoDirection(attrVal);
            }
            break;
            case "circleFanStartAngle": {
                emitterImpl.setFanStartAngle(attrVal);
            }
            break;
            case "circleFanEndAngle": {
                emitterImpl.setFanEndAngle(attrVal);
            }
            break;
            default: {
                PSParserJson.parseEmitterBaseAttr(emitter, attrType, attrVal);
            }
        }
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
            case "Line":
            parserEmitterAttrFunc = PSParserJson.parseEmitterLineAttr;
            break;
            case "Box":
            parserEmitterAttrFunc = PSParserJson.parseEmitterBoxAttr;
            break;
            case "Circle":
            parserEmitterAttrFunc = PSParserJson.parseEmitterCircleAttr;
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
            break;
            case "enable": {
                affector.setEnable(attrVal);
            }
            break;
            case "excludeEmitters": {
                for(var i in attrVal) {
                    var emitter = attrVal[i];
                    affector.addExcludeEmitter(emitter);
                }
            }
            break;
            default: {
                console.log("PSParserJson.parseAffectorBaseAttr invalid attrType", attrType);
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
            case "animType": {
                affectorImpl.setCycle(attrVal == 1);
            }
            break;
            case "cycle": {
                affectorImpl.setCycle(attrVal);
            }
            break;
            case "forward": {
                affectorImpl.setForward(attrVal);
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

    private static parseAffectorLinearForceAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorLinearForce>affector;
        switch(attrType) {
            case "forceVector": {
                affectorImpl.setForceVector(attrVal);
            }
            break;
            case "forceApp": {
                affectorImpl.setForceApp(attrVal);
            }
            break;
            case "force": {
                affectorImpl.setDynForce(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorRandomiserAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorRandomiser>affector;
        switch(attrType) {
            case "randomDirection": {
                affectorImpl.setRandomDirection(attrVal);
            }
            break;
            case "maxDeviation": {
                affectorImpl.setMaxDeviation(attrVal);
            }
            break;
            case "maxDeviationX": {
                affectorImpl.setMaxDeviationX(attrVal);
            }
            break;
            case "maxDeviationY": {
                affectorImpl.setMaxDeviationY(attrVal);
            }
            break;
            case "maxDeviationZ": {
                affectorImpl.setMaxDeviationZ(attrVal);
            }
            break;
            case "randomRange": {
                affectorImpl.setRandomRange(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorColorAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorColor>affector;
        switch(attrType) {
            case "colors": {
                for(var i = 0; i < attrVal.length; i+=5) {
                    affectorImpl.addColor(attrVal[i], 
                        [attrVal[i + 1], attrVal[i + 2], attrVal[i + 3], attrVal[i + 4]]);
                }
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorScaleAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorScale>affector;
        switch(attrType) {
            case "scaleX": {
                affectorImpl.setDynScaleX(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "scaleY": {
                affectorImpl.setDynScaleY(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "scaleZ": {
                affectorImpl.setDynScaleZ(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "scaleSize": {
                affectorImpl.setDynScaleSize(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "fixed": {
                affectorImpl.setFixed(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorSplineAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorSpline>affector;
        switch(attrType) {
            case "points": {
                for(var i = 0; i < attrVal.length; i += 3) {
                    affectorImpl.addPoint([attrVal[i], attrVal[i + 1], attrVal[i + 2]]);
                }
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorDeflectorAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorDeflector>affector;
        switch(attrType) {
            case "bounce": {
                affectorImpl.setDynBounce(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "planePoint": {
                affectorImpl.setPlanePoint(attrVal);
            }
            break;
            case "planeNormal": {
                affectorImpl.setPlaneNormal(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorSuctionAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorSuction>affector;
        switch(attrType) {
            case "collideVisible": {
                affectorImpl.setCollideVisible(attrVal);
            }
            break;
            case "suctionPos": {
                affectorImpl.setSuctionPos(attrVal);
            }
            break;
            case "suction": {
                affectorImpl.setDynSuction(PSUtil.createDynAttr(attrVal.type, attrVal.value));
            }
            break;
            case "suctionType": {
                affectorImpl.setSuctionType(attrVal);
            }
            break;
            default:
            PSParserJson.parseAffectorBaseAttr(affector, attrType, attrVal);
        }
    }

    private static parseAffectorVortexAttr(affector: PSAffector, attrType: string, attrVal: any): void {
        var affectorImpl = <PSAffectorVortex>affector;
        switch(attrType) {
            case "rotationVec": {
                affectorImpl.setRotationVec(attrVal);
            }
            break;
            case "rotationSpeed": {
                affectorImpl.setDynRotationSpeed(PSUtil.createDynAttr(attrVal.type, attrVal.value));
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
            case "Rotation":
            parserAffectorAttrFunc = PSParserJson.parseAffectorRotationAttr;
            break;
            case "Scale":
            parserAffectorAttrFunc = PSParserJson.parseAffectorScaleAttr;
            break;
            case "Elasticity":
            parserAffectorAttrFunc = PSParserJson.parseAffectorElasticityAttr;
            break;
            case "Randomiser":
            parserAffectorAttrFunc = PSParserJson.parseAffectorRandomiserAttr;
            break;
            case "LinearForce":
            parserAffectorAttrFunc = PSParserJson.parseAffectorLinearForceAttr;
            break;
            case "Deflector":
            parserAffectorAttrFunc = PSParserJson.parseAffectorDeflectorAttr;
            break;
            case "Color":
            parserAffectorAttrFunc = PSParserJson.parseAffectorColorAttr;
            break;
            case "TexAnim":
            parserAffectorAttrFunc = PSParserJson.parseAffectorTexAnimAttr;
            break;
            case "Spline":
            parserAffectorAttrFunc = PSParserJson.parseAffectorSplineAttr;
            break;
            case "Suction":
            parserAffectorAttrFunc = PSParserJson.parseAffectorSuctionAttr;
            break;
            case "Vortex":
            parserAffectorAttrFunc = PSParserJson.parseAffectorVortexAttr;
            break;
        }
        for(var key in data) {
            if(key != "type") {
                parserAffectorAttrFunc(affector, key, data[key]);
            }
        }
    }
}