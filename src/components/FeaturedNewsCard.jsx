
import React from 'react'
import Card from './ui/Card'
import { MessageCircle, Eye, Heart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';


function FeaturedNewsCard({
    index = 0,
    title,
    source,
    timeAgo,
    image,
    views = 4,
    className = "",
    url
}) {
    return (
        <Link href={url}>
            <Card className={`group relative h-64 w-full cursor-pointer overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:shadow-2xl  ${className}`}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    quality={40}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 464px"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    priority={index === 0} // 👈 hanya slide pertama yang priority
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative flex h-full transform flex-col justify-end p-6 transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
                    <h1 className="mb-4 text-md md:text-lg font-bold leading-tight transition-colors text-white/70  group-hover:text-white lg:text-3xl line-clamp-2">
                        {title}
                    </h1>

                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <span className="text-xs md:text-sm opacity-90">{timeAgo}</span>
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-5 rounded-full">
                                        <span className="text-xs md:text-sm">
                                            {source.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-white/70 opacity-90">{source}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs md:text-sm opacity-90">
                            <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{views.toLocaleString()}</span>
                            </div>

                        </div>
                    </div>
                </div>

            </Card>
        </Link>
    )
}

export default FeaturedNewsCard