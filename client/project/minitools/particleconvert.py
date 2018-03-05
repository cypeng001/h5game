# -*- coding: utf-8 -*-

import sys
from xml.dom.minidom import parse
import xml.dom.minidom

ATTR_TYPE_BOOL      = 1
ATTR_TYPE_INT       = 2
ATTR_TYPE_FLOAT     = 3
ATTR_TYPE_STR       = 4
ATTR_TYPE_VEC2      = 5
ATTR_TYPE_VEC3      = 6
ATTR_TYPE_RGBA      = 7
ATTR_TYPE_RECT      = 8
ATTR_TYPE_DYN       = 9
ATTR_TYPE_SP        = 10

def spValFunc_exclude_emitter(spDatas):
    ret = "["
    for index in range(len(spDatas)):
        ret += '"' + spDatas[index] + '"'
        if index < len(spDatas) - 1:
            ret += ", "
    ret += "]"
    return ret

def spValFunc_exclude_list(spDatas):
    ret = "[" + spDatas[0] + "]"
    ret = ret.replace(" ", ", ")
    return ret
            
def spValFunc_time_colour(spDatas):
    ret = "["
    for index in range(len(spDatas)):
        ret += spDatas[index]
        if index < len(spDatas) - 1:
            ret += " "
    ret += "]"
    ret = ret.replace(" ", ", ")
    return ret

def spValFunc_time_colour_list(spDatas):
    ret = "[" + spDatas[0] + "]"
    ret = ret.replace(" ", ", ")
    return ret

def spValFunc_pf_pos(spDatas):
    ret = "["
    for index in range(len(spDatas)):
        ret += spDatas[index]
        if index < len(spDatas) - 1:
            ret += " "
    ret += "]"
    ret = ret.replace(" ", ", ")
    return ret

def spValFunc_pf_pos_list(spDatas):
    ret = "[" + spDatas[0] + "]"
    ret = ret.replace(" ", ", ")
    return ret
            
def spValFunc_amin_type(spDatas):
    if spDatas[0] == "0":
        return "true"
    else:
        return "false"
                
class AttrDef:
    def __init__(self, key, attrType, outputKey, spValFunc = None):
        self.key = key
        self.attrType = attrType
        self.outputKey = outputKey
        self.spValFunc = spValFunc
        
    def getOutputKey(self):
        if(len(self.outputKey) > 0):
            return self.outputKey
        else:
            return self.key
        
RENDERER_BASE_ATTR_DEF = [
    AttrDef("texture_name", ATTR_TYPE_STR, "textureName"),
    AttrDef("mat_type", ATTR_TYPE_INT, "matType"),
    AttrDef("add_power_ratio", ATTR_TYPE_FLOAT, "enhanceAlpha"),
]

EMITTER_BASE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR, "name"),
    AttrDef("direction", ATTR_TYPE_VEC3, "direction"),
    AttrDef("position", ATTR_TYPE_VEC3, "position"),
    AttrDef("cycle_time", ATTR_TYPE_VEC2, "cycleTime"),
    AttrDef("emitter_start_time", ATTR_TYPE_FLOAT, "startTime"),
    AttrDef("emitter_end_time", ATTR_TYPE_FLOAT, "endTime"),
    AttrDef("emission_rate", ATTR_TYPE_FLOAT, "emissionRate"),
    AttrDef("force_emit", ATTR_TYPE_BOOL, "forceEmit"),
    AttrDef("live_forever", ATTR_TYPE_BOOL, "liveForever"),
    AttrDef("emitted_name", ATTR_TYPE_STR, "emittedName"),
    AttrDef("is_cycle", ATTR_TYPE_BOOL, "cycle"),
    AttrDef("start_color", ATTR_TYPE_RGBA, "startColor"),
    AttrDef("end_color", ATTR_TYPE_RGBA, "endColor"),
    AttrDef("emitter_color", ATTR_TYPE_RGBA, "emitterColor"),
    #AttrDef("use_all_size", ATTR_TYPE_BOOL, "use_all_size"),
    AttrDef("live_time", ATTR_TYPE_DYN, "liveTime"),
    AttrDef("angle", ATTR_TYPE_DYN, "angle"),
    AttrDef("width", ATTR_TYPE_DYN, "width"),
    AttrDef("height", ATTR_TYPE_DYN, "height"),
    AttrDef("depth", ATTR_TYPE_DYN, "depth"),
    AttrDef("all_xyz", ATTR_TYPE_DYN, "size"),
    AttrDef("velocity", ATTR_TYPE_DYN, "velocity"),
]


