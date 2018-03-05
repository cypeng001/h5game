# -*- coding: utf-8 -*-

import sys
import shutil

def parseParticleTex(filepath):
    texs = {}
    
    fo = open(filepath, "r")
 
    tnl = len('<texture_name>')
    for line in fo.readlines():
        startIndex = line.find('<texture_name>')
        if startIndex >= 0:
            endIndex = line.find('</texture_name>')
            texName = line[startIndex + tnl: endIndex]
            texs[texName] = True
    
    fo.close()
    
    return texs

if __name__ == '__main__':
    fileName = sys.argv[1]
    psDir = sys.argv[2]
    srcDir = sys.argv[3]
    dstDir = sys.argv[4]
    
    filePath = psDir + fileName + ".xml"
    
    texs = parseParticleTex(filePath)
    
    for tex in texs.keys():
        print("copy " + tex + ".tga")
        srcPath = srcDir + tex + ".tga"
        dstPath = dstDir + tex + ".tga"
        shutil.copyfile(srcPath, dstPath)