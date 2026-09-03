'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import Image from 'next/image'
import GoogleAds from './GoogleAds'

// Root non-kanal: route 3-segmen lain (/foto/id/slug dll) yang BUKAN detail berita.
const NON_KANAL_ROOTS = new Set(['foto', 'fokus', 'ekoran', 'kanal', 'writer', 'editor', 'search', 'page', 'tag', 'read', 'amp', 's', 'i', 'maintenance'])

// Tampil di homepage + detail berita (/{kanal}/{id}/{slug}, id numerik).
function isAdRoute(pathname) {
    const segs = pathname.split('/').filter(Boolean)
    if (segs.length === 0) return true // homepage
    return segs.length === 3 && /^\d+$/.test(segs[1]) && !NON_KANAL_ROOTS.has(segs[0]) // detail berita
}

// Isi iklan mengikuti top banner tiap halaman:
// - home            -> iklan premium eksternal (id 43)
// - detail kopi-times -> gambar Kopi Times
// - detail lainnya  -> AdSense inline_rectangle slot 9639204649 (sama dgn top banner detail)
function AdContent({ pathname, premiumAd }) {
    const segs = pathname.split('/').filter(Boolean)
    if (segs.length === 0) {
        return <GoogleAds size='half_page_ad' type='mobile' adsEksternal={premiumAd} slot='6015577100' priority />
    }
    if (segs[0] === 'kopi-times') {
        return (
            <a
                href="https://kopi.times.co.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
                style={{ width: 336, height: 280 }}
            >
                <Image
                    src="https://cdn2.timesmedia.co.id/cdn-times/uploads/advertisement/2026/06/05/iklan-kopi-times-nv996oli.webp"
                    alt="Advertisement"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-contain"
                />
            </a>
        )
    }
    return <GoogleAds size='half_page_ad' slot='6015577100' />
}

// Interstitial ala Kompas mobile (homepage + detail berita):
// Iklan DI-PIN (fixed) di paling atas dan DIAM. Navbar (z-80) + konten (z-20)
// merangkak naik menutupi iklan saat di-scroll, lalu navbar menempel di atas.
// Spacer mendorong navbar & konten mulai di bawah iklan. md:hidden -> desktop tak terpengaruh.
function MobileWelcomeAd({ premiumAd }) {
    const pathname = usePathname()
    const [open, setOpen] = useState(() => isAdRoute(pathname))
    const seenRef = useRef(new Set([pathname])) // path yang sudah dilihat (awal dianggap sudah)
    const lastPathRef = useRef(pathname)         // guard render-ganda strict-mode

    // Tampil di halaman iklan yang BELUM pernah dilihat (mis. klik "Baca juga" ke artikel baru).
    // Back/forward ke halaman yang sudah dilihat -> tak tampil (deterministik, tanpa race popstate).
    useEffect(() => {
        if (lastPathRef.current === pathname) return // render-ganda strict-mode / bukan navigasi
        lastPathRef.current = pathname
        if (!isAdRoute(pathname)) { setOpen(false); return }
        if (seenRef.current.has(pathname)) { setOpen(false); return } // sudah dilihat (mis. back)
        seenRef.current.add(pathname)
        setOpen(true)
        // Next App Router scroll ke konten (judul), melewati welcome ad. Paksa ke atas
        // supaya iklannya terlihat. rAF agar menang setelah scroll internal Next.
        requestAnimationFrame(() => window.scrollTo(0, 0))
    }, [pathname])

    if (!isAdRoute(pathname) || !open) return null

    return (
        <>
            <div className="md:hidden fixed inset-x-0 top-0 z-[10] flex h-[calc(100svh-8rem)] flex-col bg-base-100 px-4 pt-3">
                <div className="flex items-center justify-between pb-3">
                    <span className="text-xs font-semibold text-base-content/70">
                        Iklan — Scroll ke bawah untuk melanjutkan
                    </span>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Tutup iklan"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex flex-1 items-start justify-center">
                    {/* key={pathname}: remount tiap ganti halaman supaya iklan (AdSense/gambar) benar-benar refresh */}
                    <AdContent key={pathname} pathname={pathname} premiumAd={premiumAd} />
                </div>
            </div>
            {/* Spacer: menyediakan ruang alur setinggi iklan supaya navbar & konten mulai di bawahnya */}
            <div className="md:hidden h-[calc(100svh-8rem)]" aria-hidden="true" />
        </>
    )
}

export default MobileWelcomeAd
