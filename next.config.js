/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://telaten-dev.arosyihuddin.my.id/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
