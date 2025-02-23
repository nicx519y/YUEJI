/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: {
      allowedOrigins: ['suixinyue.cn'],
      bodySizeLimit: '2mb'
    }
  },
  images: {
    domains: ['suixinyue.cn'],
    deviceSizes: [256, 384, 512, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type' }
        ]
      }
    ]
  }
}

export default config
