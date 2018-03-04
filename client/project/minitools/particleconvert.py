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

class AttrDef:
    key = ""
    attrType = 0
    
    def __init__(self, key, attrType):
        self.key = key
        self.attrType = attrType
        
RENDERER_BASE_ATTR_DEF = [
    AttrDef("texture_name", ATTR_TYPE_STR),
    AttrDef("mat_type", ATTR_TYPE_INT),
    AttrDef("add_power_ratio", ATTR_TYPE_FLOAT),
]

EMITTER_BASE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR),
    AttrDef("direction", ATTR_TYPE_VEC3),
    AttrDef("position", ATTR_TYPE_VEC3),
    AttrDef("cycle_time", ATTR_TYPE_VEC2),
    AttrDef("emitter_start_time", ATTR_TYPE_FLOAT),
    AttrDef("emitter_end_time", ATTR_TYPE_FLOAT),
    AttrDef("emission_rate", ATTR_TYPE_FLOAT),
    AttrDef("force_emit", ATTR_TYPE_BOOL),
    AttrDef("live_forever", ATTR_TYPE_BOOL),
    AttrDef("emitted_name", ATTR_TYPE_STR),
    AttrDef("is_cycle", ATTR_TYPE_BOOL),
    AttrDef("start_color", ATTR_TYPE_RGBA),
    AttrDef("end_color", ATTR_TYPE_RGBA),
    AttrDef("emitter_color", ATTR_TYPE_RGBA),
    AttrDef("use_all_size", ATTR_TYPE_BOOL),
    AttrDef("live_time", ATTR_TYPE_DYN),
    AttrDef("angle", ATTR_TYPE_DYN),
    AttrDef("width", ATTR_TYPE_DYN),
    AttrDef("height", ATTR_TYPE_DYN),
    AttrDef("depth", ATTR_TYPE_DYN),
    AttrDef("all_xyz", ATTR_TYPE_DYN),
    AttrDef("velocity", ATTR_TYPE_DYN),
]


EMITTER_BOX_ATTR_DEF = [
    AttrDef("size", ATTR_TYPE_VEC3),
    AttrDef("box_width", ATTR_TYPE_FLOAT),
    AttrDef("box_height", ATTR_TYPE_FLOAT),
    AttrDef("box_depth", ATTR_TYPE_FLOAT),
    AttrDef("box_dir", ATTR_TYPE_VEC3),
]

EMITTER_CIRCLE_ATTR_DEF = [
    AttrDef("circle_random", ATTR_TYPE_BOOL),
    AttrDef("circle_step", ATTR_TYPE_FLOAT),
    AttrDef("circle_angle", ATTR_TYPE_FLOAT),
    AttrDef("circle_normal", ATTR_TYPE_VEC3),
    AttrDef("circle_x_radius", ATTR_TYPE_FLOAT),
    AttrDef("circle_z_radius", ATTR_TYPE_FLOAT),
    AttrDef("circle_x_width", ATTR_TYPE_FLOAT),
    AttrDef("circle_z_width", ATTR_TYPE_FLOAT),
    AttrDef("circle_radius", ATTR_TYPE_FLOAT),
    AttrDef("circle_auto_dir", ATTR_TYPE_BOOL),
    AttrDef("axis_type", ATTR_TYPE_INT),
    AttrDef("fan_start_angle", ATTR_TYPE_FLOAT),
    AttrDef("fan_end_angle", ATTR_TYPE_FLOAT),
]

EMITTER_LINE_ATTR_DEF = [
    AttrDef("start_point", ATTR_TYPE_VEC3),
    AttrDef("line_direction", ATTR_TYPE_VEC3),
    AttrDef("is_randomized", ATTR_TYPE_BOOL),
    AttrDef("increment", ATTR_TYPE_FLOAT),
]

EMITTER_POINT_ATTR_DEF = [
]

EMITTER_SPHERE_ATTR_DEF = [
    AttrDef("sphere_radius", ATTR_TYPE_FLOAT),
    AttrDef("sphere_aotu_dir", ATTR_TYPE_BOOL),
]

AFFECTOR_BASE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR),
    AttrDef("exclude_emitter", ATTR_TYPE_SP),
    AttrDef("affect_start", ATTR_TYPE_FLOAT),
    AttrDef("affect_end", ATTR_TYPE_FLOAT),
    AttrDef("frist_state", ATTR_TYPE_BOOL),
    AttrDef("affect_enable", ATTR_TYPE_BOOL),
    AttrDef("exclude_list", ATTR_TYPE_SP),
]

