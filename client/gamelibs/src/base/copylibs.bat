@echo off

xcopy ..\..\bin\base\base.d.ts ..\mcaux\libs\base.d.ts /Y
xcopy ..\..\bin\base\base.d.ts ..\entity\libs\base.d.ts /Y
xcopy ..\..\bin\base\base.d.ts ..\map\libs\base.d.ts /Y

pause