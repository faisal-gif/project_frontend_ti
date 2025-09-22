import { Eye } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';
import Image from 'next/image';

function LastesNewsCard({
    id,
    title,
    image,
    description,
    datepub,
    author,
    views,
}) {
    const slugify = (str) =>
        str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');


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
        <Link href={`/news/${id}/${slugify(title)}`} className="block group">
            <div className="grid grid-cols-5 gap-0 ">
                <div className="col-span-2 md:col-span-1 relative overflow-hidden rounded-md">
                    {/* Blurred background */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                            src={image}
                            alt={`${title} background`}
                            fill
                            className="object-cover blur-md opacity-50"
                        />
                    </div>

                    {/* Main image */}
                    <div className="relative z-10 w-full h-full">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Overlay info */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20">
                        <Eye className="w-3 h-3" />
                        {views.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col justify-between col-span-3 md:col-span-4 px-2 md:px-6">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-3 md:line-clamp-2 leading-tight mb-2 hover:text-red-600 transition-colors duration-200">
                            {title}
                        </h3>
                        <p className="hidden md:line-clamp-2 text-black/50 text-xs leading-relaxed mb-3">
                            {description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <time>{formatDate(datepub)}</time>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LastesNewsCard