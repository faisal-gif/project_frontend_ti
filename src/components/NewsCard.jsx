import React from 'react'
import { Clock, User, Eye } from "lucide-react";
import Link from 'next/link';
import Card from './ui/Card';

function NewsCard({
    title,
    description,
    writer,
    datePub,
    readTime,
    views,
    image,
    url,
    category,
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
        <Link href={url} className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg">
                <Card.Body className="p-0">
                    {image && (
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-[#7a0f1f] text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {category}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        <h3 className="font-bold text-base group-hover:text-[#7a0f1f] transition-colors line-clamp-2 mb-3">
                            {title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                            {description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <User className="h-3 w-3" />
                                    <span>{writer}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatDate(datePub)}</span>
                                </div>
                                {/* <div className="flex items-center space-x-1">
                  <span>{readTime} baca</span>
                </div> */}
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{views.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default NewsCard