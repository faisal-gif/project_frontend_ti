
import React from 'react'
import Card from './ui/Card'
import { Eye } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';


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
                    src={image.replace(/\.(jpg|jpeg|png|webp)$/i, '.md.$1')}
                    alt={`${title} Fetured Image`}
                    fill
                    quality={70}
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    priority={index === 0} // 👈 hanya slide pertama yang priority
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative flex h-full transform flex-col justify-end p-6 transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
                    <h3 className="mb-4 text-md md:text-lg font-bold leading-tight transition-colors text-white  group-hover:text-white lg:text-3xl line-clamp-2">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <span className="text-xs md:text-sm opacity-90">
                                <ClientOnly>
                                    <FormattedDate dateString={timeAgo} />
                                </ClientOnly> </span>
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
                                <span>
                                    <ClientOnly>
                                        <FormattedViews count={views} />
                                    </ClientOnly>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </Card>
        </Link>
    )
}

export default FeaturedNewsCard