import { Eye } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';

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
        <Link href={`/news/${id}/${slugify(title)}`} className="block group">
            <div className="grid grid-cols-5 gap-0">
                <div className="col-span-5 md:col-span-1 relative overflow-hidden">
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(8px)',
                            opacity: 0.5,
                        }}
                    />
                    {/* Main image */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20">
                        <Eye className="w-3 h-3" />
                        {views.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col justify-between col-span-5 md:col-span-4 p-2 md:p-6">
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
                        <div className="flex items-center gap-1">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-5 rounded-full">
                                    <span className="text-xs">
                                        {author.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            {author}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LastesNewsCard