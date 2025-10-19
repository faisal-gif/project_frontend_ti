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
    priority = false, // Tambahkan prop ini untuk LCP
}) {

    return (
        <Link href={url} className="block group h-full">
            <Card className="
        h-full 
        transition-all duration-300 
        border-0 shadow-none overflow-hidden
        md:shadow-lg md:hover:shadow-2xl md:hover:-translate-y-1 
        flex flex-row 
        md:flex-col
      ">

                {/* === BAGIAN GAMBAR === */}
                {image && (
                    <div className="
            relative overflow-hidden 
            flex-shrink-0
            w-2/5 // MOBILE (list): 40% width
            rounded-md 
            md:w-full md:h-64
            md:rounded-t-lg md:rounded-b-none
          ">
                        <Image
                            // Gunakan URL gambar asli, biarkan next/image mengoptimasi
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 40vw, (max-width: 1024px) 50vw, 33vw"

                            // Gunakan prop 'priority' untuk mengontrol loading
                            // Hanya LCP (gambar pertama) yg boleh 'priority'
                            loading={priority ? undefined : 'lazy'}
                            priority={priority}

                            quality={priority ? 75 : 60} // Kualitas lebih baik untuk LCP
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {category && (
                            // Kategori HANYA tampil di mode desktop (grid)
                            <div className="absolute top-4 left-4 hidden md:block">
                                <span className="bg-[#7a0f1f] text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* === BAGIAN TEKS === */}
                <div className="
            flex flex-col justify-between flex-grow
            p-3 // MOBILE (list): padding kecil
            md:p-6 // DESKTOP (grid): padding normal
        ">
                    {/* Judul & Deskripsi */}
                    <div>
                        <h3 className="
                font-semibold text-foreground 
                text-sm leading-tight // MOBILE (list): text kecil
                line-clamp-3 // MOBILE (list): 3 baris
                hover:text-red-600 // MOBILE (list): hover
                md:font-bold md:text-base md:line-clamp-2 // DESKTOP (grid): text normal, 2 baris
                md:group-hover:text-[#7a0f1f] // DESKTOP (grid): hover
                transition-colors mb-2 md:mb-3
            ">
                            {title}
                        </h3>
                        <p className="
                text-black/50 text-xs leading-relaxed mb-3 // MOBILE (list): text & style
                line-clamp-2 // MOBILE (list): 2 baris
                md:text-muted-foreground md:line-clamp-3 // DESKTOP (grid): text & style
                hidden md:block // Deskripsi disembunyikan di mobile (seperti di list asli)
            ">
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

export default NewsCard