EMITTER_BOX_ATTR_DEF = [
    AttrDef("size", ATTR_TYPE_VEC3, "boxSize"),
    AttrDef("box_width", ATTR_TYPE_FLOAT, "boxWidth"),
    AttrDef("box_height", ATTR_TYPE_FLOAT, "boxHeight"),
    AttrDef("box_depth", ATTR_TYPE_FLOAT, "boxDepth"),
    AttrDef("box_dir", ATTR_TYPE_VEC3, "boxDir"),
]

EMITTER_CIRCLE_ATTR_DEF = [
    AttrDef("circle_random", ATTR_TYPE_BOOL, "circleRandom"),
    AttrDef("circle_step", ATTR_TYPE_FLOAT, "circleStep"),
    AttrDef("circle_angle", ATTR_TYPE_FLOAT, "circleAngle"),
    #AttrDef("circle_normal", ATTR_TYPE_VEC3, "circleNormal"),
    AttrDef("circle_x_radius", ATTR_TYPE_FLOAT, "circleXRadius"),
    AttrDef("circle_z_radius", ATTR_TYPE_FLOAT, "circleZRadius"),
    AttrDef("circle_x_width", ATTR_TYPE_FLOAT, "circleXWidth"),
    AttrDef("circle_z_width", ATTR_TYPE_FLOAT, "circleZWidth"),
    AttrDef("circle_radius", ATTR_TYPE_FLOAT, "circleRadius"),
    AttrDef("circle_auto_dir", ATTR_TYPE_BOOL, "circleAutoDirection"),
    #AttrDef("axis_type", ATTR_TYPE_INT, "axisType"),
    AttrDef("fan_start_angle", ATTR_TYPE_FLOAT, "circleFanStartAngle"),
    AttrDef("fan_end_angle", ATTR_TYPE_FLOAT, "circleFanEndAngle"),
]

EMITTER_LINE_ATTR_DEF = [
    AttrDef("start_point", ATTR_TYPE_VEC3, "startPoint"),
    AttrDef("line_direction", ATTR_TYPE_VEC3, "lineDir"),
    AttrDef("is_randomized", ATTR_TYPE_BOOL, "randomized"),
    AttrDef("increment", ATTR_TYPE_FLOAT, "increment"),
]

EMITTER_POINT_ATTR_DEF = [
]

EMITTER_SPHERE_ATTR_DEF = [
    AttrDef("sphere_radius", ATTR_TYPE_FLOAT, "sphereRadius"),
    AttrDef("sphere_aotu_dir", ATTR_TYPE_BOOL, "sphereAotuDir"),
]

AFFECTOR_BASE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR, "name"),
    AttrDef("exclude_emitter", ATTR_TYPE_SP, "excludeEmitters", spValFunc_exclude_emitter),
    AttrDef("affect_start", ATTR_TYPE_FLOAT, "affectStart"),
    AttrDef("affect_end", ATTR_TYPE_FLOAT, "affectEnd"),
    AttrDef("frist_state", ATTR_TYPE_BOOL, "fristState"),
    AttrDef("affect_enable", ATTR_TYPE_BOOL, "enable"),
    AttrDef("exclude_list", ATTR_TYPE_SP, "excludeEmitters", spValFunc_exclude_list),
]

AFFECTOR_COLOR_ATTR_DEF = [
    AttrDef("time_colour", ATTR_TYPE_SP, "colors", spValFunc_time_colour),
    AttrDef("time_colour_list", ATTR_TYPE_SP, "colors", spValFunc_time_colour_list),
]

