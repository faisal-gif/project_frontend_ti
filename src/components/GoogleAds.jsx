"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

export default function GoogleAds({
    size = "inline_rectangle",
    className = "",
}) {
    const [isVisible, setIsVisible] = useState(true);

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

    if (!isVisible) return null; // kalau di-close, iklan hilang

    return (
        <div
            className={`relative bg-gray-100 border border-gray-200 rounded-[3px] flex items-center justify-center ${className}`}
            style={{
                width: currentSize.width,
                height: currentSize.height,
                maxWidth: "100%",
            }}
        >
            {/* Tombol close */}
            {
                size === "skyscraper"  && (
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-1 right-1 text-gray-600 hover:text-red-500"
                    >
                        <X size={16} />
                    </button>
                )
            }


            <div className="text-center text-black px-2">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs capitalize opacity-100">{size}</div>
                <div className="text-xs opacity-100">
                    {currentSize.width} x {currentSize.height}
                </div>
                {/* Google AdSense code bisa ditempatkan di sini */}
                {/* <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"></ins> */}
            </div>
        </div>
    );
}
