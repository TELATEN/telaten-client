/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
