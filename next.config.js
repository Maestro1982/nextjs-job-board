/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zves5rrcj645vr1p.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