AFFECTOR_DEFLECTOR_ATTR_DEF = [
    AttrDef("plane_point", ATTR_TYPE_VEC3, "planePoint"),
    AttrDef("plane_normal", ATTR_TYPE_VEC3, "planeNormal"),
    AttrDef("plane_bounce", ATTR_TYPE_DYN, "bounce"),
]

AFFECTOR_ELASTICITY_ATTR_DEF = [
    AttrDef("reverse_limit", ATTR_TYPE_FLOAT, "reverseLimit"),
    AttrDef("distance_factor", ATTR_TYPE_FLOAT, "distanceFactor"),
    AttrDef("time_start", ATTR_TYPE_FLOAT, "timeStart"),
    AttrDef("reverse_factor", ATTR_TYPE_FLOAT, "reverseFactor"),
    AttrDef("offset_radius", ATTR_TYPE_FLOAT, "offsetRadius"),
]

AFFECTOR_LINEARFORCE_ATTR_DEF = [
    AttrDef("force_vector", ATTR_TYPE_VEC3, "forceVector"),
    AttrDef("froce_app", ATTR_TYPE_INT, "froceApp"),
    AttrDef("dyn_force", ATTR_TYPE_DYN, "force"),
]

AFFECTOR_PATHFOLLOWER_ATTR_DEF = [
    AttrDef("pf_pos", ATTR_TYPE_SP, "points", spValFunc_pf_pos),
    AttrDef("pf_pos_list", ATTR_TYPE_SP, "points", spValFunc_pf_pos_list),
]

AFFECTOR_RANDOMISER_ATTR_DEF = [
    AttrDef("is_random_direction", ATTR_TYPE_BOOL, "randomDirection"),
    AttrDef("max_deviation", ATTR_TYPE_VEC3, "maxDeviation"),
    AttrDef("max_deviation_x", ATTR_TYPE_FLOAT, "maxDeviationX"),
    AttrDef("max_deviation_y", ATTR_TYPE_FLOAT, "maxDeviationY"),
    AttrDef("max_deviation_z", ATTR_TYPE_FLOAT, "maxDeviationZ"),
]

AFFECTOR_ROTATION_ATTR_DEF = [
    AttrDef("rot_speed", ATTR_TYPE_DYN, "rotationSpeed"),
    AttrDef("rot_start_angle", ATTR_TYPE_DYN, "rotationStartAngle"),
]

AFFECTOR_SCALE_ATTR_DEF = [
    AttrDef("scale_x", ATTR_TYPE_DYN, "scaleX"),
    AttrDef("scale_y", ATTR_TYPE_DYN, "scaleY"),
    AttrDef("scale_z", ATTR_TYPE_DYN, "scaleZ"),
    AttrDef("scale_xyz", ATTR_TYPE_DYN, "scaleSize"),
    #AttrDef("is_all_scale", ATTR_TYPE_BOOL, "reverseLimit"),
    AttrDef("scale_fixed", ATTR_TYPE_BOOL, "fixed"),
]

AFFECTOR_SUCTION_ATTR_DEF = [
    AttrDef("suction_force", ATTR_TYPE_DYN, "suction"),
    AttrDef("suction_pos", ATTR_TYPE_VEC3, "suctionPos"),
    AttrDef("suction_cv", ATTR_TYPE_BOOL, "collideVisible"),
    AttrDef("suction_type", ATTR_TYPE_INT, "suctionType"),
]

AFFECTOR_TEXANIM_ATTR_DEF = [
    AttrDef("time_step", ATTR_TYPE_FLOAT, "timeStep"),
    AttrDef("amin_type", ATTR_TYPE_SP, "cycle", spValFunc_amin_type),
    #AttrDef("start_frame", ATTR_TYPE_INT, "startFrame"),
    #AttrDef("random_start", ATTR_TYPE_BOOL, "random_start"),
    AttrDef("row_num", ATTR_TYPE_INT, "row"),
    AttrDef("col_num", ATTR_TYPE_INT, "col"),
    #AttrDef("anim_num", ATTR_TYPE_INT, "anim_num"),
    AttrDef("play_order", ATTR_TYPE_BOOL, "forward"),
]

