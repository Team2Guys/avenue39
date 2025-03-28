/** @type {import('next').NextConfig} */
const nextConfig = {
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
  compiler:{    removeConsole: process.env.NODE_ENV === 'production'  ? true : false },
  experimental: {
    optimizePackageImports: ['react-icons/*', "antd"],
  },
};

export default nextConfig;
