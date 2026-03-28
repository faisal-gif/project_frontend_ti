"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function GoogleAds({
    size = "inline_rectangle",
    adsEksternal = null,
    customSlot = null, // Diubah namanya agar tidak bentrok, bisa dipakai jika ingin override
    type = 'desktop',
}) {
    // 1. Tambahkan slotId ke dalam masing-masing konfigurasi ukuran
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

    // 2. Dapatkan konfigurasi berdasarkan size (fallback ke inline_rectangle jika tidak ditemukan)
    const currentConfig = adConfigs[size] || adConfigs.inline_rectangle;

    // 3. Tentukan slot final: gunakan customSlot jika ada, jika tidak gunakan dari adConfigs
    const activeSlot = customSlot || currentConfig.slotId;

    useEffect(() => {
        if (!adsEksternal && typeof window !== "undefined") {
            const adTimeout = setTimeout(() => {
                try {
                    // PERBAIKAN DI SINI:
                    // Pastikan push dilakukan langsung ke object window secara global
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    if (!e.message.includes("already have ads")) {
                        console.error("Adsense error", e);
                    }
                }
            }, 100);

            return () => clearTimeout(adTimeout);
        }
    }, [adsEksternal, activeSlot]);

    return (
        <div>
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
                    data-ad-slot={activeSlot} // 4. Gunakan activeSlot di sini
                ></ins>
            )}
        </div>
    );
}