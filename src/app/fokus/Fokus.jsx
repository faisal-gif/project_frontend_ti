'use client'
import React, { useEffect, useState } from 'react'
import { Hash, Vote } from "lucide-react"
import KanalCard from '@/components/KanalCard';
import { getAllKanal } from '@/lib/api/kanalApi';
import FocusCard from '@/components/FocusCard';
import { getAllFocus } from '@/lib/api/focus';



function Fokus() {

    const [focus, setFocus] = useState([]);

    useEffect(() => {
        getAllFocus(
            {
                offset: 0,
                limit: 12
            }
        ).then(setFocus).catch(console.error);
    }, []);



    return (
        <main className="max-w-6xl  mx-auto px-4 py-18">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Fokus Berita
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Liputan mendalam dan analisis komprehensif tentang isu-isu strategis yang menjadi fokus perhatian nasional dan mempengaruhi kehidupan masyarakat Indonesia.
                </p>
            </div>

            {/* Featured Focus */}
            <div className="bg-gradient-to-r from-[#7a0f1f]/10 via-[#7a0f1f]/5 to-transparent rounded-lg p-8 mb-12 border border-[#7a0f1f]/10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="p-4 bg-[#7a0f1f]/20 rounded-full">
                        <Vote className="h-12 w-12 text-[#7a0f1f]" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            {focus.length > 0 ? focus[0].focnews_title : 'Memahami Dinamika Pemilu 2024'}
                        </h2>
                        <p className="text-black/60 mb-4">
                            {focus.length > 0 ? focus[0].focnews_description : 'Analisis mendalam tentang proses, tantangan, dan implikasi dari Pemilu 2024 di Indonesia.'}
                        </p>
                        <button className="bg-[#7a0f1f] text-white px-6 py-2 rounded-lg hover:bg-[#7a0f1f] transition-colors">
                            Baca Selengkapnya
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 bg-card rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">20+</div>
                    <div className="text-muted-foreground">Area Fokus</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">500.000+</div>
                    <div className="text-muted-foreground">Artikel Fokus</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">40+</div>
                    <div className="text-muted-foreground">Pakar Kontributor</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">Daily</div>
                    <div className="text-muted-foreground">Update Analisis</div>
                </div>
            </div>

            {focus.length === 0 ? (
                <div className="text-center py-12">
                    <div className="flex justify-center mb-4">
                        <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Loading Fokus...</h2>
                    <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
                </div>
            ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {focus.map((fokus) => {
                    return (
                        <FocusCard
                            key={fokus.focnews_id}
                            id={fokus.focnews_id}
                            name={fokus.focnews_title}
                            url={fokus.urlPath}
                            description={fokus.focnews_description}
                            Icon={Hash} // lempar ke card
                        />
                    )
                }
                )}
            </div>)}




        </main>
    )
}

export default Fokus;