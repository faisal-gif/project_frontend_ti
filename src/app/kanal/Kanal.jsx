'use client'
import React, { useEffect, useState } from 'react'
import {
    ShoppingBag, Smile, AlertCircle, Landmark, MapPin, Globe, Vote, LineChart,
    Building2, Heart, Music2, Plane, Utensils, Cpu, Trophy, Car, BookOpen,
    Stethoscope, Sun, Coffee, Gavel, Users, Briefcase, Languages, Mic, PenTool,
    GraduationCap, BookMarked, FileText, School, Zap, Church,
    UserRound, ShieldQuestion, Shield,
    RectangleGoggles
} from "lucide-react"
import KanalCard from '@/components/KanalCard';
import { getAllKanal } from '@/lib/api/kanalApi';

// mapping slug → icon
const categoryIcons = {
    "news-commerce": ShoppingBag,
    "indonesia-positif": Smile,
    "peristiwa": AlertCircle,
    "peristiwa-nasional": Landmark,
    "peristiwa-daerah": MapPin,
    "peristiwa-internasional": Globe,
    "politik": Vote,
    "ekonomi": LineChart,
    "pemerintahan": Building2,
    "gaya-hidup": Heart,
    "entertainment": Music2,
    "wisata": Plane,
    "kuliner": Utensils,
    "tekno": Cpu,
    "olahraga": Trophy,
    "otomotif": Car,
    "pendidikan": BookOpen,
    "kesehatan": Stethoscope,
    "positive-news-from-indonesia": Sun,
    "kopi-times": Coffee,
    "hukum-kriminal": Gavel,
    "glutera-news": Users,
    "gawainesia": Briefcase,
    "english": Languages,
    "wawancara-khusus": Mic,
    "kopi-times-opini": PenTool,
    "kopi-times-forum-dosen": GraduationCap,
    "kopi-times-resensi": BookMarked,
    "kopi-times-forum-guru": GraduationCap,
    "kopi-times-jurnal": FileText,
    "kopi-times-forum-mahasiswa": School,
    "flash-news": Zap,
    "metatimes": RectangleGoggles,
    "religi": Church,
    "sosok": UserRound,
    "cek-fakta": ShieldQuestion,
    "ketahanan-informasi": Shield,
}

function Kanal() {

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getAllKanal().then(setChannels).catch(console.error);
    }, []);

    return (
        <main className="max-w-6xl  mx-auto px-4 py-18">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Kanal Berita
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Jelajahi berbagai kanal berita kami untuk mendapatkan informasi terkini
                    dari berbagai bidang yang telah dikurasi khusus untuk Anda.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">9+</div>
                    <h3 className="text-muted-foreground">Kanal Berita</h3>
                </div>
                <div className="text-center p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">800.000+</div>
                    <h3 className="text-muted-foreground">Total Artikel</h3>
                </div>
                <div className="text-center p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">24/7</div>
                    <h3 className="text-muted-foreground">Update Terkini</h3>
                </div>
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => {

                    const Icon = categoryIcons[channel.slug] || AlertCircle // fallback
                    return (
                        <KanalCard
                            key={channel.id}
                            id={channel.id}
                            name={channel.name}
                            slug={channel.slug}
                            url={channel.url}
                            description={channel.description}
                            news_count={channel.news_count}
                            Icon={Icon} // lempar ke card
                        />
                    )
                }
                )}
            </div>

        </main>
    )
}

export default Kanal