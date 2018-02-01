import os
import zipfile

ROOT_DIR = '../resource/config'
ZIP_PATH = '../resource/config.zip'
BASE_DATA_DIR = '../resource/config/data'

TAB_STR = '    '
CR_STR = '\n'

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
                manifest.append(filename[0:len(filename)-5])

    fo.write('[' + CR_STR)
    for k in range(len(manifest)):
        fo.write('"' + manifest[k] + '"')
        if k < len(manifest) - 1:
            fo.write(',')
        fo.write(CR_STR)
    fo.write(']')

    fo.close()

if __name__ == '__main__':
    exportManifest(BASE_DATA_DIR)
    zipConfig()