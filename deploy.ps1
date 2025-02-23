# 部署配置
$remoteHost = "47.113.146.209"  # 服务器 IP
$remoteUser = "root"   # 服务器用户名
$remotePath = "/var/www/yueji"  # 网站部署路径

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
    ssh "${remoteUser}@${remoteHost}" @"
        mkdir -p ${remotePath}
        cd ${remotePath}
        rm -rf .next public package.json package-lock.json next.config.ts node_modules
"@
    Check-LastExitCode

    # 5. 上传文件到服务器
    Write-ColorOutput Green "Uploading files to server..."
    scp "deploy.zip" "${remoteUser}@${remoteHost}:${remotePath}/deploy.zip"
    Check-LastExitCode

    # 6. 在服务器上解压文件并重启服务
    Write-ColorOutput Green "Deploying on server..."
    $deployCommand = "cd ${remotePath} && " + 
        "if ! command -v unzip > /dev/null; then apt-get update && apt-get install -y unzip; fi && " +
        "unzip -o deploy.zip && " +
        "rm -f deploy.zip && " +
        "npm install --production && " +
        "if ! command -v pm2 > /dev/null; then npm install -g pm2; fi && " +
        "pm2 stop all > /dev/null 2>&1 || true && " +
        "pm2 delete all > /dev/null 2>&1 || true && " +
        "pm2 flush && " +
        "echo 'NODE_ENV=production' > .env && " +
        "echo 'PORT=3000' >> .env && " +
        "echo 'HOSTNAME=0.0.0.0' >> .env && " +
        "pm2 start npm --name 'yueji' --instances 1 -e .env -- start && " +
        "pm2 save"

    ssh "${remoteUser}@${remoteHost}" $deployCommand
    Check-LastExitCode

    # 7. 等待几秒确保进程稳定
    Start-Sleep -Seconds 3

    # 8. 检查部署状态
    Write-ColorOutput Green "Checking deployment status..."
    ssh "${remoteUser}@${remoteHost}" @"
        echo '检查 PM2 状态：'
        pm2 list
        
        echo '检查端口监听情况：'
        netstat -tlnp | grep 3000
        
        echo '检查防火墙状态：'
        ufw status
        
        echo '检查应用日志：'
        pm2 logs yueji --lines 10
"@
    Check-LastExitCode

    # 9. 清理本地临时文件
    Write-ColorOutput Green "Cleaning up..."
    Remove-Item "deploy.zip" -Force

    Write-ColorOutput Green "Deployment completed successfully!"
}
catch {
    Write-ColorOutput Red "Error: $($_.Exception.Message)"
    exit 1
}
