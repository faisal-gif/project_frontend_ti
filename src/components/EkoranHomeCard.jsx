
import React from 'react'
import Card from './ui/Card'
import Carousel from './ui/Carousel'
import { Eye, Newspaper } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';

function EkoranHomeCard({
    datepub,
    gal_title,
    gal_cover,
    gal_view,
    url,
}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date; // selisih dalam ms
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} menit${diffMinutes > 1 ? '' : ''} lalu`;
        } else if (diffHours < 24) {
            return `${diffHours} jam${diffHours > 1 ? '' : ''} lalu`;
        } else if (diffDays < 7) {
            return `${diffDays} hari${diffDays > 1 ? '' : ''} lalu`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };


    return (
        <Link href={url}>
            <Card className="group cursor-pointer transition-all duration-300 hover:bg-news-hover border-2 border-base-300 bg-card overflow-hidden w-full max-w-sm">
                <div className="aspect-[6/8] relative overflow-hidden rounded-t-lg">
                    <Image
                        src={gal_cover}
                        alt={gal_title}
                        fill
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />

                    {/* Views badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {gal_view.toLocaleString()}
                    </div>

                    {/* Title + Date inside image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-[#b41d1d] transition-colors">
                            {gal_title}
                        </h3>
                        <div className="text-xs opacity-80 mt-1">{formatDate(datepub)}</div>
                    </div>
                </div>
                {/* <div className="p-4 space-y-6 ">
                <h3 className="font-serif text- font-light leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {gal_title}
                </h3>
                <div className="text-xs text-black/50">
                    <span>{formatDate(datepub)}</span>
                </div>
            </div> */}

            </Card>
        </Link>

    )
}

export default EkoranHomeCard