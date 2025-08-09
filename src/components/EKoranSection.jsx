'use client'
import React from 'react'
import Card from './ui/Card';
import Button from './ui/Button';
import { ChevronRight, Download, Eye } from 'lucide-react';

function EKoranSection() {
    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const newspapers = [
        {
            id: 1,
            name: 'Kompas',
            logo: 'K',
            mainHeadline: 'Pemilu 2024: Kandidat Unggul dalam Survei Terbaru',
            subHeadlines: [
                'Ekonomi Digital Tumbuh 15%',
                'Infrastruktur Jalan Tol Baru'
            ],
            bgColor: 'bg-blue-50',
            accentColor: 'border-blue-200'
        },
        {
            id: 2,
            name: 'Tempo',
            logo: 'T',
            mainHeadline: 'Reformasi Birokrasi: Langkah Menuju Pemerintahan Bersih',
            subHeadlines: [
                'Korupsi Turun 20% di 2024',
                'Digitalisasi Layanan Publik'
            ],
            bgColor: 'bg-red-50',
            accentColor: 'border-red-200'
        },
        {
            id: 3,
            name: 'Media Indonesia',
            logo: 'MI',
            mainHeadline: 'Investasi Asing Meningkat: Indonesia Jadi Destinasi Utama',
            subHeadlines: [
                'Sektor Teknologi Berkembang',
                'Startup Unicorn Bertambah'
            ],
            bgColor: 'bg-green-50',
            accentColor: 'border-green-200'
        }
    ];
    return (
        <Card className="border-t-2 border-base-300 rounded-none">
            <Card.Body className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">E-NEWS PAPER</h3>
                        <p className="text-sm text-muted-foreground">{currentDate}</p>
                    </div>
                    <Button variant="link" className="text-neutral hover:text-primary/80">
                        READ ALL <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>

                {/* Welcome Message */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                        Welcome to NewsHunt E-Newspaper
                    </h2>
                </div>

                {/* Newspaper Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {newspapers.map((newspaper) => (
                        <div
                            key={newspaper.id}
                            className={`${newspaper.bgColor} ${newspaper.accentColor} border-2 rounded-lg p-4 min-h-[280px] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                        >
                            {/* Newspaper Header */}
                            <div className="border-b-2 border-gray-800 pb-2 mb-3">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold">
                                        {newspaper.logo}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {currentDate.split(',')[0]}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-foreground mt-1">
                                    {newspaper.name}
                                </h3>
                            </div>

                            {/* Main Headline */}
                            <div className="mb-4">
                                <h4 className="font-bold text-sm leading-tight text-foreground mb-2">
                                    {newspaper.mainHeadline}
                                </h4>
                            </div>

                            {/* Sub Headlines */}
                            <div className="space-y-2">
                                {newspaper.subHeadlines.map((headline, index) => (
                                    <div key={index} className="text-xs text-muted-foreground leading-relaxed border-b border-gray-200 pb-1">
                                        {headline}
                                    </div>
                                ))}
                            </div>

                            {/* Newspaper Elements */}
                            <div className="absolute bottom-2 right-2 opacity-20">
                                <div className="grid grid-cols-3 gap-1">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-8 h-1 bg-gray-400 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                    <Button variant="default" className="px-6">
                        <Eye className="h-4 w-4 mr-2" />
                        Baca Online
                    </Button>
                    <Button variant="outline" className="px-6">
                        <Download className="h-4 w-4 mr-2" />
                        Unduh PDF
                    </Button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        Dapatkan berita terkini dalam format digital dari berbagai sumber terpercaya
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default EKoranSection