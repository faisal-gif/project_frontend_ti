import React from 'react'
import { Clock, User, Eye } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Card from './ui/Card';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

function NewsCard({
    title,
    description,
    datePub,
    views,
    image,
    url,
    category,
    layout = "grid", // "grid" atau "list"
}) {

    if (layout === "list") {
        return (
            <Link href={url} className="block group">
                <div className="grid grid-cols-5 gap-0">
                    <div className="col-span-2 md:col-span-1 relative overflow-hidden rounded-md">
                        {/* Blurred background */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <Image
                                src={image}
                                alt={`${title} background`}
                                width={148}
                                height={99}
                                quality={60}
                                loading='lazy'
                                fetchPriority='high'
                                className="object-cover blur-md opacity-50"
                            />
                        </div>

                        {/* Main image */}
                        <div className="relative z-10 w-full h-20 md:h-24 ">
                            <Image
                                src={image}
                                alt={title}
                                width={148}
                                height={99}
                                quality={60}
                                loading='lazy'
                                fetchPriority='high'
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-between col-span-3 md:col-span-4 px-2 md:px-6">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground line-clamp-3 md:line-clamp-2 leading-tight mb-2 hover:text-red-600 transition-colors duration-200">
                                {title}
                            </h3>
                            <p className="hidden md:line-clamp-2 text-black/50 text-xs leading-relaxed mb-3">
                                {description}
                            </p>
                        </div>
                        <div className="flex items-center justify-start gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>
                                    <ClientOnly>
                                        <FormattedViews count={views} />
                                    </ClientOnly>
                                </span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                    <ClientOnly>
                                        <FormattedDate dateString={datePub} />
                                    </ClientOnly>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    // === GRID MODE (versi card normal) ===
    return (
        <Link href={url} className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg">
                <Card.Body className="p-0">
                    {image && (
                        <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                loading='lazy'
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {category && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#7a0f1f] text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {category}
                                    </span>
                                </div>
                            )}
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
                                    <Clock className="h-3 w-3" />
                                    <span><FormattedDate dateString={datePub} /></span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span><FormattedViews count={views} /></span>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default NewsCard
