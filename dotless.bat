@echo off
rem -------------------------------------------------------------------------
rem (C) Luxoft 2003-2013 GenHelp ver. 4.xx  
rem dotless complilation for .less file to the .css file
rem -------------------------------------------------------------------------
SET F=%1
"%F%\dotless\dotless.Compiler.exe" %F%\css_skin.less %F%\css_skin.css