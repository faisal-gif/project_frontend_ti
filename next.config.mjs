/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [40, 50, 55, 60, 65, 70, 80, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "cdn2.timesmedia.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn-1.timesmedia.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn.inatimes.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn-1.tin.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn-1.times.co.id", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "cdn.timesmedia.co.id", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "kopi.times.co.id", pathname: "/**" },

    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // cache image di server Next selama 30 hari
  },

  experimental: {
    optimizeCss: true,
    cssChunking: true,
    optimizePackageImports: ['react-icons'],
  },

};

export default nextConfig;
