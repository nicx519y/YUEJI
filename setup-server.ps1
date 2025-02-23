# 服务器配置
$remoteHost = "47.113.146.209"
$remoteUser = "root"
$domain = "suixinyue.cn"
$sshOptions = "-o StrictHostKeyChecking=no"

# 首先检查系统类型
Write-Host "检查服务器系统类型..."
$osType = ssh $sshOptions "${remoteUser}@${remoteHost}" "cat /etc/os-release"
Write-Host "系统信息: $osType"

# Nginx 配置
$nginxConfig = @'
# 反向代理配置
server {
    listen 80;
    listen [::]:80;
    server_name suixinyue.cn;
    
    # 将 HTTP 重定向到 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name suixinyue.cn;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/suixinyue.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/suixinyue.cn/privkey.pem;

    # SSL 参数
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # 现代 SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # 安全headers
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # 根目录
    root /var/www/yueji/public;

    # 日志配置
    access_log /var/log/nginx/yueji.access.log;
    error_log /var/log/nginx/yueji.error.log;

    # 静态文件缓存
    location /_next/static {
        alias /var/www/yueji/.next/static;
        expires 365d;
        access_log off;
    }

    location /static {
        expires 365d;
        access_log off;
    }

    # 反向代理到 Next.js 应用
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 禁止访问 . 文件
    location ~ /\. {
        deny all;
    }
}
'@

# 将 Windows 换行符转换为 Unix 换行符
$nginxConfig = $nginxConfig -replace "`r`n", "`n"

# 创建 Shell 脚本内容
$setupCommand = @"
#!/bin/bash
set -e

echo "开始配置阿里云服务器..."

# 1. 更新系统包
yum -y update

# 2. 安装 Nginx 和 Certbot
yum -y install nginx certbot python3-certbot-nginx python3-certbot cronie

# 3. 创建必要的目录
mkdir -p /var/www/yueji/public
mkdir -p /etc/nginx/conf.d

# 4. 配置基本的 Nginx
echo "配置 Nginx..."
cat > /etc/nginx/conf.d/yueji.conf << 'EOF'
server {
    listen 80;
    server_name suixinyue.cn;
    
    location /.well-known/acme-challenge/ {
        root /var/www/yueji/public;
    }

    location / {
        return 200 "Site setup in progress...";
    }
}
EOF

# 5. 启动 Nginx
echo "启动 Nginx..."
systemctl restart nginx

# 6. 申请 SSL 证书
echo "申请 SSL 证书..."
certbot --nginx -d suixinyue.cn --non-interactive --agree-tos --email admin@suixinyue.cn

# 7. 应用完整配置
echo "应用完整配置..."
cat > /etc/nginx/conf.d/yueji.conf << 'EOF'
$($nginxConfig)
EOF

# 8. 重启 Nginx 并启用自动续期
echo "重启 Nginx..."
if ! systemctl restart nginx; then
    echo "Nginx 启动失败，错误信息："
    systemctl status nginx
    journalctl -xe --no-pager | tail -n 50
    nginx -t
    echo "当前配置文件内容："
    cat /etc/nginx/conf.d/yueji.conf
    exit 1
fi

# 配置证书自动续期
echo "配置证书自动续期..."
# 确保 crond 服务运行
systemctl enable crond
systemctl start crond

# 创建定时任务
echo "0 0,12 * * * root python3 -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | tee -a /etc/crontab > /dev/null

# 测试续期
echo "测试证书续期..."
certbot renew --dry-run

# 9. 显示状态
echo "====== 配置完成 ======"
systemctl status nginx
"@

Write-Host "正在配置服务器..."

# 将命令保存到临时文件
$tempFile = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText(
    $tempFile,
    $setupCommand.Replace("`r`n", "`n"),
    [System.Text.UTF8Encoding]::new($false)
)

try {
    # 上传并执行脚本
    Write-Host "上传配置脚本..."
    scp $sshOptions $tempFile "${remoteUser}@${remoteHost}:/tmp/setup.sh"
    
    Write-Host "执行配置脚本..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" "chmod +x /tmp/setup.sh && bash /tmp/setup.sh && rm /tmp/setup.sh"
}
finally {
    # 清理临时文件
    Remove-Item -Force $tempFile
}

Write-Host "服务器配置完成！" 