AFFECTOR_COLOR_ATTR_DEF = [
    AttrDef("time_colour", ATTR_TYPE_SP),
    AttrDef("time_colour_list", ATTR_TYPE_SP),
]

AFFECTOR_DEFLECTOR_ATTR_DEF = [
    AttrDef("plane_point", ATTR_TYPE_VEC3),
    AttrDef("plane_normal", ATTR_TYPE_VEC3),
    AttrDef("plane_bounce", ATTR_TYPE_DYN),
]

AFFECTOR_ELASTICITY_ATTR_DEF = [
    AttrDef("reverse_limit", ATTR_TYPE_FLOAT),
    AttrDef("distance_factor", ATTR_TYPE_FLOAT),
    AttrDef("time_start", ATTR_TYPE_FLOAT),
    AttrDef("reverse_factor", ATTR_TYPE_FLOAT),
    AttrDef("offset_radius", ATTR_TYPE_FLOAT),
]

AFFECTOR_LINEARFORCE_ATTR_DEF = [
    AttrDef("force_vector", ATTR_TYPE_VEC3),
    AttrDef("froce_app", ATTR_TYPE_INT),
    AttrDef("dyn_force", ATTR_TYPE_DYN),
]

AFFECTOR_PATHFOLLOWER_ATTR_DEF = [
    AttrDef("pf_pos", ATTR_TYPE_SP),
    AttrDef("pf_pos_list", ATTR_TYPE_SP),
]

AFFECTOR_RANDOMISER_ATTR_DEF = [
    AttrDef("is_random_direction", ATTR_TYPE_BOOL),
    AttrDef("max_deviation", ATTR_TYPE_VEC3),
    AttrDef("max_deviation_x", ATTR_TYPE_FLOAT),
    AttrDef("max_deviation_y", ATTR_TYPE_FLOAT),
    AttrDef("max_deviation_z", ATTR_TYPE_FLOAT),
]

AFFECTOR_ROTATION_ATTR_DEF = [
    AttrDef("rot_speed", ATTR_TYPE_DYN),
    AttrDef("rot_start_angle", ATTR_TYPE_DYN),
]

AFFECTOR_SCALE_ATTR_DEF = [
    AttrDef("scale_x", ATTR_TYPE_DYN),
    AttrDef("scale_y", ATTR_TYPE_DYN),
    AttrDef("scale_z", ATTR_TYPE_DYN),
    AttrDef("scale_xyz", ATTR_TYPE_DYN),
    AttrDef("is_all_scale", ATTR_TYPE_BOOL),
    AttrDef("scale_fixed", ATTR_TYPE_BOOL),
]

AFFECTOR_SUCTION_ATTR_DEF = [
    AttrDef("suction_force", ATTR_TYPE_DYN),
    AttrDef("suction_pos", ATTR_TYPE_VEC3),
    AttrDef("suction_cv", ATTR_TYPE_BOOL),
    AttrDef("suction_type", ATTR_TYPE_INT),
]

AFFECTOR_TEXANIM_ATTR_DEF = [
    AttrDef("time_step", ATTR_TYPE_FLOAT),
    AttrDef("amin_type", ATTR_TYPE_INT),
    AttrDef("start_frame", ATTR_TYPE_INT),
    AttrDef("random_start", ATTR_TYPE_BOOL),
    AttrDef("row_num", ATTR_TYPE_INT),
    AttrDef("col_num", ATTR_TYPE_INT),
    AttrDef("anim_num", ATTR_TYPE_INT),
    AttrDef("play_order", ATTR_TYPE_BOOL),
]

AFFECTOR_VORTEX_ATTR_DEF = [
    AttrDef("vortex_rot_speed", ATTR_TYPE_DYN),
    AttrDef("vortex_vec", ATTR_TYPE_VEC3),
]

TECHNIQUE_ATTR_DEF = [
    AttrDef("name", ATTR_TYPE_STR),
    AttrDef("particle_quota", ATTR_TYPE_INT),
    AttrDef("emitter_quota", ATTR_TYPE_INT),
    AttrDef("tech_pos", ATTR_TYPE_VEC3),
    AttrDef("default_width", ATTR_TYPE_FLOAT),
    AttrDef("default_height", ATTR_TYPE_FLOAT),
    AttrDef("default_depth", ATTR_TYPE_FLOAT),
    AttrDef("tech_axis", ATTR_TYPE_VEC3),
    AttrDef("tech_angle", ATTR_TYPE_FLOAT),
    AttrDef("tech_enable", ATTR_TYPE_BOOL),
    AttrDef("is_local", ATTR_TYPE_BOOL),
]

