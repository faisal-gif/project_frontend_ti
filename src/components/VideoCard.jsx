import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';
import { Eye } from 'lucide-react';
import Image from 'next/image';

function VideoCard({
    index,
    image,
    title,
    url,
    datepub,
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
        <Card key={index} className="w-full max-w-sm group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative overflow-hidden h-40 w-full">
                    <Image
                        src={image}
                        alt="Video thumbnail"
                        width={750}
                        height={350}
                        quality={100}
                        priority={index === 0}
                        className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />

                    {/* Title + Date inside image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-red-500 transition-colors">
                            {title}
                        </h3>
                        <div className="text-xs opacity-80 mt-1">{formatDate(datepub)}</div>
                    </div>
                </div>


            </a>
        </Card>
    )
}

export default VideoCard