/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    qualities: [40, 50, 55, 60, 65, 70, 80, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "cdn-1.timesmedia.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn-1.tin.co.id", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "cdn.timesmedia.co.id", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // cache image di server Next selama 30 hari
  },

  experimental: {
    optimizeCss: true,
    cssChunking: true,
  },

  // 🚀 Tambahkan bagian ini
  async headers() {
    return [
      {
        // Semua file hasil build Next.js (/_next/static)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Semua file di folder /public (gambar, font, ikon, dll)
        source: "/(.*\\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
