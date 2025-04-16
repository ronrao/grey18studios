@echo off
echo Opening Grey 18 Studio website files...

:: Open the navigation page first
start "" "navigation.html"

:: Wait a second before opening other pages
timeout /t 1 >nul

:: Open the main pages
start "" "index.html"
start "" "portfolio.html"
start "" "about.html"

echo All files opened successfully!
pause 