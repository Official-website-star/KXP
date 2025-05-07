#!/bin/bash

echo "KXP网站临时服务器启动工具"
echo "==========================="
echo

# 检查是否安装了http-server
if ! command -v http-server &> /dev/null; then
  echo "正在安装http-server..."
  npm install -g http-server
  
  if [ $? -ne 0 ]; then
    echo "安装http-server失败，请确保您已安装Node.js"
    echo "您可以访问 https://nodejs.org/ 下载并安装"
    read -p "按回车键退出..."
    exit 1
  fi
fi

echo "正在启动服务器，请稍候..."
echo
echo "服务器启动后，请在浏览器中访问以下地址："
echo "本地访问: http://localhost:8080"
echo
echo "如需在局域网内共享，请使用以下地址："

# 获取本机IP地址
ip=$(ifconfig 2>/dev/null | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1)
if [ -z "$ip" ]; then
  # 尝试使用hostname命令获取IP（适用于某些Linux发行版）
  ip=$(hostname -I 2>/dev/null | awk '{print $1}')
fi

if [ -n "$ip" ]; then
  echo "局域网访问: http://$ip:8080"
else
  echo "无法获取局域网IP地址"
fi

echo
echo "按Ctrl+C可停止服务器"
echo "==========================="
echo

http-server -p 8080 