import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

function KopiTimesCard() {
    return (
        <>
            {/* Writer Subscription Card */}
            <div className="mt-10 mb-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#121a2d] to-[#1a2540] border-2 border-[#b41d1d]/30 rounded-2xl p-4">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b41d1d]/20 to-[#121a2d]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#b41d1d]/15 to-[#121a2d]/15 rounded-full blur-2xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                      
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                               Ruang Menulis untuk Indonesia 
                            </h3>
                            <p className="text-sm text-gray-300 mb-0 md:mb-0">
                                Kopi TIMES adalah ruang kolaboratif bagi siapa saja yang ingin menyuarakan ide, pengalaman, dan pemikiran kepada publik luas. Di sini, tulisan lahir dari beragam latar belakang: akademisi, mahasiswa, guru, santri, profesional, pelaku UMKM, pegiat komunitas, aktivis, birokrat, politisi, seniman, hingga warga biasa yang peduli pada isu di sekitarnya.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="shrink-0">
                            <a target='_blank' href="https://kopi.times.co.id/">
                                <Button size="lg" className="bg-gradient-to-r from-[#b41d1d] to-[#d42828] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Daftar Disini
                                </Button>
                            </a>
                        </div>
                    </div>

                  
                </div>
            </div>
        </>
    )
}

export default KopiTimesCard