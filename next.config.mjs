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
            
        ],
        minimumCacheTTL: 60, // cache di server 60 detik
    },
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;
