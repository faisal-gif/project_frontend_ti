/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-1.timesmedia.co.id",
        port: "", // optional
        pathname: "/**", // allow semua path
      },
    ],
     minimumCacheTTL: 60, // cache di server 60 detik
  },
};

export default nextConfig;
