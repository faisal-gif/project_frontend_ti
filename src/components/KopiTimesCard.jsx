import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

function KopiTimesCard() {
    return (
        <>
            {/* Writer Subscription Card */}
            <div className="mt-10 mb-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#121a2d] to-[#1a2540] border-2 border-[#b41d1d]/30 rounded-2xl p-8">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b41d1d]/20 to-[#121a2d]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#b41d1d]/15 to-[#121a2d]/15 rounded-full blur-2xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                        {/* Icon */}
                        <div className="shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#b41d1d] to-[#8a1616] rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Publikasikan Karya Anda
                            </h3>
                            <p className="text-gray-300 mb-0 md:mb-0">
                                Bergabung dengan ribuan jurnalis profesional sekarang!
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="shrink-0">
                            <Link href="/writer-registration">
                                <Button size="lg" className="bg-gradient-to-r from-[#b41d1d] to-[#d42828] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Daftar Disini
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features mini */}
                    <div className="relative mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[#b41d1d]">10K+</div>
                            <div className="text-xs text-gray-400">Penulis Aktif</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#b41d1d]">5M+</div>
                            <div className="text-xs text-gray-400">Pembaca/Bulan</div>
                        </div>
                     
                    </div>
                </div>
            </div>
        </>
    )
}

export default KopiTimesCard