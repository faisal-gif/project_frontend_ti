import React from 'react'
import {
    ShoppingBag, Smile, AlertCircle, Landmark, MapPin, Globe, Vote, LineChart,
    Building2, Heart, Music2, Plane, Utensils, Cpu, Trophy, Car, BookOpen,
    Stethoscope, Sun, Coffee, Gavel, Users, Briefcase, Languages, Mic, PenTool,
    GraduationCap, BookMarked, FileText, School, Zap, Church,
    UserRound, ShieldQuestion, Shield,
    RectangleGoggles
} from "lucide-react"
import KanalTreeCard from '@/components/KanalTreeCard';
import GoogleAds from '@/components/GoogleAds';
import Link from 'next/link';

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

function Kanal({ channels = [] }) {

    const visibleChannels = channels;

    return (
        <main className="max-w-6xl  mx-auto px-4 py-18">
            <div className='hidden md:flex items-center justify-center'>
                <GoogleAds size='top_banner' slot='6315037307' />
            </div>

            <div className='md:hidden flex items-center justify-center'>
                <GoogleAds size='inline_rectangle' slot='9639204649' />
            </div>

            <div className="breadcrumbs text-sm my-6">
                <ul>
                    <li className='hover:text-[#b41d1d]'><Link href={'/'}>Home</Link></li>
                    <li className='text-[#b41d1d] font-semibold'><Link href={`/kanal`}>Kanal</Link></li>
                </ul>
            </div>

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
                    <div className="text-3xl font-bold text-[#7a0f1f] mb-2">{visibleChannels.length}+</div>
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

            {visibleChannels.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold">Kanal belum tersedia</h2>
                    <p className="text-muted-foreground">Coba muat ulang beberapa saat lagi.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {visibleChannels.map((channel) => {
                        const Icon = categoryIcons[channel.slug] || AlertCircle // fallback
                        const children = channel.children || []
                        return (
                            <KanalTreeCard
                                key={channel.id}
                                name={channel.name}
                                url={channel.url}
                                description={channel.description}
                                children={children}
                                Icon={Icon}
                            />
                        )
                    })}
                </div>
            )}

        </main>
    )
}

export default Kanal