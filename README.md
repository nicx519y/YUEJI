This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 悦己经络瑜伽

## 部署说明

### 环境要求

- Node.js 18+
- PowerShell
- SSH 客户端
- 已配置的域名（指向服务器IP）

### 首次部署

1. 设置 SSH 密钥：
```powershell
.\setup-ssh.ps1
```

2. 配置服务器环境（包含 Nginx 和 SSL）：
```powershell
.\setup-server.ps1
```

3. 部署应用：
```powershell
.\deploy.ps1
```

### 后续更新

只需要运行：
```powershell
.\deploy.ps1
```

### 部署验证

- 访问 https://suixinyue.cn/ 确认网站是否正常运行
- 检查 HTTPS 证书是否正确配置
- 验证静态资源是否正确加载

### 技术栈

- Next.js
- Tailwind CSS
- Chakra UI
- PM2 (进程管理)
- Nginx (反向代理)
- Let's Encrypt SSL

### 目录结构

- `/src` - 源代码
- `/public` - 静态资源
- `/scripts` - 部署脚本
- `/.next` - 构建输出
