@echo off
rem -------------------------------------------------------------------------
rem (C) Luxoft 2003-2013 GenHelp ver. 4.xx  
rem -------------------------------------------------------------------------
rem -------------------------------------------------------------------------
rem This is the COMPLETE.BAT file
rem Customize it in the source  document folder (Update folder) 
rem The file may contain OS commands or command line utility calls
rem The file is invoked at the end of Help generation by the GenHelp program
rem -------------------------------------------------------------------------
rem Description of the bat parameters passed by the GenHelp program
rem GH   - path to the GenHelp folder (for example, "C:\Program Files\GenHelp")
rem PRJ  - path to the processed GenHelp project folder containing the .ini file 
rem             (for example, "C:\Prj\Project_name\OnlineHelp")
rem INI  - project .ini file name (without ".ini") 
rem -------------------------------------------------------------------------

SET GH=%1
SET GHNQ=%~1
SET PRJ=%2
SET PRJNQ=%~2
SET INI=%3
SET ININQ=%~3


rem ------------------------------------------------------------------------
rem N... Optional steps of user customization (insert your commands here)
rem ------------------------------------------------------------------------
cd %PRJ%\Output

rem
rem E X A M P L E (launching genh_sr.exe)
rem
rem SET GHPEXE=%GHNQ%\genh_sr.exe
rem SET GHSRPRJOUT=%PRJNQ%\Output

rem @echo on
rem USER-CUSTOMIZATION STEP A1. ReDef styles for generated htmls
rem cls
rem SET GHSRINI=userupd1.ini
rem "%GHPEXE%" -config="%GHSRPRJOUT%\%GHSRINI%" -files="%GHSRPRJOUT%" -fmask="_{1}(.)*\.htm" 
rem @echo off


@echo on