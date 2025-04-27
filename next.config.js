/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 配置图片优化
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 支持外部图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 实验性功能配置
  experimental: {
    // 优化特定依赖包的导入
    optimizePackageImports: ["date-fns", "react-icons"],
    // 为更好的用户体验启用视图转换
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig; 