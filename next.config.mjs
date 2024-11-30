/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google profile images
      'res.cloudinary.com', // For Cloudinary images
    ],
  },
};

export default nextConfig;