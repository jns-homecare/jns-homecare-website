@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Apply-JNS-SEO-Migration.ps1"
if errorlevel 1 (
  echo.
  echo SEO migration failed. Read the error above and do not upload changed files yet.
)
pause
