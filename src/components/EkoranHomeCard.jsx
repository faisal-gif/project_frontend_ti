
import React from 'react'
import Card from './ui/Card'
import Carousel from './ui/Carousel'
import { Eye, Newspaper } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

function EkoranHomeCard({
    datepub,
    gal_title,
    gal_cover,
    gal_view,
    url,
}) {

    return (
        <Link href={url}>
            <Card className="group cursor-pointer transition-all duration-300 hover:bg-news-hover border-2 border-base-300 bg-card overflow-hidden w-full max-w-sm">
                <div className="aspect-[6/8] relative overflow-hidden rounded-t-lg">
                    <Image
                        src={gal_cover}
                        alt={gal_title}
                        fill
                        sizes="203px"
                        quality={60}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />

                    {/* Views badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <ClientOnly>
                            <FormattedViews count={gal_view} />
                        </ClientOnly>
                    </div>

                    {/* Title + Date inside image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-white/70  group-hover:text-white transition-colors">
                            {gal_title}
                        </h3>
                        <div className="text-xs opacity-80 mt-1">
                            <ClientOnly>
                                <FormattedDate dateString={datepub} />
                            </ClientOnly>
                        </div>
                    </div>
                </div>


            </Card>
        </Link>

    )
}

export default EkoranHomeCard