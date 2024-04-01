/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.irys.xyz",
      },
    ],
  },
};

export default nextConfig;
