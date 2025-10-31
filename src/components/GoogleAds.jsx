"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function GoogleAds({
    size = "inline_rectangle",
    className = "",
    adsEksternal = null,
    slot = '8134946479',

}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!adsEksternal) {
            try {
                if (typeof window !== "undefined") {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("Adsense error", e);
            }
        }
    }, [adsEksternal]);

    const adSizes = {
        inline_rectangle: { width: "336px", height: "280px" },
        netboard: { width: "580px", height: "400px" },
        square: { width: "250px", height: "250px" },
        top_banner: { width: "970px", height: "250px" },
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
            <div className="relative indicator">

                <button
                    onClick={() => setIsVisible(false)}
                    className="indicator-item btn btn-xs btn-active btn-circle bg-[#b41d1d] text-white hover:bg-[#7b0f1f]"
                >
                    <X size={16} />
                    <span className="sr-only">Tutup</span>
                </button>

                {adsEksternal ? (
                    <a
                        href={`//ads-track.times.co.id/click/${btoa(adsEksternal.unique_id)}/${btoa(5)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                    >
                        <Image
                            src={adsEksternal.d_img}
                            alt="Advertisement"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-contain"
                            priority={false}
                        />
                    </a>
                ) : (
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: "inline-block",
                            width: currentSize.width,
                            height: currentSize.height,
                        }}
                        data-ad-client="ca-pub-5117046027656864"
                        data-ad-slot={slot}
                    ></ins>
                )}
            </div>
        </div>
    );
}
