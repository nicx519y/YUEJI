# SSH 配置
$remoteHost = "47.113.146.209"
$remoteUser = "root"

# 检查是否已经存在 SSH 密钥
if (-not (Test-Path "~/.ssh/id_rsa")) {
    Write-Host "生成 SSH 密钥..."
    ssh-keygen -t rsa -b 4096 -f "$HOME/.ssh/id_rsa" -N '""'
}

# 上传公钥到服务器
Write-Host "上传 SSH 公钥到服务器..."
$pubKey = Get-Content "~/.ssh/id_rsa.pub"
ssh "${remoteUser}@${remoteHost}" "mkdir -p ~/.ssh && echo '$pubKey' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

Write-Host "SSH 密钥设置完成！后续部署将不需要输入密码。" 