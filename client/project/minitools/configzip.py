import os
import zipfile

rootdir = "../resource/config"
zippath = "../resource/config.zip"

f = zipfile.ZipFile(zippath, 'w', zipfile.ZIP_DEFLATED)

for dirpath, dirnames, filenames in os.walk(rootdir):  
    for filename in filenames: 
        filepath = dirpath + "/" + filename
        filepath = filepath.replace("\\", "/")
        arcname = filepath[len(rootdir) + 1: len(filepath)]
        f.write(filepath, arcname)  

f.close()