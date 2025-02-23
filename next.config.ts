/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['suixinyue.cn'],
      bodySizeLimit: '2mb'
    }
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://suixinyue.cn' : undefined,
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