AFFECTOR_VORTEX_ATTR_DEF = [
    AttrDef("vortex_rot_speed", ATTR_TYPE_DYN, "rotationSpeed"),
    AttrDef("vortex_vec", ATTR_TYPE_VEC3, "rotationVec"),
]

TECHNIQUE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR, "name"),
    AttrDef("particle_quota", ATTR_TYPE_INT, "particleQuota"),
    AttrDef("emitter_quota", ATTR_TYPE_INT, "emitterQuota"),
    AttrDef("tech_pos", ATTR_TYPE_VEC3, "position"),
    AttrDef("default_width", ATTR_TYPE_FLOAT, "defWidth"),
    AttrDef("default_height", ATTR_TYPE_FLOAT, "defHeight"),
    AttrDef("default_depth", ATTR_TYPE_FLOAT, "defDepth"),
    AttrDef("tech_axis", ATTR_TYPE_VEC3, "axis"),
    AttrDef("tech_angle", ATTR_TYPE_FLOAT, "angle"),
    AttrDef("tech_enable", ATTR_TYPE_BOOL, "enable"),
    AttrDef("is_local", ATTR_TYPE_BOOL, "local"),
]

PARTICLESYSTEM_ATTR_DEF = [
    AttrDef("cycle_total_time", ATTR_TYPE_FLOAT, "cycleTotalTime"),
    #AttrDef("is_cycle", ATTR_TYPE_BOOL, "cycle"),
    AttrDef("template_name", ATTR_TYPE_STR, "templateName"),
    AttrDef("ps_scale", ATTR_TYPE_FLOAT, "scale"),
    AttrDef("scale_speed", ATTR_TYPE_FLOAT, "scaleSpeed"),
    AttrDef("scale_time", ATTR_TYPE_FLOAT, "scaleTime"),
    AttrDef("pre_time", ATTR_TYPE_FLOAT, "preTime"),
    AttrDef("bound", ATTR_TYPE_RECT, "bound"),
    AttrDef("clipper_width", ATTR_TYPE_FLOAT, "clipperWidth"),
    AttrDef("clipper_height", ATTR_TYPE_FLOAT, "clipperHeight"),
    AttrDef("clipper_pos", ATTR_TYPE_VEC3, "clipperPos"),
    AttrDef("clipper_technique_list", ATTR_TYPE_SP, "clipperTechniqueList"),
    AttrDef("clipper_inverted", ATTR_TYPE_BOOL, "clipperInverted"),
]

PARTICLE_ISCYCLE_ATTR_DEF = AttrDef("is_cycle", ATTR_TYPE_BOOL, "cycle")
    
class DynAttr:
    def __init__(self):
        self.type = ""
        self.datas = []

class Attr:
    def __init__(self, attrDef):
        self.attrDef = attrDef
        
        self.attrDef = attrDef
        self.val = ""
        self.spDatas = []
        self.dynAttr = None
        
    def getOutputKey(self):
        return self.attrDef.getOutputKey()
        
    def getOutputVal(self):
        attrType = self.attrDef.attrType
        if attrType == ATTR_TYPE_BOOL:
            return self.val
        elif attrType == ATTR_TYPE_INT:
            return self.val
        elif attrType == ATTR_TYPE_FLOAT:
            return self.val
        elif attrType == ATTR_TYPE_STR:
            return '"' + self.val + '"'
        elif attrType == ATTR_TYPE_VEC2:
            return '[' + self.val.replace(' ', ', ', 1) + ']'
        elif attrType == ATTR_TYPE_VEC3:
            return '[' + self.val.replace(' ', ', ', 2) + ']'
        elif attrType == ATTR_TYPE_RGBA:
            return '[' + self.val.replace(' ', ', ', 3) + ']'
        elif attrType == ATTR_TYPE_RECT:
            return '[' + self.val.replace(' ', ', ', 3) + ']'
        elif attrType == ATTR_TYPE_DYN:
            ret = ''
            if self.dynAttr.type == "fixed":
                ret = '{"type": "fixed", "value": ' + self.dynAttr.datas[0] + '}'
            elif self.dynAttr.type == "random":
                ret = '{"type": "random", "value": [' + self.dynAttr.datas[0] + ', ' + self.dynAttr.datas[1] + ']}'
            elif self.dynAttr.type == "curve_spline":
                ret = ''
                for index in range(len(self.dynAttr.datas)):
                    ret += self.dynAttr.datas[index]
                    if index < len(self.dynAttr.datas) - 1:
                        ret += ' '
                        
                ret = ret.replace(' ', ', ')
                
                ret = '{"type": "curved", "value": [' + ret + ']}'
                
            return ret
            
        elif attrType == ATTR_TYPE_SP:
            if self.attrDef.spValFunc:
                return self.attrDef.spValFunc(self.spDatas)
            
        return self.spDatas
    
