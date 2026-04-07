import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

function AjpCard() {
    return (
        <>
            {/* AJP Contribution Card */}
            <div className="mt-10 mb-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#121a2d] to-[#1a2540] border-2 border-[#b41d1d]/30 rounded-2xl p-4">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b41d1d]/20 to-[#121a2d]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#b41d1d]/15 to-[#121a2d]/15 rounded-full blur-2xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                      
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Sebarkan Narasi Positif untuk Indonesia
                            </h3>
                            <p className="text-sm text-gray-300 mb-0 md:mb-0">
                                Aplikasi Jurnalisme Positif (AJP) hadir sebagai ruang kolaboratif untuk menebarkan berita baik, inspiratif, dan membangun. Kami mengajak jurnalis, pembuat konten, dan masyarakat luas untuk bersama-sama menciptakan ekosistem informasi yang sehat, optimis, dan bermanfaat bagi kemajuan bangsa.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="shrink-0">
                            {/* Pastikan untuk mengganti href dengan URL AJP yang sebenarnya */}
                            <a target='_blank' rel="noopener noreferrer" href="https://ajp.times.co.id/">
                                <Button size="lg" className="bg-gradient-to-r from-[#b41d1d] to-[#d42828] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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