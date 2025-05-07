# KXP网站临时部署指南

## 方法一：使用Node.js的http-server（推荐）

### 准备工作
1. 确保您的电脑已安装Node.js（如未安装，请从[Node.js官网](https://nodejs.org/)下载并安装）
2. 打开命令提示符或PowerShell

### 部署步骤
1. 全局安装http-server包：
```
npm install -g http-server
```

2. 导航到网站文件所在目录：
```
cd 路径/到/KXP-V1目录
```

3. 启动服务器：
```
http-server -p 8080
```

4. 访问网站：
   - 本地访问：在浏览器中打开 http://localhost:8080
   - 局域网内其他设备访问：在浏览器中打开 http://[您的IP地址]:8080
     （可以通过在命令提示符中运行`ipconfig`命令查看您的IP地址）

5. 关闭服务器：按下Ctrl+C

## 方法二：使用Python的简易HTTP服务器

如果您的电脑安装了Python，也可以使用Python内置的HTTP服务器。

### Python 3.x
```
python -m http.server 8000
```

### Python 2.x
```
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问: http://localhost:8000

## 方法三：使用在线服务

如果需要让互联网上的人访问，可以考虑以下服务：

1. **GitHub Pages**：
   - 创建GitHub仓库并上传网站文件
   - 在仓库设置中启用GitHub Pages

2. **Netlify**：
   - 创建账号并拖拽上传网站文件夹
   - 自动部署并提供可访问链接

3. **Vercel**：
   - 创建账号并关联代码仓库
   - 自动部署并提供可访问链接

## 方法四：使用VS Code的Live Server插件

如果您使用VS Code编辑器：

1. 安装"Live Server"插件
2. 右键点击index.html文件
3. 选择"Open with Live Server"
4. 浏览器会自动打开本地服务地址 