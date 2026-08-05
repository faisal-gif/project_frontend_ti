
import React from 'react'
import Card from './ui/Card'
import { Eye, Images } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

function FotografiCard({
    datepub,
    gal_title,
    gal_cover,
    gal_view,
    category,
    url,
    fill = false
}) {

    return (
        <Link href={url} className={fill ? 'block h-full' : undefined}>
            <Card className={`group cursor-pointer transition-all duration-300 hover:bg-news-hover border-2 border-base-300 bg-card overflow-hidden ${fill ? 'h-full w-full' : 'w-full max-w-sm'}`}>
                <div className={`relative overflow-hidden ${fill ? 'h-full rounded-lg' : 'aspect-[9/16] rounded-t-lg'}`}>
                    <Image
                        src={gal_cover}
                        alt={gal_title}
                        fill
                        quality={50}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />

                    {/* Gallery badge (penanda ini kumpulan foto, bukan 1 artikel) */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#C31815] text-white px-2 py-1 rounded-md text-xs font-semibold shadow">
                        <Images className="w-3 h-3" />
                        {category || 'Galeri'}
                    </div>

                    {/* Views badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <ClientOnly>
                            <FormattedViews count={gal_view} />
                        </ClientOnly>
                    </div>

                    {/* Title + Date inside image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-white  group-hover:text-white transition-colors">
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

export default FotografiCard