class Renderer:
    def __init__(self):
        self.type = ""
        self.attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
    
    def getOutputType(self):
        return self.type

class Emitter:
    def __init__(self):
        self.type = ""
        self.attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
    
    def getOutputType(self):
        return self.type
        
class Affector:
    def __init__(self):
        self.type = ""
        self.attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
    
    def getOutputType(self):
        if self.type == "TextureAnimator":
            return "TexAnim"
        elif self.type == "Colour":
            return "Color"
        elif self.type == "PathFollower":
            return "Spline"
        
        return self.type

class Technique:
    def __init__(self):
        self.attrs = []
        self.renderer = None
        self.emitters = []
        self.affectors = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
    
    def createRenderer(self):
        self.renderer = Renderer()
        return self.renderer
        
    def createEmitter(self):
        emitter = Emitter()
        self.emitters.append(emitter)
        return emitter
        
    def createAffector(self):
        affector = Affector()
        self.affectors.append(affector)
        return affector
        
class ParticleSystem:
    def __init__(self):
        self.attrs = []
        self.techniques = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
        
    def createTechnique(self):
        technique = Technique()
        self.techniques.append(technique)
        return technique
    
def parseDynAttr(dynAttrElem, attr):
    attr.type = dynAttrElem.getAttribute("type")
    
    dynAttr = DynAttr()
    dynAttr.type = dynAttrElem.getAttribute("dyn_type")
    if(dynAttr.type == "fixed"):
        valElem = dynAttrElem.getElementsByTagName("value")[0]
        dynAttr.datas.append(valElem.childNodes[0].data)
    elif(dynAttr.type == "random"):
        minElem = dynAttrElem.getElementsByTagName("min")[0]
        maxElem = dynAttrElem.getElementsByTagName("max")[0]
        dynAttr.datas.append(minElem.childNodes[0].data)
        dynAttr.datas.append(maxElem.childNodes[0].data)
    elif(dynAttr.type == "curve_spline"):
        pointsElems = dynAttrElem.getElementsByTagName("points")
        for index in range(len(pointsElems)):
            pointsElem = pointsElems[index]
            dynAttr.datas.append(pointsElem.childNodes[0].data)
            
    attr.dynAttr = dynAttr
            
def parseRenderer(rendererElem, renderer):
    renderer.type = rendererElem.getAttribute("type")
    
    for index in range(len(RENDERER_BASE_ATTR_DEF)):
        attrDef = RENDERER_BASE_ATTR_DEF[index]
        if(attrDef.attrType == ATTR_TYPE_DYN):
            dynAttrElems = rendererElem.getElementsByTagName("dyn")
            for dynAttrElemIdx in range(len(dynAttrElems)):
                dynAttrElem = dynAttrElems[dynAttrElemIdx]
                if dynAttrElem.getAttribute("type") == attrDef.key:
                    attr = renderer.createAttr(attrDef)
                    parseDynAttr(dynAttrElem, attr)
                    break
        else:
            attrElems = rendererElem.getElementsByTagName(attrDef.key)
            if(len(attrElems) > 0):
                attr = renderer.createAttr(attrDef)
                if attrDef.attrType == ATTR_TYPE_SP:
                    for aei in range(len(attrElems)):
                        attr.spDatas.append(attrElems[aei].childNodes[0].data)
                else:
                    attr.val = attrElems[0].childNodes[0].data
            

