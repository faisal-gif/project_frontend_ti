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
            {
                protocol: "https",
                hostname: "cdn-1.tin.co.id",
                port: "", // optional
                pathname: "/**", // allow semua path
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "", // optional
                pathname: "/**", // allow semua path
            },
            {
                protocol: "https",
                hostname: "cdn.timesmedia.co.id",
                port: "", // optional
                pathname: "/**", // allow semua path
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "", // optional
                pathname: "/**", // allow semua path
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "", // optional
                pathname: "/**", // allow semua path
            },
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60 * 60 * 24 * 30,  // cache di server 60 detik
    },
    experimental: {
        optimizeCss: true,
        cssChunking: true, 
    },
};

export default nextConfig;