PARTICLESYSTEM_ATTR_DEF = [
    AttrDef("cycle_total_time", ATTR_TYPE_FLOAT),
    AttrDef("is_cycle", ATTR_TYPE_BOOL),
    AttrDef("template_name", ATTR_TYPE_STR),
    AttrDef("ps_scale", ATTR_TYPE_FLOAT),
    AttrDef("scale_speed", ATTR_TYPE_FLOAT),
    AttrDef("scale_time", ATTR_TYPE_FLOAT),
    AttrDef("pre_time", ATTR_TYPE_FLOAT),
    AttrDef("bound", ATTR_TYPE_RECT),
    AttrDef("clipper_width", ATTR_TYPE_FLOAT),
    AttrDef("clipper_height", ATTR_TYPE_FLOAT),
    AttrDef("clipper_pos", ATTR_TYPE_VEC3),
    AttrDef("clipper_technique_list", ATTR_TYPE_SP),
    AttrDef("clipper_inverted", ATTR_TYPE_BOOL),
]

PARTICLE_ISCYCLE_ATTR_DEF = AttrDef("is_cycle", ATTR_TYPE_BOOL)
    
class DynAttr:
    type = ""
    datas = []

class Attr:
    attrDef = None
    val = ""
    spDatas = []
    dynAttr = None
    
    def __init__(self, attrDef):
        self.attrDef = attrDef

class Renderer:
    type = ""
    attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr

class Emitter:
    type = ""
    attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr
        
class Affector:
    type = ""
    attrs = []
    
    def createAttr(self, attrDef):
        attr = Attr(attrDef)
        self.attrs.append(attr)
        return attr

class Technique:
    attrs = []
    
    renderer = None
    emitters = []
    affectors = []
    
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
    attrs = []
    techniques = []
    
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
                val = attrElems[0].childNodes[0].data
                if(attrDef.attrType == ATTR_TYPE_SP):
                    attrDef.spDatas.append(val)
                else:
                    attr.val = val
            

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
                attr = emitter.createAttr(attrDef)
                if(len(attrElems) > 0):
                    val = attrElems[0].childNodes[0].data
                    if(attrDef.attrType == ATTR_TYPE_SP):
                        attrDef.spDatas.append(val)
                    else:
                        attr.val = val
                
    
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
            if(attrDef.attrType == ATTR_TYPE_DYN):
                dynAttrElems = affectorElem.getElementsByTagName("dyn")
                for dynAttrElemIdx in range(len(dynAttrElems)):
                    dynAttrElem = dynAttrElems[dynAttrElemIdx]
                    if dynAttrElem.getAttribute("type") == attrDef.key:
                        attr = affector.createAttr(attrDef)
                        parseDynAttr(dynAttrElem, attr)
                        break
            else:
                attrElems = affectorElem.getElementsByTagName(attrDef.key)
                attr = affector.createAttr(attrDef)
                if(len(attrElems) > 0):
                    val = attrElems[0].childNodes[0].data
                    if(attrDef.attrType == ATTR_TYPE_SP):
                        attrDef.spDatas.append(val)
                    else:
                        attr.val = val
                
    
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
                val = attrElems[0].childNodes[0].data
                if(attrDef.attrType == ATTR_TYPE_SP):
                    attrDef.spDatas.append(val)
                else:
                    attr.val = val
                    
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
                val = attrElems[0].childNodes[0].data
                if(attrDef.attrType == ATTR_TYPE_SP):
                    attrDef.spDatas.append(val)
                else:
                    attr.val = val
        
    techniqueElemList = particleSystemElem.getElementsByTagName("Technique")
    for techniqueElem in techniqueElemList:
        technique = particleSystem.createTechnique()
        parseTechnique(techniqueElem, technique)
        
def parseXml(xmlPath):
    particleSystem = ParticleSystem()
    
    domtree = xml.dom.minidom.parse(xmlPath)
    particleSystemElem = domtree.documentElement
    
    parseParticleSystem(particleSystemElem, particleSystem)
        
    return particleSystem

def exportJson(particleSystem, exportPath):
    fo = open(exportPath, 'w')
    fo.close()
    
if __name__ == '__main__':
    fileName = sys.argv[1]
    xmlPath = fileName + ".xml"
    particleSystem = parseXml(xmlPath)
    exportPath = fileName + ".json"
    exportJson(particleSystem, exportPath)