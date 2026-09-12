/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Limit build workers to 1 to share single connection pool and avoid Hostinger MySQL 500 conn/hour quota
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/packages/compare',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/packages/:slug/compare',
        destination: '/packages',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
