import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';
import { Eye } from 'lucide-react';
import Image from 'next/image';

function HorizontalNewsCard({
    id,
    image,
    title,
    url,
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
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card key={id} className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
            <Link href={url} className="block h-full">
                <div className="relative overflow-hidden h-40 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {views.toLocaleString()}
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 hover:text-red-600 transition-colors duration-200">
                            {title}
                        </h3>


                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 ">
                        <time>{formatDate(datepub)}</time>
                      
                    </div>
                </div>
            </Link>
        </Card>
    )
}

export default HorizontalNewsCard