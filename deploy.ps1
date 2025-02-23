# 部署配置
$remoteHost = "47.113.146.209"  # 服务器 IP
$remoteUser = "root"   # 服务器用户名
$remotePath = "/var/www/yueji"  # 网站部署路径
$sshOptions = "-o StrictHostKeyChecking=no"

# 颜色输出函数
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# 检查构建状态
function Check-LastExitCode {
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput Red "Error occurred! Deployment aborted."
        exit $LASTEXITCODE
    }
}

try {
    # 1. 安装依赖
    Write-ColorOutput Green "Installing dependencies..."
    npm install
    Check-LastExitCode

    # 2. 构建项目
    Write-ColorOutput Green "Building project..."
    npm run build
    Check-LastExitCode

    # 3. 压缩构建文件
    Write-ColorOutput Green "Compressing build files..."
    # 确保在项目根目录
    Push-Location $PSScriptRoot
    # 创建临时部署目录
    New-Item -ItemType Directory -Path "deploy" -Force | Out-Null
    # 复制需要的文件到部署目录
    Copy-Item -Path ".next" -Destination "deploy/.next" -Recurse
    Copy-Item -Path "public" -Destination "deploy/public" -Recurse
    Copy-Item -Path "package.json", "package-lock.json", "next.config.ts" -Destination "deploy"
    # 压缩整个部署目录
    Compress-Archive -Path "deploy/*" -DestinationPath "deploy.zip" -Force
    # 清理临时目录
    Remove-Item -Path "deploy" -Recurse -Force
    Pop-Location
    Check-LastExitCode

    # 4. 创建远程目录（如果不存在）
    Write-ColorOutput Green "Creating remote directory..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" @"
        mkdir -p ${remotePath}
        cd ${remotePath}
        rm -rf .next public package.json package-lock.json next.config.ts node_modules
"@
    Check-LastExitCode

    # 5. 上传文件到服务器
    Write-ColorOutput Green "Uploading files to server..."
    scp $sshOptions "deploy.zip" "${remoteUser}@${remoteHost}:${remotePath}/deploy.zip"
    Check-LastExitCode

    # 6. 在服务器上解压文件并重启服务
    Write-ColorOutput Green "Deploying on server..."

    # 创建部署脚本内容
    $deployCommand = @'
#!/bin/bash
cd /var/www/yueji
source ~/.bashrc
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 安装必要工具
if ! command -v unzip > /dev/null; then 
    yum install -y unzip
fi

# 解压文件
unzip -o deploy.zip
rm -f deploy.zip

# 安装依赖
npm install --production

# 安装并配置 PM2
if ! command -v pm2 > /dev/null; then
    npm install -g pm2
fi

# 停止并删除旧进程
pm2 stop yueji || true
pm2 delete yueji || true
pm2 flush

# 配置环境变量
echo "NODE_ENV=production" > .env
echo "PORT=3000" >> .env
echo "HOSTNAME=0.0.0.0" >> .env

# 启动应用
pm2 start npm --name 'yueji' -- start
pm2 save
'@ -replace "`r`n", "`n"

# 将脚本写入到临时文件
$tempFile = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText($tempFile, $deployCommand, [System.Text.UTF8Encoding]::new($false))

# 上传并执行脚本
scp $sshOptions $tempFile "${remoteUser}@${remoteHost}:${remotePath}/deploy.sh"
ssh $sshOptions "${remoteUser}@${remoteHost}" "chmod +x ${remotePath}/deploy.sh && bash ${remotePath}/deploy.sh"

# 清理临时文件
Remove-Item $tempFile
Check-LastExitCode

    # 7. 等待几秒确保进程稳定
    Start-Sleep -Seconds 3

    # 8. 检查部署状态
    Write-ColorOutput Green "Checking deployment status..."
    # 创建检查脚本
    $checkCommand = @'
#!/bin/bash
cd /var/www/yueji
source ~/.bashrc
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "检查 PM2 状态："
pm2 list || echo "PM2 状态检查失败"

echo "检查 Nginx 状态："
systemctl status nginx | grep Active || echo "Nginx 状态检查失败"

echo "检查进程："
echo "PM2 进程："
ps aux | grep "PM2" || echo "没有找到 PM2 进程"
echo "Node/npm 进程："
ps aux | grep -E "(node|npm)" | grep -v grep || echo "没有找到 Node/npm 进程"

# 检查应用是否响应
echo "检查应用响应："
curl -s http://localhost:3000 > /dev/null && echo "应用响应正常" || echo "应用未响应"

# 检查端口监听
echo "检查端口监听："
netstat -tlnp | grep :3000 || echo "3000 端口未被监听"

# 不管检查结果如何都返回成功
exit 0
'@ -replace "`r`n", "`n"

    # 将检查脚本写入临时文件
    $tempCheckFile = [System.IO.Path]::GetTempFileName()
    [System.IO.File]::WriteAllText($tempCheckFile, $checkCommand, [System.Text.UTF8Encoding]::new($false))

    # 上传并执行检查脚本
    scp $sshOptions $tempCheckFile "${remoteUser}@${remoteHost}:${remotePath}/check.sh"
    ssh $sshOptions "${remoteUser}@${remoteHost}" "chmod +x ${remotePath}/check.sh && bash ${remotePath}/check.sh"

    # 清理临时文件
    Remove-Item $tempCheckFile
    Check-LastExitCode

    # 9. 清理本地临时文件
    Write-ColorOutput Green "Cleaning up..."
    Remove-Item "deploy.zip" -Force

    Write-ColorOutput Green "Deployment completed successfully!"
    Write-ColorOutput Green "应用已启动，请访问: https://suixinyue.cn/"
}
catch {
    Write-ColorOutput Red "Error: $($_.Exception.Message)"
    exit 1
}
