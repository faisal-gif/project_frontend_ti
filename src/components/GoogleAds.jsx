"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function GoogleAds({
    size = "inline_rectangle",
    adsEksternal = null,
    customSlot = null,
    type = 'desktop',
}) {
    // Gunakan useRef untuk melacak apakah iklan ini sudah di-push ke antrean Adsense
    const adPushed = useRef(false);

    const adConfigs = {
        inline_rectangle: { width: "336px", height: "280px", slotId: "5922452344" },
        rectangle: { width: "336px", height: "400px", slotId: "3831475624" },
        netboard: { width: "580px", height: "400px", slotId: "3831475624" },
        square: { width: "250px", height: "250px", slotId: "3831475624" },
        top_banner: { width: "970px", height: "250px", slotId: "7886270703" },
        banner: { width: "468px", height: "60px", slotId: "3831475624" },
        leaderboard: { width: "728px", height: "90px", slotId: "3831475624" },
        skyscraper: { width: "120px", height: "600px", slotId: "3831475624" },
        wide_skyscraper: { width: "160px", height: "600px", slotId: "3831475624" },
        half_page_ad: { width: "300px", height: "600px", slotId: "3831475624" },
    };

    const currentConfig = adConfigs[size] || adConfigs.inline_rectangle;
    const activeSlot = customSlot || currentConfig.slotId;

    useEffect(() => {
        // Cek apakah bukan iklan eksternal, window tersedia, DAN belum pernah di-push
        if (!adsEksternal && typeof window !== "undefined" && !adPushed.current) {
            adPushed.current = true; // Langsung tandai sudah di-push
            
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                if (!e.message.includes("already have ads")) {
                    console.error("Adsense error", e);
                }
            }
        }
    }, [adsEksternal, activeSlot]); 

    return (
        <div className="ad-container relative flex justify-center w-full my-4">
            {adsEksternal ? (
                <div
                    className="relative"
                    style={{
                        width: currentConfig.width,
                        height: currentConfig.height,
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
                        )}
                    </a>
                </div>
            ) : (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "inline-block",
                        width: currentConfig.width,
                        height: currentConfig.height,
                    }}
                    data-ad-client="ca-pub-2259519132704244"
                    data-ad-slot={activeSlot}
                ></ins>
            )}
        </div>
    );
}