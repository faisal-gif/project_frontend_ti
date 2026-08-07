'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

// Interstitial ala Kompas mobile: iklan di paling atas, DI ATAS navbar.
// Navbar (sticky) duduk tepat di bawahnya dan tetap terlihat, lalu menempel saat scroll.
// Digate ke homepage ('/') saja meski dideklarasikan di layout. md:hidden -> desktop tak terpengaruh.
function MobileWelcomeAd({ children }) {
    const pathname = usePathname()
    const [open, setOpen] = useState(true)
    if (pathname !== '/' || !open) return null

    return (
        <section className="md:hidden relative flex flex-col min-h-[calc(100svh-8rem)] bg-base-100 px-4 pt-3">
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
