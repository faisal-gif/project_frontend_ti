"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";

export default function GoogleAds({
    size = "inline_rectangle",
    adsEksternal = null,
    slot = '8134946479',
    type = 'desktop',

}) {

    useEffect(() => {
        if (!adsEksternal && typeof window !== "undefined") {
            const adTimeout = setTimeout(() => {
                try {
                    // Cari element <ins> milik komponen ini saja
                    // Kita gunakan ad-status sebagai penanda agar tidak double push
                    const adsbygoogle = window.adsbygoogle || [];
                    adsbygoogle.push({});
                } catch (e) {
                    // Abaikan error "All ins elements already have ads"
                    if (!e.message.includes("already have ads")) {
                        console.error("Adsense error", e);
                    }
                }
            }, 100); // Beri sedikit delay agar DOM benar-benar siap

            return () => clearTimeout(adTimeout);
        }
    }, [adsEksternal, slot]);

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


    return (
        <div>

            {adsEksternal ? (
                <div
                    className="relative"
                    style={{
                        width: currentSize.width,
                        height: currentSize.height,
                    }}
                >
                    <a
                        href={`//ads-track.times.co.id/click/${btoa(adsEksternal.unique_id)}/${btoa(5)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                    >

                        {type === 'mobile' ? (
                            <Image
                                src={adsEksternal.m_img}
                                alt="Advertisement"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-contain"
                                priority={false}
                            />
                        ) : (
                            <Image
                                src={adsEksternal.d_img}
                                alt="Advertisement"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-contain"
                                priority={false}
                            />
                        )
                        }
                    </a>
                </div>
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
    );
}