def parseEmitter(emitterElem, emitter):
    emitter.type = emitterElem.getAttribute("type")
    
    attrDefList = []
    attrDefList.append(EMITTER_BASE_ATTR_DEF)
    if(emitter.type == "Box"):
        attrDefList.append(EMITTER_BOX_ATTR_DEF)
    elif(emitter.type == "Circle"):
        attrDefList.append(EMITTER_CIRCLE_ATTR_DEF)
    elif(emitter.type == "Line"):
        attrDefList.append(EMITTER_LINE_ATTR_DEF)
    elif(emitter.type == "Point"):
        attrDefList.append(EMITTER_POINT_ATTR_DEF)
    elif(emitter.type == "Sphere"):
        attrDefList.append(EMITTER_SPHERE_ATTR_DEF)
    
    for k in range(len(attrDefList)):
        adl = attrDefList[k]
        
        for index in range(len(adl)):
            attrDef = adl[index]
            if(attrDef.attrType == ATTR_TYPE_DYN):
                dynAttrElems = emitterElem.getElementsByTagName("dyn")
                for dynAttrElemIdx in range(len(dynAttrElems)):
                    dynAttrElem = dynAttrElems[dynAttrElemIdx]
                    if dynAttrElem.getAttribute("type") == attrDef.key:
                        attr = emitter.createAttr(attrDef)
                        parseDynAttr(dynAttrElem, attr)
                        break
            else:
                attrElems = emitterElem.getElementsByTagName(attrDef.key)
                if(len(attrElems) > 0):
                    attr = emitter.createAttr(attrDef)
                    if attrDef.attrType == ATTR_TYPE_SP:
                        for aei in range(len(attrElems)):
                            attr.spDatas.append(attrElems[aei].childNodes[0].data)
                    else:
                        attr.val = attrElems[0].childNodes[0].data
                
    
def parseAffector(affectorElem, affector):
    affector.type = affectorElem.getAttribute("type")
    
    attrDefList = []
    attrDefList.append(AFFECTOR_BASE_ATTR_DEF)
    if(affector.type == "Colour"):
        attrDefList.append(AFFECTOR_COLOR_ATTR_DEF)
    elif(affector.type == "Deflector"):
        attrDefList.append(AFFECTOR_DEFLECTOR_ATTR_DEF)
    elif(affector.type == "Elasticity"):
        attrDefList.append(AFFECTOR_ELASTICITY_ATTR_DEF)
    elif(affector.type == "LinearForce"):
        attrDefList.append(AFFECTOR_LINEARFORCE_ATTR_DEF)
    elif(affector.type == "PathFollower"):
        attrDefList.append(AFFECTOR_PATHFOLLOWER_ATTR_DEF)
    elif(affector.type == "Randomiser"):
        attrDefList.append(AFFECTOR_RANDOMISER_ATTR_DEF)
    elif(affector.type == "Rotation"):
        attrDefList.append(AFFECTOR_ROTATION_ATTR_DEF)
    elif(affector.type == "Scale"):
        attrDefList.append(AFFECTOR_SCALE_ATTR_DEF)
    elif(affector.type == "Suction"):
        attrDefList.append(AFFECTOR_SUCTION_ATTR_DEF)
    elif(affector.type == "TextureAnimator"):
        attrDefList.append(AFFECTOR_TEXANIM_ATTR_DEF)
    elif(affector.type == "Vortex"):
        attrDefList.append(AFFECTOR_VORTEX_ATTR_DEF)
    
    for k in range(len(attrDefList)):
        adl = attrDefList[k]
        
        for index in range(len(adl)):
            attrDef = adl[index]
            if attrDef.attrType == ATTR_TYPE_DYN:
                dynAttrElems = affectorElem.getElementsByTagName("dyn")
                for dynAttrElemIdx in range(len(dynAttrElems)):
                    dynAttrElem = dynAttrElems[dynAttrElemIdx]
                    if dynAttrElem.getAttribute("type") == attrDef.key:
                        attr = affector.createAttr(attrDef)
                        parseDynAttr(dynAttrElem, attr)
                        break
            else:
                attrElems = affectorElem.getElementsByTagName(attrDef.key)
                if(len(attrElems) > 0):
                    attr = affector.createAttr(attrDef)
                    if attrDef.attrType == ATTR_TYPE_SP:
                        for aei in range(len(attrElems)):
                            attr.spDatas.append(attrElems[aei].childNodes[0].data)
                    else:
                        attr.val = attrElems[0].childNodes[0].data
                
    
