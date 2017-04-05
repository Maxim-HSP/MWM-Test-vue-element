::跳转到项目目录
cd %cd% 

::启动后台环境(environment)
cd environment
start/min cmd /c "RunBack.bat"


::启动项目（vue脚手架执行run dev后会自动打开浏览器）
cd ..
npm run dev

:: 说明：
:: 参数 - “/k” 将参数k换成c则新窗口运行结束后自动关闭（/k则保留）
:: 命令 - “start/min” 窗口最小化运行