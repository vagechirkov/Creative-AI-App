/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lexica-serve-encoded-images**',
        port: '',
        pathname: '**/**',
      },
    ],
  },
}

module.exports = nextConfig