def parseTechnique(techniqueElem, technique):
    for index in range(len(TECHNIQUE_ATTR_DEF)):
        attrDef = TECHNIQUE_ATTR_DEF[index]
        if(attrDef.attrType == ATTR_TYPE_DYN):
            dynAttrElems = techniqueElem.getElementsByTagName("dyn")
            for dynAttrElemIdx in range(len(dynAttrElems)):
                dynAttrElem = dynAttrElems[dynAttrElemIdx]
                if dynAttrElem.getAttribute("type") == attrDef.key:
                    attr = technique.createAttr(attrDef)
                    parseDynAttr(dynAttrElem, attr)
                    break
        else:
            attrElems = techniqueElem.getElementsByTagName(attrDef.key)
            if(len(attrElems) > 0):
                attr = technique.createAttr(attrDef)
                if attrDef.attrType == ATTR_TYPE_SP:
                    for aei in range(len(attrElems)):
                        attr.spDatas.append(attrElems[aei].childNodes[0].data)
                else:
                    attr.val = attrElems[0].childNodes[0].data
        
                    
    rendererElem = techniqueElem.getElementsByTagName("render")[0]
    renderer = technique.createRenderer()
    parseRenderer(rendererElem, renderer)
    
    emitterElemList = techniqueElem.getElementsByTagName("Emitter")
    for emitterElem in emitterElemList:
        emitter = technique.createEmitter()
        parseEmitter(emitterElem, emitter)
        
    affectorElemList = techniqueElem.getElementsByTagName("Affector")
    for affectorElem in affectorElemList:
        affector = technique.createAffector()
        parseAffector(affectorElem, affector)
        
        
def parseParticleSystem(particleSystemElem, particleSystem):
    if particleSystemElem.hasAttribute("is_cycle"):
        attr = particleSystem.createAttr(PARTICLE_ISCYCLE_ATTR_DEF)
        attr.val = particleSystemElem.getAttribute("is_cycle")
        
    for index in range(len(PARTICLESYSTEM_ATTR_DEF)):
        attrDef = PARTICLESYSTEM_ATTR_DEF[index]
        if(attrDef.attrType == ATTR_TYPE_DYN):
            dynAttrElems = particleSystemElem.getElementsByTagName("dyn")
            for dynAttrElemIdx in range(len(dynAttrElems)):
                dynAttrElem = dynAttrElems[dynAttrElemIdx]
                if dynAttrElem.getAttribute("type") == attrDef.key:
                    attr = particleSystem.createAttr(attrDef)
                    parseDynAttr(dynAttrElem, attr)
                    break
        else:
            attrElems = particleSystemElem.getElementsByTagName(attrDef.key)
            if(len(attrElems) > 0):
                attr = particleSystem.createAttr(attrDef)
                if attrDef.attrType == ATTR_TYPE_SP:
                    for aei in range(len(attrElems)):
                        attr.spDatas.append(attrElems[aei].childNodes[0].data)
                else:
                    attr.val = attrElems[0].childNodes[0].data
        
    techniqueElemList = particleSystemElem.getElementsByTagName("Technique")
    for techniqueElem in techniqueElemList:
        rendererElem = techniqueElem.getElementsByTagName("render")[0]
        if not rendererElem or rendererElem.getAttribute("type") == "Entity":
            continue
        
        technique = particleSystem.createTechnique()
        parseTechnique(techniqueElem, technique)
        
def parseXml(xmlPath):
    particleSystem = ParticleSystem()
    
    domtree = xml.dom.minidom.parse(xmlPath)
    particleSystemElem = domtree.documentElement
    
    parseParticleSystem(particleSystemElem, particleSystem)
        
    return particleSystem

TAB_STR = '    '
CR_STR = '\n'

