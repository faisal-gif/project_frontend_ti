import React from 'react'
import { Clock, User, Eye } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Card from './ui/Card';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

function NewsCardAuto({
    title,
    description,
    datePub,
    views,
    image,
    url,
    category,
    priority = false,
}) {

    return (
        <Link href={url} className="block group h-full">
            <Card className=" h-full transition-all duration-300 border-0 shadow-none overflow-hidden md:shadow-lg md:hover:shadow-2xl md:hover:-translate-y-1 flex flex-row md:flex-col">

                {/* === BAGIAN GAMBAR === */}
                {image && (
                    <div className="relative overflow-hidden flex-shrink-0 w-2/5 rounded-md md:w-full md:h-64 md:rounded-t-lg md:rounded-b-none">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 40vw, (max-width: 1024px) 50vw, 33vw"
                            loading={priority ? undefined : 'lazy'}
                            priority={priority}
                            quality={priority ? 70 : 60}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {category && (
                            <div className="absolute top-4 left-4 hidden md:block">
                                <span className="bg-[#7a0f1f] text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* === BAGIAN TEKS === */}
                <div className="flex flex-col justify-between flex-grow p-3 md:p-6 ">
                    {/* Judul & Deskripsi */}
                    <div>
                        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-3 hover:text-red-600 md:font-bold md:text-base md:line-clamp-2 md:group-hover:text-[#7a0f1f] transition-colors mb-2 md:mb-3">
                            {title}
                        </h3>
                        <p className="text-black/50 text-xs leading-relaxed mb-3 line-clamp-2 md:text-muted-foreground md:line-clamp-3 hidden md:block ">
                            {description}
                        </p>
                    </div>

                    {/* Meta Info (Tanggal & Views) */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {/* Tanggal (selalu ada) */}
                        <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                                <ClientOnly>
                                    <FormattedDate dateString={datePub} />
                                </ClientOnly>
                            </span>
                        </div>

                        {/* Views (HANYA tampil di desktop) */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span><FormattedViews count={views} /></span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default NewsCardAuto