import React from 'react'
import Card from './ui/Card'
import Image from 'next/image';
import Link from 'next/link';

function SimpleNewsCard({ title, source, timeAgo, image, url }) {
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
        <Link href={url}>
        <Card className="card-sm group cursor-pointer transition-all duration-300 rounded-b-none border-b-1 border-base-300 bg-card overflow-hidden">
            <Card.Body className="p-0">
                <div className="flex gap-4 p-4">
                    <div className="flex-1">
                        <h3 className=" font-semibold text-sm leading-tight line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span>{formatDate(timeAgo)}</span>
                        </div>
                    </div>
                    <div className="w-20 h-16 flex-shrink-0 relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded-md transform scale-100 transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
         </Link>
    )
}

export default SimpleNewsCard