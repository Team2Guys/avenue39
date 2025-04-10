/** @type {import('next').NextConfig} */
import fs from 'fs';
import path from 'path';

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
  webpack(config, { isServer }) {
    // Skip on server-side to avoid duplicate processing
    if (!isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync('CheckUnusedFiles', (compilation, callback) => {
            const usedModules = Array.from(compilation.fileDependencies).filter((file) =>
              file.includes('public/')
            );
            const publicDir = path.join(process.cwd(), 'public');

            // Recursively get all files in public directory
            const getAllFiles = (dir) => {
              let results = [];
              fs.readdirSync(dir).forEach((file) => {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                  results = results.concat(getAllFiles(fullPath));
                } else {
                  results.push(fullPath);
                }
              });
              return results;
            };

            const allFiles = getAllFiles(publicDir);
            const unusedFiles = allFiles.filter(
              (file) => !usedModules.some((used) => used.includes(file))
            );

            if (unusedFiles.length > 0) {
              console.log('Unused files in public directory:');
              unusedFiles.forEach((file) => console.log(file));
            } else {
              console.log('No unused files found in public directory.');
            }

            callback();
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;