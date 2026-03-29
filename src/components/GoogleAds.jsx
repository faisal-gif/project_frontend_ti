"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function GoogleAds({
    size = "inline_rectangle",
    adsEksternal = null,
    customSlot = null,
    type = 'desktop',
}) {
    const adRef = useRef(null);
    const adPushed = useRef(false);
    const [isVisible, setIsVisible] = useState(false);

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
        if (!adRef.current || adsEksternal) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(adRef.current);

        return () => observer.disconnect();
    }, [adsEksternal]);

    useEffect(() => {
        if (isVisible && !adsEksternal && typeof window !== "undefined" && !adPushed.current) {
            adPushed.current = true;
            
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                if (!e.message.includes("already have ads")) {
                    console.error("Adsense error", e);
                }
            }
        }
    }, [isVisible, adsEksternal, activeSlot]);

    return (
        <div className="flex justify-center w-full my-4">
            {/* Container utama dengan relative positioning */}
            <div 
                ref={adRef} 
                className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                style={{ 
                    width: currentConfig.width, 
                    height: currentConfig.height,
                    minWidth: currentConfig.width,
                    minHeight: currentConfig.height
                }} 
            >
                {/* SKELETON LOADER (Placeholder)
                  Posisi absolute agar berada di dasar (background).
                  Menggunakan animate-pulse untuk efek loading berkedip halus.
                */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 animate-pulse pointer-events-none">
                    <svg className="w-6 h-6 mb-2 text-gray-300 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest font-medium">Advertisement</span>
                </div>

                {/* KONTEN IKLAN
                  Posisi relative dengan z-10 agar berada di atas placeholder.
                */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {adsEksternal ? (
                        <a
                            href={`//ads-track.times.co.id/click/${btoa(adsEksternal.unique_id)}/${btoa(5)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                        >
                            <Image
                                src={type === 'mobile' ? adsEksternal.m_img : adsEksternal.d_img}
                                alt="Advertisement"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-contain"
                                priority={false}
                            />
                        </a>
                    ) : (
                        isVisible && (
                            <ins
                                className="adsbygoogle"
                                style={{
                                    display: "block",
                                    width: currentConfig.width,
                                    height: currentConfig.height,
                                }}
                                data-ad-client="ca-pub-2259519132704244"
                                data-ad-slot={activeSlot}
                            ></ins>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}