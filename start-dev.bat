@echo off
title Devfolio - Development Server
color 0A

echo ==========================================
echo   Devfolio - Starting Development Server
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" goto :error_dir

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" goto :install_deps

goto :start_server

:install_deps
echo Installing dependencies (first run only)...
echo This may take a minute...
call npm install
if errorlevel 1 goto :error_install
echo.
echo Dependencies installed successfully!
echo.

:start_server
echo Starting Next.js development server...
echo.
echo The app will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

echo.
echo Server stopped.
pause
goto :eof

:error_dir
echo ERROR: package.json not found!
echo Please run this script from the Devfolio project root directory.
pause
exit /b 1

:error_install
echo ERROR: Failed to install dependencies
pause
exit /b 1