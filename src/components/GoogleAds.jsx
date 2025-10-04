"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function GoogleAds({
    size = "inline_rectangle",
    className = "",
}) {
    const [isVisible, setIsVisible] = useState(true);

    // useEffect(() => {
    //     try {
    //         if (typeof window !== "undefined") {
    //             (window.adsbygoogle = window.adsbygoogle || []).push({});
    //         }
    //     } catch (e) {
    //         console.error("Adsense error", e);
    //     }
    // }, []);

    const adSizes = {
        inline_rectangle: { width: "300px", height: "250px" },
        square: { width: "250px", height: "250px" },
        top_banner: { width: "930px", height: "180px" },
        banner: { width: "468px", height: "60px" },
        leaderboard: { width: "728px", height: "90px" },
        skyscraper: { width: "120px", height: "600px" },
        wide_skyscraper: { width: "160px", height: "600px" },
        half_page_ad: { width: "300px", height: "600px" },
    };

    const currentSize = adSizes[size];

    if (!isVisible) return null;

    return (
        <div
            className={`relative bg-gray-100 border border-gray-200 rounded-[3px] flex items-center justify-center ${className}`}
            style={{
                width: currentSize.width,
                height: currentSize.height,
                maxWidth: "100%",
            }}
        >
         
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-1 right-1 text-gray-600 hover:text-red-500"
                >
                    <X size={16} />
                    <span className="sr-only">Tutup</span>
                </button>
         
            <ins
                className="adsbygoogle"
                style={{
                    display: "inline-block",
                    width: currentSize.width,
                    height: currentSize.height,
                }}
                data-ad-client="ca-pub-5117046027656864"
                data-ad-slot="8134946479"
            ></ins>
        </div>
    );
}
