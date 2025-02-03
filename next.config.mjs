/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'furniturezone.pk',
      'example.com',
      'res.cloudinary.com',
      'unsplash.com',
    ],
    unoptimized: true,
  },
};

export default nextConfig;
