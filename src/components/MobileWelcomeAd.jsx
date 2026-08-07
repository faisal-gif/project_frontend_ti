'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

// Interstitial ala Kompas mobile: iklan setinggi ~1 layar di paling atas.
// Tombol X membuang blok ini sehingga konten di bawahnya naik ke atas.
// md:hidden -> desktop tidak terpengaruh.
function MobileWelcomeAd({ children }) {
    const [open, setOpen] = useState(true)
    if (!open) return null

    return (
        <section className="md:hidden relative z-[90] -mt-12 flex min-h-[100svh] flex-col bg-base-100 px-4 pt-3">
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
                {children}
            </div>
        </section>
    )
}

export default MobileWelcomeAd
