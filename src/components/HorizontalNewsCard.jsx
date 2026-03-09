import Link from 'next/link'
import React from 'react'
import Card from './ui/Card';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

function HorizontalNewsCard({
    id,
    image,
    title,
    url,
    datepub,
    views,

}) {

    return (
        <Card key={id} className="w-full overflow-hidden transition-shadow duration-200 ease-in-out">
            <Link href={url} className="block h-full">
                <div className="relative overflow-hidden h-30 w-full rounded-lg">
                    <Image
                        src={image}
                        alt={title}
                        width={180}
                        height={120}
                        loading='lazy'
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <ClientOnly>
                            <FormattedViews count={views} />
                        </ClientOnly>
                    </div>
                </div>

                <div className="py-2 flex flex-col justify-between h-full">
                    <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 hover:text-red-600 transition-colors duration-200">
                        {title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto ">
                        <time>
                            <ClientOnly>
                                <FormattedDate dateString={datepub} />
                            </ClientOnly>
                            </time>

                    </div>
                </div>
            </Link>
        </Card>
    )
}

export default HorizontalNewsCard