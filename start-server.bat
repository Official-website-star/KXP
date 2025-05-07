@echo off
echo KXP网站临时服务器启动工具
echo ===========================
echo.

REM 检查是否安装了http-server
where http-server >nul 2>nul
if %errorlevel% neq 0 (
  echo 正在安装http-server...
  npm install -g http-server
  if %errorlevel% neq 0 (
    echo 安装http-server失败，请确保您已安装Node.js
    echo 您可以访问 https://nodejs.org/ 下载并安装
    pause
    exit /b
  )
)

echo 正在启动服务器，请稍候...
echo.
echo 服务器启动后，请在浏览器中访问以下地址：
echo 本地访问: http://localhost:8080
echo.
echo 如需在局域网内共享，请使用以下地址：
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /r /c:"IPv4"') do (
  echo 局域网访问: http:%%a:8080
  goto :continue
)
:continue
echo.
echo 按Ctrl+C并输入Y可停止服务器
echo ===========================
echo.

http-server -p 8080
pause 