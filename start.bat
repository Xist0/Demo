@echo off
start cmd.exe /k "cd /d %~dp0\client-demo & npm i && npm run dev"
start cmd.exe /k "cd /d %~dp0\server-demo & npm i && npm run dev"
