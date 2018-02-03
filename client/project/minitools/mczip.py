import os
import zipfile
from zlib import crc32

ROOT_DIR = '../resource/movieclip'
ZIP_PATH = '../resource/movieclip.zip'

TAB_STR = '    '
CR_STR = '\n'

def getCrc32(filename):
    f = open(filename, 'rb')
    ret = crc32(f.read())
    ret = hex(ret)
    ret = ret[len(ret) - 8 : len(ret)]
    f.close()
    return ret

def zipConfig():
    f = zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED)

    for dirpath, dirnames, filenames in os.walk(ROOT_DIR):  
        for filename in filenames:
            if filename[-5:len(filename)] == '.json':
                filepath = dirpath + '/' + filename
                filepath = filepath.replace('\\', '/')
                arcname = filepath[len(ROOT_DIR) + 1: len(filepath)]
                f.write(filepath, arcname)

    f.close()

def exportManifest(dir):
    fo = open(dir + '/manifest.json', 'w')

    manifest = []
    for dirpath, dirnames, filenames in os.walk(dir):  
        for filename in filenames: 
            if filename[-5:len(filename)] == '.json' and filename != 'manifest.json':
                manifest.append((filename[0:len(filename)-5], getCrc32(dirpath + '/' +filename)))

    fo.write('{' + CR_STR)
    for k in range(len(manifest)):
        fo.write(TAB_STR + '["' + manifest[k][0] + '"] : "' + manifest[k][1] + '"')
        if k < len(manifest) - 1:
            fo.write(',')
        fo.write(CR_STR)
    fo.write('}')

    fo.close()

if __name__ == '__main__':
    exportManifest(ROOT_DIR)
    zipConfig()