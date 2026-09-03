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
};

module.exports = nextConfig;
