import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

function AjpCard() {
    return (
        <>
            {/* AJP Contribution Card - Light Theme */}
            <div className="mt-10 mb-8 p-4 bg-slate-50 rounded-3xl shadow-inner">
                <div className="relative overflow-hidden bg-white border-2 border-[#15803d]/20 rounded-2xl p-6 shadow-lg">
                    {/* Decorative elements - Green/Gold */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#15803d]/20 to-[#ca8a04]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ca8a04]/15 to-[#15803d]/15 rounded-full blur-2xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                      
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-sky-950 mb-3">
                                Sebarkan Narasi Positif untuk Indonesia
                            </h3>
                            <p className="text-sm text-slate-600 mb-0 md:mb-0 leading-relaxed">
                                Aplikasi Jurnalisme Positif (AJP) hadir sebagai ruang kolaboratif untuk menebarkan berita baik, inspiratif, dan membangun. Kami mengajak jurnalis, pembuat konten, dan masyarakat luas untuk bersama-sama menciptakan ekosistem informasi yang sehat, optimis, dan bermanfaat bagi kemajuan bangsa.
                            </p>
                        </div>

                        {/* CTA Button - Green/Gold */}
                        <div className="shrink-0 mt-4 md:mt-0">
                            {/* Pastikan untuk mengganti href dengan URL AJP yang sebenarnya */}
                            <a target='_blank' rel="noopener noreferrer" href="https://ajp.times.co.id/">
                                <Button size="lg" className="bg-gradient-to-r from-[#15803d] to-[#ca8a04] hover:opacity-95 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 rounded-full px-8 py-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Mulai Menulis
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AjpCard