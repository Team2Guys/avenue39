/** @type {import('next').NextConfig} */
// import bundleAnalyzer from '@next/bundle-analyzer';

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true', 
// });
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'www.facebook.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'http://',
          },
        ],
        destination: 'https://',
        permanent: true,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false
  },
  experimental: {
    optimizePackageImports: ['react-icons/*', "antd"],
  },
 
};

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;