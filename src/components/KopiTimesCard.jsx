import Link from 'next/link'
import React from 'react'
import { PenLine, ArrowUpRight, Quote } from 'lucide-react'

function KopiTimesCard() {
    return (
        <div className="mt-10 mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#800b19] to-[#3e154f] p-6 md:p-8 shadow-lg">
                {/* Watermark kutipan (dekorasi halus, bukan blur-blob) */}
                <Quote
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 rotate-180 text-white/5"
                    strokeWidth={1.5}
                />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl text-center md:text-left">
                        {/* Eyebrow */}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 ring-1 ring-white/15">
                            <PenLine className="h-3.5 w-3.5" />
                            Kopi TIMES
                        </span>

                        <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white [text-wrap:balance]">
                            Ruang Menulis untuk Indonesia
                        </h3>

                        <p className="mt-2 text-sm md:text-base leading-relaxed text-white/75 [text-wrap:pretty]">
                            Ruang kolaboratif untuk menyuarakan ide dan pemikiran ke publik — terbuka bagi
                            akademisi, mahasiswa, guru, profesional, pegiat komunitas, hingga warga yang
                            peduli pada isu di sekitarnya.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="shrink-0">
                        <Link
                            href="https://kopi.times.co.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#800b19] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                        >
                            Tulis di Kopi TIMES
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KopiTimesCard