def exportJson_attr(attr, fo, tabCnt, comma):
    fo.write(TAB_STR * tabCnt)
    fo.write('"' + attr.getOutputKey() + '": ' + attr.getOutputVal())
    if comma:
        fo.write(',')
    fo.write(CR_STR)

def exportJson_Renderer(renderer, fo):
    fo.write(TAB_STR * 5 + '"type": "' + renderer.getOutputType() + '",' + CR_STR)
    for index in range(len(renderer.attrs)):
        attr = renderer.attrs[index]
        exportJson_attr(attr, fo, 5, index < len(renderer.attrs) - 1)

def exportJson_Emitter(emitter, fo, comma):
    fo.write(TAB_STR * 5 + '{' + CR_STR)
    fo.write(TAB_STR * 6 + '"type": "' + emitter.getOutputType() + '",' + CR_STR)
    for index in range(len(emitter.attrs)):
        attr = emitter.attrs[index]
        exportJson_attr(attr, fo, 6, index < len(emitter.attrs) - 1)
    fo.write(TAB_STR * 5 + '}')
    if comma:
        fo.write(',')
    fo.write(CR_STR)

def exportJson_Affector(affector, fo, comma):
    fo.write(TAB_STR * 5 + '{' + CR_STR)
    fo.write(TAB_STR * 6 + '"type": "' + affector.getOutputType() + '",' + CR_STR)
    for index in range(len(affector.attrs)):
        attr = affector.attrs[index]
        exportJson_attr(attr, fo, 6, index < len(affector.attrs) - 1)
    fo.write(TAB_STR * 5 + '}')
    if comma:
        fo.write(',')
    fo.write(CR_STR)
    
def exportJson_Technique(technique, fo, comma):
    fo.write(TAB_STR * 3 + '{' + CR_STR)
             
    for index in range(len(technique.attrs)):
        exportJson_attr(technique.attrs[index], fo, 4, True)
    
    #export renderer
    fo.write(TAB_STR * 4 + '"Renderer": {' + CR_STR)
    exportJson_Renderer(technique.renderer, fo)
    fo.write(TAB_STR * 4 + '},' + CR_STR)
    
    #export emitter
    fo.write(TAB_STR * 4 + '"Emitters": [' + CR_STR)
    for index in range(len(technique.emitters)):
        exportJson_Emitter(technique.emitters[index], fo, index < len(technique.emitters) - 1)
    fo.write(TAB_STR * 4 + '],' + CR_STR)
    
    #export affector
    fo.write(TAB_STR * 4 + '"Affectors": [' + CR_STR)
    for index in range(len(technique.affectors)):
        exportJson_Affector(technique.affectors[index], fo, index < len(technique.affectors) - 1)
    fo.write(TAB_STR * 4 + ']' + CR_STR)
    
    fo.write(TAB_STR * 3 + '}')
    if comma:
        fo.write(',')
        
    fo.write(CR_STR)
    
def exportJson_ParticleSystem(particleSystem, fo):
    for index in range(len(particleSystem.attrs)):
        attr = particleSystem.attrs[index]
        exportJson_attr(attr, fo, 2, True)
        
    fo.write(TAB_STR * 2 + '"Techniques": [' + CR_STR)
    
    for index in range(len(particleSystem.techniques)):
        technique = particleSystem.techniques[index]
        exportJson_Technique(technique, fo, index < len(particleSystem.techniques) - 1)
    
    fo.write(TAB_STR * 2 + ']' + CR_STR)
    
def exportJson(particleSystem, fileName):
    exportPath = fileName + ".json"
    fo = open(exportPath, 'w')
    
    fo.write('{' + CR_STR + TAB_STR + '"' + fileName + '": {' + CR_STR)

    exportJson_ParticleSystem(particleSystem, fo)
    
    fo.write(TAB_STR + '}' + CR_STR + '}')
    
    fo.close()
    
if __name__ == '__main__':
    fileName = sys.argv[1]
    srcDir = sys.argv[2]
    xmlPath = srcDir + fileName + ".xml"
    particleSystem = parseXml(xmlPath)
    exportPath = fileName + ".json"
    exportJson(particleSystem, fileName)